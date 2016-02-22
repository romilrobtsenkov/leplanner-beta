module.exports = function() {

  var passport = require('passport');
  var bcrypt = require('bcrypt');
  var passportLocal = require('passport-local');

  var mongoService = require('../services/mongo-service');

  var User = require('../models/user').User;


  passport.use(new passportLocal.Strategy({usernameField: 'email'}, function(email, password, next) {

    var q = {};
    q.args = {"email": email.toLowerCase()};
    mongoService.findOne(q, User, function(err, user) {
      if (err) { return next(err); }
      if (!user) { return next(null, null,{ message: {id: 10, message: 'Wrong credentials'}}); }

      bcrypt.compare(password, user.password, function(err, same) {
        if (err) { return next(err); }
        if (!same) { return next(null, null,{ message: {id: 10, message: 'Wrong credentials' }}); }
        user.password = undefined;
        if(user.resetPasswordToken){user.resetPasswordToken = undefined;}
        next(null, user);
      });

    });

  }));

  passport.serializeUser(function(user, next) {
    //console.log('serializeUser');
    next(null, user.id);
  });

  passport.deserializeUser(function(id, next) {
    //console.log('deserializeUser');
    mongoService.findById(id, User, function(err, user) {
      if(typeof user !== 'undefined' && user !== null){
        user.password = undefined;
        if(user.resetPasswordExpires){user.resetPasswordExpires = undefined;}
        if(user.resetPasswordToken){user.resetPasswordToken = undefined;}
      }
      next(err, user);
    });
  });

};
