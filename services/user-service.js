var bcrypt = require('bcrypt');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var config = require('../config/config');
var User = require('../models/user').User;

exports.addUser = function(user, next) {

  // prevalidate user input before db, if html validation fails
  if(!user.new_first_name){ return next({id: 0, message: 'Please enter your first name'}); }
  if(!user.new_last_name){ return next({id: 1, message: 'Please enter your last name'}); }
  if(!user.new_email){ return next({id: 2, message: 'Please enter your email'}); }
  if(user.new_email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/) === null){
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

exports.updateUserProfile = function(user, next) {
  // prevalidate user input before db, if html validation fails
  if(!user.new_first_name){ return next({id: 0, message: 'Please enter your first name'}); }
  if(!user.new_last_name){ return next({id: 1, message: 'Please enter your last name'}); }
  if(!user.new_email){ return next({id: 2, message: 'Please enter your email'}); }
  if(user.new_email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/) === null){
    return next({id: 3, message: 'Please enter correct email'});
  }

  var update = {};
  if(user.first_name != user.new_first_name){
    update.first_name = user.new_first_name;
  }
  if(user.last_name != user.new_last_name){
    update.last_name = user.new_last_name;
  }
  if(user.email != user.new_email){
    // mongoose validation fi
    User.findOne({email: user.new_email}, function(err,user_with_same_email) {
      if (err) { return next(err); }
      if(user_with_same_email){
        return next({id: 6, message: 'That email is already in use'});
      }else{
        update.email = user.new_email;
        updateProfile(update);
      }
    });
  }else{
    updateProfile(update);
  }

  function updateProfile(update){
    var query = {"_id": user._id};
    var options = {new: true};
    User.findOneAndUpdate(query, update, options, function(err, user) {
      if (err) { return next(err); }
      if(user){
        return next(null, user);
      }
    });
  }

};

exports.updateUserPassword = function(user, next) {
  // prevalidate user input before db, if html validation fails
  if(!user.password || !user.new_password || !user.new_password_twice){ return next({id: 7, message: 'Please enter all fields'}); }
  if(user.password.length < 8 || user.new_password.length < 8 || user.new_password_twice.length < 8){ return next({id: 5, message: 'Password has to be min 8 chars long'}); }
  if(user.password == user.new_password){ return next({id: 8, message: 'New password has to be different from old one'}); }
  if(user.new_password != user.new_password_twice){ return next({id: 9, message: 'New passwords dont match'}); }

  bcrypt.hash(user.new_password, 10, function(err, hash) {
    if (err) { return next(err); }

    var update = {password: hash};

    var query = {"_id": user._id};
    var options = {new: true};
    User.findOneAndUpdate(query, update, options, function(err, user) {
      if (err) { return next(err); }
      if(user){
        return next(null, user);
      }
    });
  });

};

exports.recoverUser = function(email, next) {

  if(email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/) === null){
    return next({id: 3, message: 'Please enter correct email'});
  }
  User.findOne({email: email}, function(err,user) {

    if (err) { return next(err); }
    if (!user) { return next({id: 20, message: 'No user with that email'}); }

    // replace with token later -http://sahatyalkabov.com/how-to-implement-password-reset-in-nodejs/
    crypto.randomBytes(20, function(err, buf) {
      if (err) { return next(err); }

      var update = {
        resetPasswordToken: buf.toString('hex'),
        resetPasswordExpires : Date.now() + 3600000, // 1 hour
      };
      var query = {"_id": user._id};
      var options = {new: true};
      User.findOneAndUpdate(query, update, options, function(err, user) {
        if (err) { return next(err); }

        if(user){
          return next(null, user);
        }

      });

    });

  });

};

exports.sendUserMail = function(user, next) {
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
        'http://http://node-authentication.eu/#/reset/' + user.resetPasswordToken + '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    };

    transporter.sendMail(mailOptions, function(err) {
      //console.log(err);
      if (err) { return next(err); }
      return next(null, 'done');
    });

};

exports.resetPassword = function(user, next) {

  User.findOne({resetPasswordToken: user.token}, function(err,user_db) {
    if (err) { return next(err); }
    if(!user_db){
      return next({id: 10, message: 'Request new token'});
    }
    if(user_db.resetPasswordExpires > Date.now()){

      if(!user.new_password || !user.new_password_twice){ return next({id: 7, message: 'Please enter all fields'}); }
      if(user.new_password.length < 8 || user.new_password_twice.length < 8){ return next({id: 5, message: 'Password has to be min 8 chars long'}); }
      if(user.new_password != user.new_password_twice){ return next({id: 9, message: 'New passwords dont match'}); }

      bcrypt.hash(user.new_password, 10, function(err, hash) {
        if (err) { return next(err); }

        var update = {
          password: hash,
          resetPasswordToken: undefined,
          resetPasswordExpires: undefined
        };

        var query = {"_id": user_db._id};
        var options = {new: true};
        User.findOneAndUpdate(query, update, options, function(err, user) {
          if (err) { return next(err); }
          if(user){
            return next(null, user);
          }
        });
      });

    }else{
      return next({id: 11, message: 'Token expired'});
    }

  });

};
