const express = require('express');
const router = express.Router();
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));
const crypto = Promise.promisifyAll(require('crypto'));
const nodemailer = require('nodemailer');
const sendmailTransport = require('nodemailer-sendmail-transport');

const passport = require('passport');
const saltRounds = 10;

const mongoService = require('../services/mongo-service');

const Follower = require('../models/follower').Follower;
const User = require('../models/user').User;
const Notification = require('../models/notification').Notification;

const config = require('../config/config');
const restrict = require('../auth/restrict');

const E = require('../errors');

const minPasswordLength = 8;

router.post('/', function(req, res) {

    var user = req.body;

    //validate
    if (!user.new_first_name ||
        !user.new_last_name ||
        !user.new_email ||
        !user.new_password) {

        return res.sendStatus(404);
    }

    if(user.new_password.length < minPasswordLength) {
        return res.status(400).send('password too short');
    }

    if (!isValidEmail(user.new_email)) {
        return res.status(400).send('invalid email');
    }

    bcrypt.hashAsync(user.new_password, saltRounds)
    .then(function (hash) {

        var new_user = {
            first_name: user.new_first_name,
            last_name: user.new_last_name,
            organization: user.new_organization,
            email: user.new_email.toLowerCase(),
            password: hash
        };

        return mongoService.saveNew(new_user, User).catch(function (error) {
            if(error.errors.email) {
                return Promise.reject(new E.Error('email exists'));
            }

            return Promise.reject('Mongo error');
        });
    })
    .then(function () {

        // Fix for auto login after new user save
        req.body.email = req.body.new_email;
        req.body.password = req.body.new_password;

        return new Promise(function(resolve, reject) {
            passport.authenticate('local', function(error, user) {

                if(error || !user) { return reject(error); }
                return resolve(user);

            })(req, res);
       });
    })
    .then(function (user) {

        if(!user) { return Promise.reject(new E.NotAuthorizedError('Could not authenticate')); }

        return new Promise(function(resolve, reject) {
            req.logIn(user, function(err) {
              if (err) { return reject(); }
              return resolve({user: {id: user._id, lang: user.lang }});
            });
       });

    })
    .then(function (response) {

        res.status(200).json(response);
    })
    .catch(E.Error, function (err) {
        return res.status(err.statusCode).send(err.message);
    })
    .catch(function (error) {
        console.log(error);
        return res.status(500).send('could not create user');
    });

});

router.post('/list', restrict, function(req, res){

    var response = {};

    var q = {};
    q.args = {_id: {'$ne':req.user._id }};
    q.select =  'first_name last_name organization image_thumb last_modified';
    q.sort = {first_name: 1};

    mongoService.find(q, User)
    .then(function (users) {

        if(!users || users.length === 0) { return Promise.reject(new E.NotFoundError('no users found')); }

        response.users = JSON.parse(JSON.stringify(users));

        var q = {};
        q.args = { follower: req.user._, removed: null };
        q.select = 'following';

        return mongoService.find(q, Follower);
    })
    .then(function (following){

        if(following.length > 0){
            for(var i = 0; i < response.users.length; i++){
                for(var j = 0; j < following.length; j++){
                    if(response.users[i]._id === following[j].following ){
                        response.users[i].following = "following";
                    }
                }
            }
        }

        res.status(200).json(response);
    })
    .catch(E.Error, function (err) {
        return res.status(err.statusCode).send(err.message);
    })
    .catch(function (error) {
        console.log(error);
        return res.status(500).send('could not copy scenario');
    });

});

router.get('/single/:id', function(req, res) {

    var params = req.params;
    if (!params.id) { return res.sendStatus(404); }
    var response = {};

    var q = {};
    q.where = {"_id": params.id};
    q.update = { $inc: { profile_views: 1 }};
    q.select = "-password -resetPasswordExpires -resetPasswordToken";

    mongoService.update(q, User)
    .then(function (user) {
        if(!user) { return Promise.reject(new E.NotFoundError('no user with such id')); }

        response.profile = user;

        // following
        var followingQ = {};
        followingQ.args = {follower: params.id, removed: null };
        followingQ.populated_fields = [];
        followingQ.populated_fields.push({
            field: 'following',
            populate: 'first_name last_name image_thumb last_modified'
        });

        // find followers
        var followerQ = {};
        followerQ.args = { following: params.id, removed: null };
        followerQ.populated_fields = [];
        followerQ.populated_fields.push({
            field: 'follower',
            populate: 'first_name last_name image_thumb last_modified'
        });

        return Promise.props({
            following: mongoService.find(followingQ, Follower),
            followers: mongoService.find(followerQ, Follower)
        });
    })
    .then(function (meta) {
        if(meta.following.length > 0){ response.following = meta.following; }
        if(meta.followers.length > 0){ response.followers = meta.followers; }

        return res.status(200).json(response);
    })
    .catch(E.Error, function (err) {
        return res.status(err.statusCode).send(err.message);
    })
    .catch(function (error) {
        console.log(error);
        return res.status(500).send('could not copy scenario');
    });
});

