var express = require('express');
var router = express.Router();
var passport = require('passport');
var userService = require('../services/user-service');
var config = require('../config/config');
var restrict = require('../auth/restrict');

router.post('/create', function(req, res, next) {

  userService.addUser(req.body, function(err) {
    if (err) { return res.json({error: err}); }

    // Fix for auto logging in new user
    req.body.email = req.body.new_email;
    req.body.password = req.body.new_password;

    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.json({error: info.message}); }

      req.logIn(user, function(err) {
        if (err) { return next(err); }

        res.json({user: {id: user._id}});
      });

    })(req, res, next);

  });

});

router.post('/login', function(req, res, next) {
    //console.log(req.body);
    if (req.body.rememberMe) {
      req.session.cookie.maxAge = config.cookieMaxAge;
    }

    passport.authenticate('local', function(err, user, info) {

      if (err) { return next(err); }
      if (!user) { return res.json({error: info.message}); }

      req.logIn(user, function(err) {
        if (err) { return next(err); }

        res.json({user: {id: user._id}});
      });

    })(req, res, next);

});

router.get('/logout', restrict, function(req, res, next) {
  req.logout();
  req.session.destroy();
  res.json({success: 'logout sucessfull'});
});

router.post('/recover', function(req, res){

  userService.recoverUser(req.body.recover_email, function(err, user) {
    if (err) { return res.json({error: err}); }

    if(user){
      userService.sendUserMail(user, function(err, success){
        if (err) { return res.json({error: err}); }

        res.json({success: success});
      });

    }else{
      res.json({error: 'Unknown error'});
    }

  });

});

router.post('/updateprofile', restrict, function(req, res, next) {

  userService.updateUserProfile(req.body.user, function(err, user) {
    if (err) { return res.json({error: err}); }
    if(user){
      user.password = undefined;
      if(user.resetPasswordToken){user.resetPasswordToken = undefined;}
      if(user.resetPasswordExpires){user.resetPasswordExpires = undefined;}
      res.json({user: user});
    }else{
      res.json({error: 'Unknown error'});
    }

  });

});

router.post('/updatepassword', restrict, function(req, res, next) {

  userService.updateUserPassword(req.body.user, function(err, user) {
    if (err) { return res.json({error: err}); }
    if(user){
      res.json({user: {id: user._id}});
    }else{
      res.json({error: 'Unknown error'});
    }

  });

});

router.post('/resetpassword', function(req, res, next) {

  userService.resetPassword(req.body, function(err, user) {
    if (err) { return res.json({error: err}); }
    if(user){
      res.json({user: {id: user._id}});
    }else{
      res.json({error: 'Unknown error'});
    }

  });

});

router.post('/get-user-following', function(req, res, next) {
  userService.getFollowing(req.body, function(err, profile) {
    if (err) { return res.json({error: err}); }
    return res.json({profile: profile});
  });

});

router.post('/add-remove-follow/',restrict, function(req, res, next) {
  userService.addRemoveFollow(req.body, function(err, response) {
    if (err) { return res.json({error: err}); }
    return res.json(response);
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
