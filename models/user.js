var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoService = require('../services/mongo-service');
var User = require('../models/user').User;
const E = require('../errors');

var userSchema = new Schema({
    first_name: {type: String, required: true },
    last_name: {type: String, required: true },
    email: {type: String, required: true, unique: true },
    password: {type: String, required: true },
    organization: {type: String },
    image: {type: String, default: 'default.jpg' },
    image_thumb: {type: String, default: 'default_thumb.jpg' },
    profile_views: { type: Number, default: 0 },
    following_count: { type: Number, default: 0 },
    followers_count: { type: Number, default: 0 },
    created: {type: Date, default: Date.now },
    last_modified: {type: Date, default: Date.now },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    lang: String
});

//validation on first save
userSchema.path('email').validate(function(value, next) {
    var q = { args: {"email": value } };
    mongoService.findOneWithPromise(q, User)
    .then(function(user) {
        if (user) {return next(false); }

        return next(true);
    });
}, 'Email already exists');

var User = mongoose.model('User', userSchema);

module.exports = {
    User: User
};
