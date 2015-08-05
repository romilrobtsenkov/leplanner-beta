var express = require('express');
var router = express.Router();
var passport = require('passport');
var userService = require('../services/user-service');
var followerService = require('../services/follower-service');
var validateService = require('../services/validate-service');
var scenarioService = require('../services/scenario-service');
var notificationService = require('../services/notification-service');
var config = require('../config/config');
var restrict = require('../auth/restrict');
var async = require('async');

/* template
async.waterfall([], function (err, result) {
  if(err){ res.json(err); }
  res.json(result);
});
*/

router.post('/create', function(req, res, next) {

  var user = req.body;

  // Fix for auto login after new user save
  req.body.email = req.body.new_email;
  req.body.password = req.body.new_password;

  async.waterfall([
    function(next){

      validateService.validate([{fn:'userData', data:user}], function(err){
        if (err) { return next({error: err}); }
        next();
      });
    },
    function(next){

      validateService.validate([{fn:'password', data:user.new_password}], function(err){
        if (err) { return next({error: err}); }
        next();
      });
    },
    function(next){

      userService.bcryptCreatePassword(user.new_password, function(err, hash){
        if (err) { return next({error: err}); }
        next(null, hash);
      });
    },
    function(hash, next){

      var new_user = {
        first_name: user.new_first_name,
        last_name: user.new_last_name,
        organization: user.new_organization,
        email: user.new_email.toLowerCase(),
        password: hash
      };

      userService.saveNew(new_user, function(err) {
        if (err) { return next({error: err}); }
        next();
      });
    },
    function(next){

      passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return next({error: info.message}); }
        next(null, user);
      })(req, res, next);
    },
    function(user, next){

      req.logIn(user, function(err) {
        if (err) { return next(err); }
        next(null, {user: {id: user._id}});
      });
    }

  ], function (err, result) {
    if(err){ res.json(err); }
    res.json(result);
  });

});

router.post('/login', function(req, res, next) {
    //console.log(req.body);
    if (req.body.remember_me) { req.session.cookie.maxAge = config.cookieMaxAge; }

    async.waterfall([
      function(next){

        // using req.body.email & password
        passport.authenticate('local', function(err, user, info) {
          if (err) { return next(err); }
          if (!user) { return next({error: info.message}); }
          next(null, user);
        })(req, res, next);
      },
      function(user, next){

        req.logIn(user, function(err) {
          if (err) { return next(err); }
          next(null, {user: {id: user._id}});
        });
      }

    ], function (err, result) {
      if(err){ res.json(err); }
      res.json(result);
    });

});

router.get('/logout', restrict, function(req, res, next) {
  req.logout();
  req.session.destroy();
  res.json({success: 'logout sucessfull'});
});

router.post('/send-reset-token', function(req, res){

  var user_email = req.body.reset_email;

  async.waterfall([
    function(next){

      validateService.validate([{fn:'email', data:user_email}], function(err){
        if (err) { return next({error: err}); }
        next();
      });
    },
    function(next){

      var q = {};
      q.args = {"email": user_email.toLowerCase()};

      userService.findOne(q, function(err, user){
        if (err) { return next({error: err}); }
        if (!user) { return next({error: {id: 20, message: 'No user with that email'}}); }
        next(null, user);
      });
    },
    function(user, next){

      userService.cryptoCreateToken(function(err, token){
        if (err) { return next({error: err}); }
        next(null, user, token);
      });
    },
    function(user, token, next){

      var update = {
        resetPasswordToken: token,
        resetPasswordExpires : Date.now() + 3600000, // 1 hour
      };
      var q = {};
      q.where = {"_id": user._id};
      q.update = update;
      q.select = "email resetPasswordToken";

      userService.update(q, function(err, user){
        if (err) { return next({error: err}); }
        next(null, user);
      });
    },
    function(user, next){

      userService.sendPasswordResetMail(user, function(err, success){
        if (err) { return next({error: err}); }
        next(null, {success: success});
      });
    }

  ], function (err, result) {
    if(err){ res.json(err); }
    res.json(result);
  });

});

