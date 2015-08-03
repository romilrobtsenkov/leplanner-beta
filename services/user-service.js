var bcrypt = require('bcrypt');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var config = require('../config/config');
var User = require('../models/user').User;
var Scenario = require('../models/scenario').Scenario;
var ScenarioView = require('../models/scenario-view').ScenarioView;
var Comment = require('../models/comment').Comment;
var Follower = require('../models/follower').Follower;

//soon deleted - replaced by findOne
exports.findByEmail = function(email, next) {
  User.findOne({email: email.toLowerCase()}, function(err, user) {
    next(err, user);
  });
};

//soon deleted - replaced by findOne
exports.findById = function(id, next) {
  User.findById(id, function(err, user) {
    next(err, user);
  });
};

exports.findOne = function(q, next){
  var query = User.findOne();
  query.where(q.args);
  if(q.select){ query.select(q.select); }
  query.exec(function(err, user) {
    next(err, user);
  });
};

exports.findByToken = function(token, next) {
  User.findOne({resetPasswordToken: token}, function(err, user) {
    next(err, user);
  });
};

exports.bcryptCompare = function(candidate, hash, next) {
  bcrypt.compare(candidate, hash, function(err, is_match) {
    next(err, is_match);
  });
};

exports.cryptoCreateToken = function(next) {
  crypto.randomBytes(20, function(err, buf) {
    next(err, buf.toString('hex'));
  });
};

exports.bcryptCreatePassword = function(password, next) {
  bcrypt.hash(password, 10, function(err, hash) {
    next(err, hash);
  });
};

exports.saveNewUser = function(user, next) {

  var newUser = new User({
    first_name: user.new_first_name,
    last_name: user.new_last_name,
    organization: user.new_organization,
    email: user.new_email.toLowerCase(),
    password: user.hashedpassword
  });

  newUser.save(function(err) {
    if (err) {
      if(err.errors.email.message == 'That email is already in use'){
        return next({id: 6, message: 'That email is already in use'});
      }else{
        return next(err);
      }
    }
    next(null);
  });

};

exports.sendPasswordResetMail = function(user, next) {
  //send email
  nodemailer.sendmail = true;
    var transporter = nodemailer.createTransport({
      debug: true, //this!!!
    });
    var mailOptions = {
      to: user.email,
      from: 'romilr@tlu.ee',
      subject: 'Password Reset',
      text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        config.site_url + '/#/reset/' + user.resetPasswordToken + '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    };

    transporter.sendMail(mailOptions, function(err) {
      //console.log(err);
      if (err) { return next(err); }
      return next(null, 'sent');
    });

};

exports.updateUser = function(q, next){
  var conditions = q.where;
  var update = q.update;
  var options = {new: true};
  if(q.select){ options.select = q.select; }
  var query = User.findOneAndUpdate(conditions, update, options);
  query.exec(function(err, user) {
    next(err, user);
  });
};

exports.validate = function(to_validate_array, next){

  if(typeof to_validate_array == 'undefined' || to_validate_array.length === 0){
    return next({error: 'Validation array undefined'});
  }

  var validation = {
    userData: userData,
    password: password,
    email: email,
    passwordUpdate: passwordUpdate,
    passwordReset: passwordReset,
    addRemoveFollow: addRemoveFollow
  };

  for(var i = 0; i < to_validate_array.length; i++){
    var fn = to_validate_array[i].fn.toString();
    var data = to_validate_array[i].data;
    if(typeof validation[fn] != 'undefined'){
      validation[fn](data);
    }
  }

  // VALIDATION FUNCTIONS

  function userData(user){

    // prevalidate user input before db, if html validation fails
    if(!user.new_first_name){ return next({id: 0, message: 'Please enter your first name'}); }
    if(!user.new_last_name){ return next({id: 1, message: 'Please enter your last name'}); }
    if(!user.new_email){ return next({id: 2, message: 'Please enter your email'}); }
    if(user.new_email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/) === null){
      return next({id: 3, message: 'Please enter correct email'});
    }

    next();
  }

  function password(user_password){
    if(!user_password){ return next({id: 4, message: 'Please enter your password'}); }
    if(user_password.length < 8){ return next({id: 5, message: 'Password has to be min 8 chars long'}); }

    next();
  }

  function passwordUpdate(user){
    if(!user.password || !user.new_password || !user.new_password_twice){ return next({id: 7, message: 'Please enter all fields'}); }
    if(user.password.length < 8 || user.new_password.length < 8 || user.new_password_twice.length < 8){ return next({id: 5, message: 'Password has to be min 8 chars long'}); }
    if(user.password == user.new_password){ return next({id: 8, message: 'New password has to be different from old one'}); }
    if(user.new_password != user.new_password_twice){ return next({id: 9, message: 'New passwords dont match'}); }

    next();
  }

  function passwordReset(user){
    if(!user.new_password || !user.new_password_twice){ return next({id: 7, message: 'Please enter all fields'}); }
    if(user.new_password.length < 8 || user.new_password_twice.length < 8){ return next({id: 5, message: 'Password has to be min 8 chars long'}); }
    if(user.new_password != user.new_password_twice){ return next({id: 9, message: 'New passwords dont match'}); }

    next();
  }

  function email(user_email){
    if(user_email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/) === null){
      return next({id: 3, message: 'Please enter correct email'});
    }

    next();
  }

  function addRemoveFollow(params) {
    if(typeof params === 'undefined'){return next('no params sent');}
    if(params.user._id == params.following._id){ return next("can not follow yourself");}
    if(!params.user._id){return next("no user data sent");}
    if(!params.following._id){return next("to follow/unfollow not sent");}

    next();
  }

};

