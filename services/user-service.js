var bcrypt = require('bcrypt');
var User = require('../models/user').User;

exports.addUser = function(user, next) {
  user.hashedpassword = user.password;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.hashedpassword = hash;
    var newUser = new User({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email.toLowerCase(),
      password: user.hashedpassword
    });

    newUser.save(function(err) {
      if (err) {
        return next(err);
      }
      next(null);
    });
  });
};

exports.findUser = function(email, next) {
  User.findOne({email: email.toLowerCase()}, function(err, user) {
    next(err, user);
  });
};
