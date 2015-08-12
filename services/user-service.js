var bcrypt = require('bcrypt');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var config = require('../config/config');
var User = require('../models/user').User;

exports.bcryptCreatePassword = function(password, next) {
  bcrypt.hash(password, 10, function(err, hash) {
    next(err, hash);
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

exports.find = function(q, next){
  var query = User.find();
  query.where(q.args);
  if(q.populated_fields){
    for(var i = 0; i< q.populated_fields.length; i++){
      query.populate(q.populated_fields[i].field, q.populated_fields[i].populate);
    }
  }
  if(q.select){ query.select(q.select); }
  if(q.sort){ query.sort(q.sort); }
  if(q.limit){ query.limit(q.limit); }
  query.exec(function(err, array) {
    next(err, array);
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

exports.findById = function(id, next) {
  User.findById(id, function(err, user) {
    next(err, user);
  });
};

exports.saveNew = function(new_user, next) {
  var newUser = new User(new_user);
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
  nodemailer.sendmail = true;
  var transporter = nodemailer.createTransport();
  var mailOptions = {
    to: user.email,
    from: config.email,
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

exports.update = function(q, next){
  var conditions = q.where;
  var update = q.update;
  var options = {new: true};
  if(q.select){ options.select = q.select; }
  var query = User.findOneAndUpdate(conditions, update, options);
  if(q.populated_fields){
    for(var i = 0; i< q.populated_fields.length; i++){
      query.populate(q.populated_fields[i].field, q.populated_fields[i].populate);
    }
  }
  query.exec(function(err, user) {
    next(err, user);
  });
};