exports.findFollowers = function(q, next){
  var query = Follower.find();
  query.where(q.args);
  if(q.populated_fields){
    for(var i = 0; i< q.populated_fields.length; i++){
      query.populate(q.populated_fields[i].field, q.populated_fields[i].populate);
    }
  }
  if(q.select){ query.select(q.select); }
  query.exec(function(err, follower_array) {
    next(err, follower_array);
  });
};

exports.findOneFollower = function(q, next){
  var query = Follower.findOne();
  query.where(q.args);
  if(q.select){ query.select(q.select); }
  query.exec(function(err, follower) {
    next(err, follower);
  });
};

exports.saveNewFollower = function(follower, next) {
  var newFollower = new Follower(follower);
  newFollower.save(function(err) {
    if (err) { return next(err); }
    next(null);
  });
};

exports.updateFollower = function(q, next){
  var conditions = q.where;
  var update = q.update;
  var options = {new: true};
  if(q.select){ options.select = q.select; }
  var query = Follower.findOneAndUpdate(conditions, update, options);
  query.exec(function(err, follower) {
    next(err, follower);
  });
};

exports.countFollower = function(q, next){
  Follower.count(q.args, function (err, count) {
    next(err, count);
  });
};

// find users / save new user

// create comment service save new comment / get comments / update comment

// create followings service get followers / get following / update / save new

// -- create favorites service / save new favorite / findFavorite / update + add date removed

//

exports.getNotifications = function(req, next) {

    // get user scenarios
    var args = {};
    args.deleted = false;
    args.draft = false;
    args.author = req.user._id;
    query = Scenario.find();
    query.where(args);
    query.select('_id');
    query.exec(function(err, scenarios) {

      var list_of_scenario_ids = [];
      for(var i = 0; i< scenarios.length; i++){
        list_of_scenario_ids[i] = scenarios[i]._id;
      }

      //get list of comments on those scenarios
      var args = {};
      args.deleted = false;
      var filter_args = [];
      filter_args.push({scenario: { $in : list_of_scenario_ids }});
      args.$and = filter_args;
      query = Comment.find();
      query.populate('author', 'first_name last_name last_modified image_thumb');
      query.populate('scenario', 'name');
      query.where(args);
      query.sort({created: 1});
      query.exec(function(err, comments) {
        if (err) return next(err);

        var list_of_commented_scenario_ids = [];
        var k = 0;

        for(var i = 0; i< comments.length; i++){
          if(list_of_commented_scenario_ids.indexOf(comments[i].scenario._id) == -1){
            list_of_commented_scenario_ids[k] = comments[i].scenario._id;
            k++;
          }
        }

        //get views on commented scenarios
        var args = {};
        args.user = req.user._id;
        var filter_args = [];
        filter_args.push({scenario: { $in : list_of_commented_scenario_ids }});
        args.$and = filter_args;
        query = ScenarioView.aggregate([
          { $match: {scenario: { $in : list_of_commented_scenario_ids } }},
          { $group: { _id: '$scenario', view: {$addToSet : {user: '$user', date: '$date'}}}},
          { $sort: { date: -1 } }
        ]);
        query.exec(function(err, scenario_views) {
          if (err) return next(err);

          createNotifications(comments, scenario_views);

        });

      });

    });

    function createNotifications(comments, scenario_views){

      //console.log(views.length);
      var notifications = [];

      //check if there are comments in user scenarios
      for(var k = 0; k < comments.length; k++){
        for(var i = 0; i < scenario_views.length; i++){
          for(var j = 0; j < scenario_views[i].view.length; j++){

            // if user viewed, check the latest comment date and compare with latest user view date
            if( req.user._id != comments[k].author._id &&
                scenario_views[i].view[j].user == req.user._id &&
                scenario_views[i]._id.toString() == comments[k].scenario._id.toString()
              ){
                var notification = {
                  user: {
                    _id: comments[k].author._id,
                    first_name: comments[k].author.first_name,
                    last_name: comments[k].author.last_name,
                    last_modified: comments[k].author.last_modified,
                    image_thumb: comments[k].author.image_thumb,
                  },
                  comment: {
                    created: comments[k].created,
                    scenario: {
                      _id: comments[k].scenario._id,
                      name: comments[k].scenario.name
                    }
                  }
                };

                if(comments[k].created > scenario_views[i].view[j].date){
                  notification.new = true;
                }

                notifications.push(notification);

                // add only one from view list
                break;

            }
          }
        }
      }

      //order by comment date
      notifications = notifications.sort(notificationsSortFunction);
      function notificationsSortFunction(a, b) {
        if (a.comment.created === b.comment.created) {
          return 0;
        }
        else {
          return (a.comment.created > b.comment.created) ? -1 : 1;
        }
      }

      if(typeof req.limit !== 'undefined'){
        notifications = notifications.slice(0, req.limit);
      }

      return next(null, {notifications: notifications});
    }


};

exports.getUsersList = function(req, next) {
  //console.log(req.user._id);

  query = User.find();
  query.where({_id: {'$ne':req.user._id }});
  query.select('first_name last_name organization image_thumb last_modified');
  query.sort({first_name: 1});
  query.exec(function(err, users) {
    if (err) return next(err);

    var following_query = Follower.find();
    args = {};
    multiple_args = [];
    multiple_args.push({follower: req.user._id});
    multiple_args.push({ removed: null });
    args.$and = multiple_args;
    following_query.where(args);
    following_query.select('following');
    following_query.exec(function(err, following) {
      if (err) return next(err);

      var response = {
        users: users
      };

      if(following){response.following = following;}

      return next(null, response);
    });

  });

};