router.post('/update-profile', restrict, function(req, res, next) {

  var user = req.body.user;

  async.waterfall([
    function(next){

      validateService.validate([{fn:'userData', data:user}], function(err){
        if (err) { return next({error: err}); }
        next();
      });
    },
    function(next){

      if(user.email != user.new_email){
        if(!user.confirm_password){ return next({error: {id: 7, message: 'Please enter password to confirm email change!'}}); }

        var q = {};
        q.args = {"email": user.new_email.toLowerCase()};

        userService.findOne(q, function(err, user_with_same_email){
          if (err) { return next({error: err}); }
          if(user_with_same_email){ return next({error: {id: 6, message: 'That email is already in use'}}); }
          // true to get user and check password
          return next(null, user, true);
        });
      }else{
        // email not changed, skip next 3 fn in waterfall
        next(null, user, false);
      }
    },
    function(user, validate, next ){
      if(!validate){ return next(null, user, null); } //skip

      validateService.validate([{fn:'email', data:user.new_email}], function(err){
        if (err) { return next({error: err}); }
        return next(null, user, true);
      });
    },
    function(user, get_user, next){
      if(!get_user){ return next(null, user, null, null); } //skip

      userService.findById(user._id, function(err, user_obj_from_db){
        if (err) { return next({error: err}); }
        if (!user_obj_from_db) { return next({error: {id: 21, message: 'No user with that id'}}); }

        // true to get user and compare passwds
        return next(null, user, user_obj_from_db.password, true);
      });
    },
    function(user, hash, compare_passwds, next){
      if(!compare_passwds){ return next(null, user, null); } //skip

      userService.bcryptCompare(user.confirm_password, hash, function(err, is_match){
        if (err) { return next({error: err}); }
        if(!is_match){ return next({error: {id: 10, message: 'Wrong password'}}); }
        return next(null, user, true);
      });
    },
    function(user, change_email, next){

      var update = {};
      if(user.first_name != user.new_first_name){ update.first_name = user.new_first_name; }
      if(user.last_name != user.new_last_name){ update.last_name = user.new_last_name; }
      if(user.organization != user.new_organization){ update.organization = user.new_organization; }
      update.last_modified = new Date();
      if(change_email){ update.email = user.new_email; }

      var q = {};
      q.where = {"_id": user._id};
      q.update = update;
      q.select = "-password -resetPasswordExpires -resetPasswordToken";

      userService.update(q, function(err, u_user){
        if (err) { return next({error: err}); }
        next(null, {user: u_user});
      });
    }
  ], function (err, result) {
    if(err){ res.json(err); }
    res.json(result);
  });

});

router.post('/update-password', restrict, function(req, res, next) {

  var user = req.body.user;

  async.waterfall([
    function(next){

      validateService.validate([{fn:'passwordUpdate', data:user}], function(err){
        if (err) { return next({error: err}); }
        next();
      });
    },
    function(next){

      userService.findById(user._id, function(err, user_obj_from_db){
        if (err) { return next({error: err}); }
        if (!user_obj_from_db) { return next({error: {id: 21, message: 'No user with that id'}}); }
        next(null, user_obj_from_db.password);
      });
    },
    function(hash, next){

      userService.bcryptCompare(user.password, hash, function(err, is_match){
        if (err) { return next({error: err}); }
        if(!is_match){ return next({error: {id: 10, message: 'Wrong password'}}); }
        return next();
      });
    },
    function(next){

      userService.bcryptCreatePassword(user.new_password, function(err, hash){
        if (err) { return next({error: err}); }
        next(null, hash);
      });
    },
    function(new_password, next){

      var update = {
        password: new_password,
        last_modified: new Date()
      };
      var q = {};
      q.where = {"_id": user._id};
      q.update = update;
      q.select = "_id";

      userService.update(q, function(err, u_user){
        if (err) { return next({error: err}); }
        next(null, {user: {id: u_user._id}});
      });
    }
  ], function (err, result) {
    if(err){ res.json(err); }
    res.json(result);
  });

});

