var bcrypt = require('bcrypt');
var User = require('../models/user').User;

exports.addUser = function(user, next) {

  // prevalidate user input before db, if html validation fails
  if(!user.new_first_name){ return next({id: 0, message: 'Please enter your first name'}); }
  if(!user.new_last_name){ return next({id: 1, message: 'Please enter your last name'}); }
  if(!user.new_email){ return next({id: 2, message: 'Please enter yout email'}); }
  if(user.new_email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/) == null){
    return next({id: 3, message: 'Please enter correct email'});
  }
  if(!user.new_password){ return next({id: 4, message: 'Please enter your password'}); }
  if(user.new_password.length < 8){ return next({id: 5, message: 'Password has to be min 8 chars long'}); }

  user.hashedpassword = user.new_password;

    bcrypt.hash(user.new_password, 10, function(err, hash) {
      if (err) { return next(err); }

      user.hashedpassword = hash;
      var newUser = new User({
        first_name: user.new_first_name,
        last_name: user.new_last_name,
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
    });

};

exports.findByEmail = function(email, next) {
  User.findOne({email: email.toLowerCase()}, function(err, user) {
    next(err, user);
  });
};

exports.findById = function(id, next) {
  User.findById(id, function(err, user) {
    next(err, user);
  });
};
