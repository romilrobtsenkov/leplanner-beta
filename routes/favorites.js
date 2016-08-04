const express = require('express');
const router = express.Router();
const restrict = require('../auth/restrict');
const Promise = require('bluebird');

const mongoService = require('../services/mongo-service');

const Favorite = require('../models/favorite').Favorite;
const Scenario = require('../models/scenario').Scenario;

const log = require('../logger');

router.post('/', restrict, function (req, res) {

    var params = req.body;

    if (!params.scenario_id) { return res.sendStatus(404); }

    var q = {};
    q.args = { scenario: params.scenario_id, user: req.user._id, removed: null };
    q.select = '_id';

    mongoService.findOne(q, Favorite)
    .then(function (favoriteDoc) {

        if (!favoriteDoc) {
            var newFavoriteDoc = { scenario: params.scenario_id, user: req.user._id };
            return mongoService.saveNew(newFavoriteDoc, Favorite);
        } else {
            return Promise.resolve();
        }
    })
    .then(function () {

        var q = {};
        q.args = { scenario: params.scenario_id, removed: null };

        return mongoService.count(q, Favorite);
    })
    .then(function (count) {

        var q = {};
        q.where = { _id: params.scenario_id };
        q.update = { favorites_count: count };

        return mongoService.update(q, Scenario);
    })
    .then(function () {
        return res.status(200).send('successfully favorited scenario');
    })
    .catch(function (err) {
        log.error(err);
        return res.status(500).send('unable to add to favorites due to server error');
    });

});

router.post('/delete/:scenario_id', restrict, function (req, res) {

    var params = req.params;

    if (!params.scenario_id) { return res.sendStatus(404); }

    var q = {};
    q.args = { scenario: params.scenario_id, user: req.user._id, removed: null };
    q.select = '_id';

    mongoService.findOne(q, Favorite)
    .then(function (favoriteDoc) {

        if (!favoriteDoc) {
            return Promise.resolve();
        } else {

            var q = {};
            q.where = { _id: favoriteDoc._id };
            q.update = { removed: Date.now() };
            q.select = '_id';

            return mongoService.update(q, Favorite);
        }
    })
    .then(function () {

        var q = {};
        q.args = { scenario: params.scenario_id, removed: null };

        return mongoService.count(q, Favorite);
    })
    .then(function (count) {

        var q = {};
        q.where = { _id: params.scenario_id };
        q.update = { favorites_count: count };

        return mongoService.update(q, Scenario);
    })
    .then(function () {
        return res.status(200).send('removed from favorite successfully');
    })
    .catch(function (err) {
        log.error(err);
        return res.status(500).send('unable to add to favorites due to server error');
    });

});

module.exports = router;