router.post('/reset-password', function(req, res, next) {

  var user = req.body;

  async.waterfall([
    function(next){

      var q = {};
      q.args = {"resetPasswordToken": user.token};

      userService.findOne(q, function(err, user_from_db) {
        if (err) { return next({error: err}); }
        if(!user_from_db){ return next({error: {id: 10, message: 'Request new token'}}); }
        next(null, user_from_db);
      });
    },
    function(user_from_db, next){

      if(user_from_db.resetPasswordExpires < Date.now()){ return next({error: {id: 11, message: 'Token expired'}}); }

      validateService.validate([{fn:'passwordReset', data:user}], function(err){
        if (err) { return next({error: err}); }
        next(null, user_from_db);
      });
    },
    function(user_from_db, next){

      userService.bcryptCreatePassword(user.new_password, function(err, hash){
        if (err) { return next({error: err}); }
        next(null, user_from_db, hash);
      });
    },
    function(user_from_db, new_password, next){

      var update = {
        password: new_password,
        last_modified: new Date(),
        resetPasswordToken: ''
      };
      var q = {};
      q.where = {"_id": user_from_db._id};
      q.update = update;

      userService.update(q, function(err, u_user){
        if (err) { return next({error: err}); }
        next(null, {success: 'success'});
      });
    },
  ], function (err, result) {
    if(err){ res.json(err); }
    res.json(result);
  });

});

router.post('/load-user-data', function(req, res, next) {

  var user_id = req.body.user._id;

  async.waterfall([
    function(next){

      var q = {};
      q.where = {"_id": user_id};
      q.update = { $inc: { profile_views: 1 }};
      q.select = "-password -resetPasswordExpires -resetPasswordToken";

      userService.update(q, function(err, user){
        if (err) { return next({error: err}); }
        if(user === null){ return next({id: 0, message: "no such profile found"}); }
        next(null, user);
      });
    },
    function(user, next){

      // find following
      var q = {};
      q.args = {follower: user._id, removed: null };
      q.populated_fields = [];
      q.populated_fields.push({
        field: 'following',
        populate: 'first_name last_name image_thumb last_modified'
      });

      followerService.find(q, function(err, following){
        if (err) { return next({error: err}); }
        next(null, user, following);
      });
    },
    function(user, following, next){

      // find followers
      var q = {};
      q.args = { following: user._id, removed: null };
      q.populated_fields = [];
      q.populated_fields.push({
        field: 'follower',
        populate: 'first_name last_name image_thumb last_modified'
      });

      followerService.find(q, function(err, followers){
        if (err) { return next({error: err}); }

        var response = {};
        response.profile = user;

        if(following.length !== 0){ response.following = following; }
        if(followers.length !== 0){ response.followers = followers; }

        next(null, response);
      });
    }
  ], function (err, result) {
    if(err){ res.json(err); }
    res.json(result);
  });

});

