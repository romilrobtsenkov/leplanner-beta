
const passport = require('passport');
const passportLocal = require('passport-local');
const E = require('../errors');
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));

const mongoService = require('../services/mongo-service');

const User = require('../models/user').User;

const log = require('../logger');

module.exports = function () {

    passport.use(new passportLocal.Strategy({usernameField: 'email'}, function(email, password, next) {

        var response = {};
        var q = { args : { email: email.toLowerCase() } };


        mongoService.findOne(q, User)
        .then(function (user) {
            if (!user) { return Promise.reject('Wrong credentials'); }

            response.user = user;

            return bcrypt.compareAsync(password, user.password);
        })
        .then(function(same) {
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
            log.error(error);
            return next(error);
        });
    });

};
