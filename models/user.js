var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userService = require('../services/user-service');

var userSchema = new Schema({
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  organization: {type: String},
  profile_views: { type: Number, default: 0},
  following_count: { type: Number, default: 0},
  followers_count: { type: Number, default: 0},
  created: {type: Date, default: Date.now},
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

userSchema.path('email').validate(function(value, next) {
  userService.findByEmail(value, function(err, user) {
    if (err) { return next(false); }
    next(!user);
  });
}, 'That email is already in use');

var User = mongoose.model('User', userSchema);

module.exports = {
  User: User
};