router.post('/login', function(req, res) {

    var params = req.body;

    if(!params.email ||
        !params.password ||
        !isValidEmail(params.email) ||
        params.password.length < minPasswordLength) {
        return res.status(400).send('Wrong credentials');
    }

    if (params.remember_me) { req.session.cookie.maxAge = config.cookieMaxAge; }

    // !important
    // using req.body.email req.body.password;
    req.body.email = params.email;
    req.body.password = params.password;

    new Promise(function(resolve, reject) {
        passport.authenticate('local', function(error, user) {

            console.log(error, user);

            if(error || !user) { return reject(error); }
            return resolve(user);

        })(req, res);
   })
    .then(function (user) {

        if(!user) { return Promise.reject(new E.NotAuthorizedError('Could not authenticate')); }

        return new Promise(function(resolve, reject) {
            req.logIn(user, function(err) {
              if (err) { return reject(); }
              return resolve({user: {id: user._id,  lang: user.lang }});
            });
       });

    })
    .then(function (response) {

        res.status(200).json(response);
    })
    .catch(E.Error, function (err) {
        return res.status(err.statusCode).send(err.message);
    })
    .catch(function (error) {

        //catch authentication error
        if (error === 'Wrong credentials') {
            return res.status(400).send('Wrong credentials');
        }

        console.log(error);
        return res.status(500).send('could not create user');
    });

});

router.post('/logout', restrict, function(req, res) {

    var userId = req.user._id;

    req.logout();
    req.session.destroy();

    // for logging
    req.user = { _id: userId };

    res.sendStatus(200);
});

router.get('/me', function(req, res){
    //http://toon.io/understanding-passportjs-authentication-flow/
    if(!req.session.passport.user){
        return res.status(401).json({error: 'Unauthorized'});
    }else{
        return res.status(200).json(req.user);
    }
});

router.post('/notifications/', restrict , function(req, res) {

    var user_id = req.body.user._id;

    var q = {};
    q.args = { user: user_id, type: 'comment' };
    q.populated_fields = [];
    q.populated_fields.push({
        field: 'data.user',
        populate: 'first_name last_name last_modified image_thumb'
    });
    q.populated_fields.push({
        field: 'data.scenario',
        populate: 'name '
    });
    q.select = '-type';
    q.sort = { created: -1 };
    if(typeof req.body.limit !== 'undefined'){
        q.limit = req.body.limit;
    }

    mongoService.find(q, Notification)
    .then(function(notifications) {
        res.status(200).json({ notifications: notifications });
    }).catch(function (error) {
        console.log(error);
        return res.status(500).send('could not create user');
    });

});

router.post('/reset-password', function(req, res) {

    var user = req.body;

    if((!user.new_password || !user.new_password_twice) ||
        (user.new_password !== user.new_password_twice) ||
        (user.new_password.length < 8)) {

        return res.sendStatus(400);
    }

    var q = {};
    q.args = { resetPasswordToken: user.token};

    mongoService.findOne(q, User)
    .then(function (user_from_db) {

        if(!user_from_db){ return Promise.reject(new E.NotFoundError('token not valid')); }
        if(user_from_db.resetPasswordExpires < Date.now()){ return Promise.reject(new E.NotFoundError('token expired')); }

        //for saving to db
        user._id = user_from_db._id;

        // create new password
        return bcrypt.hashAsync(user.new_password, saltRounds);
    })
    .then(function(new_password) {

        var update = {
            password: new_password,
            last_modified: new Date(),
            resetPasswordToken: ''
        };
        var q = {};
        q.where = {_id: user._id};
        q.update = update;

        return mongoService.update(q, User);
    })
    .then(function () {
        return res.sendStatus(200);
    })
    .catch(E.Error, function (err) {
        return res.status(err.statusCode).send(err.message);
    })
    .catch(function (error) {
        console.log(error);
        return res.status(500).send('could not update password');
    });
});

router.post('/send-reset-token', function(req, res){

    var user_email = req.body.reset_email;
    var userId;

    if (!user_email || !isValidEmail(user_email)) {
        return res.status(400).send('invalid email');
    }

    var q = {
        args: { email: user_email.toLowerCase() }
    };

    mongoService.findOne(q, User)
    .then(function (user) {
        if(!user) {
            return Promise.reject(new E.NotFoundError('no such user'));
        }

        userId = user._id;

        return crypto.randomBytesAsync(20);
    })
    .then(function (buf) {

        var token = buf.toString('hex');
        var update = {
            resetPasswordToken: token,
            resetPasswordExpires : Date.now() + (1000*60*60*2), // 2 hours
        };
        var q = {};
        q.where = { _id: userId };
        q.update = update;
        q.select = "email resetPasswordToken";

        return mongoService.update(q, User);
    })
    .then(function (user) {

        return new Promise(function (resolve, reject) {
            nodemailer.sendmail = true;
            var transporter = nodemailer.createTransport(sendmailTransport());
            var mailOptions = {
              to: user.email,
              from: config.email,
              subject: 'Password Reset',
              text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                config.site_url + '/#/reset/' + user.resetPasswordToken + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };

            transporter.sendMail(mailOptions, function(err, info) {
              if (err) { return reject(err); }
              return resolve(info);
            });
        });
    })
    .then(function () {
        res.sendStatus(200);
    })
    .catch(E.Error, function (err) {
        return res.status(err.statusCode).send(err.message);
    })
    .catch(function (error) {
        console.log(error);
        return res.status(500).send('unable to send email');
    });
});

