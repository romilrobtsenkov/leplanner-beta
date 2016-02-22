var bcrypt = require('bcrypt');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var config = require('../config/config');

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
