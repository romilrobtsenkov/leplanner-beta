var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userService = require('../services/user-service');

var userSchema = new Schema({
  firstName: {type: String, required: 'Please enter your first name'},
  lastName: {type: String, required: 'Please enter your last name'},
  email: {type: String, required: 'Please enter your email'},
  password: {type: String, required: 'Please enter your password'},
  created: {type: Date, default: Date.now}
});

//  roomNumber: {type: Number, required: 'Please enter your room number', min:[100, 'Not a valid room number']},

userSchema.path('email').validate(function(value, next) {
  userService.findUser(value, function(err, user) {
    if (err) {
      console.log(err);
      return next(false);
    }
    next(!user);
  });
}, 'That email is already in use');

var User = mongoose.model('User', userSchema);

module.exports = {
  User: User
};