router.post('/language', restrict, function(req, res) {

    if(!req.body.lang){ return res.sendStatus(404); }

    var update = {};

    var q = {};
    q.where = {_id: req.user._id};
    q.update = {lang: req.body.lang};
    q.select = "-password -resetPasswordExpires -resetPasswordToken";

    mongoService.update(q, User)
    .then(function (user) {
        if (!user) { return Promise.reject(new E.NotFoundError('No user')); }

        res.sendStatus(200);
    })
    .catch(E.Error, function (err) {
        return res.status(err.statusCode).send(err.message);
    })
    .catch(function (error) {
        console.log(error);
        return res.status(500).send('could not save user language');
    });
});

router.post('/update-password', restrict, function(req, res) {

    var user = req.body.user;

    if((!user.password || !user.new_password || !user.new_password_twice) ||
        (user.password === user.new_password) ||
        (user.new_password !== user.new_password_twice) ||
        (user.new_password.length < 8)){
        return res.sendStatus(400);
    }

    mongoService.findById(req.user._id, User)
    .then(function (user_obj_from_db) {
        return bcrypt.compareAsync(user.password, user_obj_from_db.password);
    })
    .then(function (is_match) {
        if(!is_match){ return Promise.reject(new E.Error('wrong password')); }

        return bcrypt.hashAsync(user.new_password, saltRounds);
    })
    .then(function (new_password) {

        var update = {
            password: new_password,
            last_modified: new Date()
        };
        var q = {};
        q.where = {_id: req.user._id};
        q.update = update;
        q.select = "_id";

        return mongoService.update(q, User);
    })
    .then(function () {

        return res.sendStatus(200);
    })
    .catch(E.Error, function (err) {
        return res.status(err.statusCode).send(err.message);
    })
    .catch(function (error) {
        console.log(error);
        return res.status(500).send('could not update user');
    });
});

router.post('/update', restrict, function(req, res) {

    var user = req.body.user;

    //validate for empty
    if (!user.new_first_name ||
        !user.new_last_name ||
        !user.new_email) {

        return res.sendStatus(404);
    }

    //not changed
    if(user.first_name === user.new_first_name &&
        user.last_name === user.new_last_name &&
        user.organization === user.new_organization &&
        user.email === user.new_email ){
        return res.status(404).send('no changes');
    }

    if (!isValidEmail(user.new_email)) {
        return res.status(400).send('invalid email');
    }

    new Promise(function (resolve, reject) {

        // email not changed, continues
        if(user.email === user.new_email){
            return resolve();
        }

        if(!user.confirm_password){ return reject(new E.Error('no password')); }

        var q = {};
        q.args = { email: user.new_email.toLowerCase()};

        // check if email already in use
        return mongoService.findOne(q, User)
        .then(function (user_with_same_email) {

            if(user_with_same_email){ return Promise.reject(new E.Error('email exists')); }

            return mongoService.findById(req.user._id, User);
        })
        .then(function (user_obj_from_db) {

            return bcrypt.compareAsync(user.confirm_password, user_obj_from_db.password);
        })
        .then(function (is_match) {
            if(!is_match){ return Promise.reject(new E.Error('wrong password')); }

            return resolve();
        })
        .catch(function (error) {
            reject(error);
        });
    })
    .then(function () {

        var update = {};
        if(user.first_name !== user.new_first_name){ update.first_name = user.new_first_name; }
        if(user.last_name !== user.new_last_name){ update.last_name = user.new_last_name; }
        if(user.organization !== user.new_organization){ update.organization = user.new_organization; }

        update.last_modified = new Date();
        if(user.email !== user.new_email){ update.email = user.new_email; }

        var q = {};
        q.where = {_id: req.user._id};
        q.update = update;
        q.select = "-password -resetPasswordExpires -resetPasswordToken";

        return mongoService.update(q, User);
    })
    .then(function (u_user) {

        return res.status(200).json({user: u_user});
    })
    .catch(E.Error, function (err) {
        return res.status(err.statusCode).send(err.message);
    })
    .catch(function (error) {
        console.log(error);
        return res.status(500).send('could not update user');
    });
});

var isValidEmail = function(email) {
    return email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/) !== null;
};

module.exports = router;
