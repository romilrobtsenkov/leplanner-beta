
var passport = require('passport');
var passportLocal = require('passport-local');
const E = require('../errors');
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));

var mongoService = require('../services/mongo-service');

var User = require('../models/user').User;

module.exports = function () {

    passport.use(new passportLocal.Strategy({usernameField: 'email'}, function(email, password, next) {

        console.log(email);
        var response = {};
        var q = { args : { email: email.toLowerCase() } };

        console.log('local authentication');

        mongoService.findOne(q, User)
        .then(function (user) {
            console.log('user found');
            console.log(user);
            if (!user) { return Promise.reject('Wrong credentials'); }

            response.user = user;

            return bcrypt.compareAsync(password, user.password);
        })
        .then(function(same) {
            console.log('compared');
            console.log(same);
            if (!same) { return Promise.reject('Wrong credentials'); }

            response.user.password = undefined;
            response.user.resetPasswordToken = undefined;

            return next(null, response.user);
        })
        .catch(function(error) {
            return next(error);
        });

    }));

    passport.serializeUser(function(user, next) {
        //console.log('serializeUser');
        next(null, user.id);
    });

    passport.deserializeUser(function(id, next) {
        //console.log('deserializeUser');
        mongoService.findById(id, User)
        .then(function (user) {
            if (!user) { return next(null, null); }

            // remove password and tokens
            user.password = undefined;
            if(user.resetPasswordExpires){user.resetPasswordExpires = undefined;}
            if(user.resetPasswordToken){user.resetPasswordToken = undefined;}

            return next(null, user);
        })
        .catch(function (error) {
            console.log(error);
            return next(error);
        });
    });

};
