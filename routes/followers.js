const express = require('express');
const router = express.Router();
const restrict = require('../auth/restrict');
const Promise = require('bluebird');

const mongoService = require('../services/mongo-service');

const Follower = require('../models/follower').Follower;
const User = require('../models/user').User;

const log = require('../logger');

router.post('/:id',restrict, function(req, res) {

    var params = req.params;
    if (!params.id) { return res.sendStatus(404); }
    if(params.id === req.user._id){ return res.status(404).send("can not follow yourself");}

    var response;

    var q = {};
    q.args = { follower: req.user._id, following: params.id, removed: null };
    q.populated_fields = [];
    q.populated_fields.push({
      field: 'follower',
      populate: 'first_name last_name image_thumb last_modified'
    });

    mongoService.findOne(q, Follower)
    .then(function (follower) {

        if(follower){ return Promise.resolve (follower); }

        var newFollower = { follower: req.user._id, following: params.id };

        return mongoService.saveNew(newFollower, Follower)
        .then(function(follower) {
            return Follower.populate(follower, { path: 'follower', select: 'first_name last_name image_thumb last_modified' });
        });

    })
    .then(function (follower) {

        response = follower;

        //get Both user counts
        var followingQ = {};
        followingQ.args = {follower: req.user._id, removed: null};

        var followersQ = {};
        followersQ.args = {following: params.id, removed: null};

        return Promise.props({
            following_count: mongoService.count(followingQ, Follower),
            followers_count: mongoService.count(followersQ, Follower)
        });
    })
    .then(function(counts){

        var currentUserQ = {};
        currentUserQ.where = {"_id": req.user._id};
        currentUserQ.update = { following_count: counts.following_count };

        var followedUserQ = {};
        followedUserQ.where = {"_id": params.id};
        followedUserQ.update = { followers_count: counts.followers_count };

        return [mongoService.update(currentUserQ, User),
                mongoService.update(followedUserQ, User)];
    })
    .then(function () {
        res.status(200).json(response);
    })
    .catch(function (error) {
        log.error(error);
        return res.status(500).send('could not follow due to server error');
    });

});

router.post('/remove/:id',restrict, function(req, res) {

    var params = req.params;
    if (!params.id) { return res.sendStatus(404); }
    if(params.id === req.user._id){ return res.status(404).send("can not unfollow yourself");}

    var response;

    var q = {};
    q.args = { follower: req.user._id, following: params.id, removed: null };
    q.select = "_id";

    mongoService.findOne(q, Follower)
    .then(function (follower) {

        if(!follower){ return Promise.resolve(follower); }

        var q = {};
        q.where = {"_id": follower._id};
        q.update =  { removed : Date.now() };
        q.select = "_id";

        return mongoService.update(q, Follower);
    })
    .then(function (follower) {

        response = follower;

        //get Both user counts
        var followingQ = {};
        followingQ.args = {follower: req.user._id, removed: null};

        var followersQ = {};
        followersQ.args = {following: params.id, removed: null};

        return Promise.props({
            following_count: mongoService.count(followingQ, Follower),
            followers_count: mongoService.count(followersQ, Follower)
        });
    })
    .then(function(counts){

        var currentUserQ = {};
        currentUserQ.where = {"_id": req.user._id};
        currentUserQ.update = { following_count: counts.following_count };

        var followedUserQ = {};
        followedUserQ.where = {"_id": params.id};
        followedUserQ.update = { followers_count: counts.followers_count };

        return [mongoService.update(currentUserQ, User),
                mongoService.update(followedUserQ, User)];
    })
    .then(function () {
        res.status(200).json(response);
    })
    .catch(function (error) {
        log.error(error);
        return res.status(500).send('could not unfollow due to server error');
    });

});

module.exports = router;
