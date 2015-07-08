var express = require('express');
var router = express.Router();
var passport = require('passport');
var userService = require('../services/user-service');
var config = require('../config/config');
var restrict = require('../auth/restrict');

router.post('/create', function(req, res, next) {

  userService.addUser(req.body, function(err) {
    if (err) { return res.json({error: err}); }

    req.session.cookie.maxAge = config.cookieMaxAge;

    // Fix for auto logging in new user
    req.body.email = req.body.new_email;
    req.body.password = req.body.new_password;

    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.json({error: info.message}); }

      req.logIn(user, function(err) {
        if (err) { return next(err); }

        // login successful
        // future: redirect to /users/:id or to linking with social accounts
        res.json({user: {id: user._id}});
      });

    })(req, res, next);

  });

});

router.post('/login', function(req, res, next) {

    req.session.cookie.maxAge = config.cookieMaxAge;

    passport.authenticate('local', function(err, user, info) {

      if (err) { return next(err); }
      if (!user) { return res.json({error: info.message}); }

      req.logIn(user, function(err) {
        if (err) { return next(err); }

        // login successful
        // future: redirect to /users/:id
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

  userService.findByEmail(req.body.recover_email, function(err, user) {
    if (err) { return next(err); }
    if (!user) { return next(null, null,{ message: {id: 20, message: 'No user with that email'}}); }

    // replace with token later -http://sahatyalkabov.com/how-to-implement-password-reset-in-nodejs/
    var token = Math.random()* 10000000000000000;
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    user.save(function(err) {

       console.log(user);
       //TODO send email
       res.json({user: user});

     });

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