router.post('/add-remove-follow/',restrict, function(req, res, next) {

  var params = req.body;

  async.waterfall([
    function(next){

      validateService.validate([{fn:'addRemoveFollow', data:params}], function(err){
        if (err) { return next({error: err}); }
        next();
      });
    },
    function(next){

      var q = {};
      q.args = { follower: params.user._id, following: params.following._id, removed: null };
      q.select = '_id';

      followerService.findOne(q, function(err, follower_doc){
        if (err) { return next({error: err}); }
        next(null, follower_doc);
      });
    },
    function(follower_doc, next){

      // add follower
      if(typeof params.remove_follow === 'undefined'){
        if(follower_doc === null){
          new_follower_doc = { follower: params.user._id, following: params.following._id };

          followerService.saveNew(new_follower_doc, function(err) {
            if (err) { return next({error: err}); }
            next(null, {success: 'follow'});
          });
        }else{
          next(null, {success: 'follow'});
        }
      }else{
        //remove follower
        if(follower_doc === null){
          next(null, {success: 'unfollow'});
        }else{
          var update = { removed : Date.now() };
          var q = {};
          q.where = {"_id": follower_doc._id};
          q.update = update;
          q.select = "_id";

          followerService.update(q, function(err){
            if (err) { return next({error: err}); }
            next(null, {success: 'unfollow'});
          });
        }
      }

    },
    function(success, next){

      var q = {};
      q.args = {following: params.user._id, removed: null};

      followerService.count(q, function(err, followers_count){
        if (err) { return next({error: err}); }
        var count = {followers_count: followers_count};
        next(null, success, count);
      });
    },
    function(success, count, next){

      var q = {};
      q.args = {follower: params.user._id, removed: null};

      followerService.count(q, function(err, following_count){
        if (err) { return next({error: err}); }
        count.following_count = following_count;
        next(null, success, count);
      });
    },
    function(success, count, next){

      var q = {};
      q.where = {"_id": params.user._id};
      q.update = { following_count: count.following_count, followers_count: count.followers_count };

      userService.update(q, function(err, user){
        if (err) { return next({error: err}); }
        next(null, success);
      });
    }
  ], function (err, result) {
    if(err){ res.json(err); }
    res.json(result);
  });

});

router.post('/list', restrict, function(req, res, next){

  var user_id = req.user._id;

  if(typeof req.limit != 'undefined'){
    var limit = req.limit;
  }

  async.waterfall([
    function(next){

      var q = {};
      q.args = {_id: {'$ne':user_id }};
      q.select =  'first_name last_name organization image_thumb last_modified';
      q.sort = {first_name: 1};

      userService.find(q, function(err, users){
        if (err) { return next({error: err}); }
        next(null, users);
      });
    },
    function(users, next){

      var q = {};
      q.args = { follower: user_id, removed: null };
      q.select = 'following';

      followerService.find(q, function(err, following){
        if (err) { return next({error: err}); }
        next(null, users, following);
      });

    },
    function(users, following, next){

      // convert mongoose object to doc / otherise cannot edit
      users = JSON.stringify(users);
      users = JSON.parse(users);

      // add following = "following" to users who are followed
      if(following.length > 0){
        for(var i = 0; i < users.length; i++){
          for(var j = 0; j < following.length; j++){
            if(users[i]._id == following[j].following ){
              users[i].following = "following";
            }
          }
        }
        next(null, {users: users});

      }else{
        next(null, {users: users});
      }
    }
  ], function (err, result) {
    if(err){ res.json(err); }
    res.json(result);
  });

});

router.post('/notifications/',restrict , function(req, res, next) {

  var user_id = req.body.user._id;

  var q = {};
  q.args = { user: user_id, type: 'comment' };
  q.populated_fields = [];
  q.populated_fields.push({
    field: 'data.user',
    populate: 'first_name last_name last_modified image_thumb'
  });
  q.populated_fields.push({
    field: 'data.scenario',
    populate: 'name '
  });
  q.select = '-type';
  q.sort = { created: -1 };
  if(typeof req.body.limit !== 'undefined'){
    q.limit = req.body.limit;
  }

  notificationService.find(q, function(err, notifications){
    if (err) { return res.json({error: err}); }
    res.json({ notifications: notifications });
  });

});

router.get('/me', function(req, res){
  //http://toon.io/understanding-passportjs-authentication-flow/
  if(!req.session.passport.user){
    return res.status(401).send({error: 'Unauthorized'});
  }else{
    return res.json(req.user);
  }
});

module.exports = router;
