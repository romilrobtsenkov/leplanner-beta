const express = require('express');
const router = express.Router();
const restrict = require('../auth/restrict');
const Promise = require('bluebird');

const mongoService = require('../services/mongo-service');

const Favorite = require('../models/favorite').Favorite;
const Scenario = require('../models/scenario').Scenario;

/**
* POST /api/favorites/
* favorite the scenario
*
* @param {Object} params
* scenario_id - id of scenario to be favorited by user
* @return {Status} 200
*/
router.post('/', restrict, function (req, res, next) {

    var params = req.body;

    if (!params.scenario_id) { return res.sendStatus(404); }

    var q = {};
    q.args = { scenario: params.scenario_id, user: req.user._id, removed: null };
    q.select = '_id';

    mongoService.findOneWithPromise(q, Favorite)
    .then(function (favoriteDoc) {

        if (!favoriteDoc) {
            var newFavoriteDoc = { scenario: params.scenario_id, user: req.user._id };
            return mongoService.saveNewWithPromise(newFavoriteDoc, Favorite);
        } else {
            return Promise.resolve();
        }
    })
    .then(function () {

        var q = {};
        q.args = { scenario: params.scenario_id, removed: null };

        return mongoService.countWithPromise(q, Favorite);
    })
    .then(function (count) {

        var q = {};
        q.where = { _id: params.scenario_id };
        q.update = { favorites_count: count };

        return mongoService.updateWithPromise(q, Scenario);
    })
    .then(function () {
        return res.status(200).send('successfully favorited scenario');
    })
    .catch(function (err) {
        console.log(err);
        return res.status(500).send('unable to add to favorites due to server error');
    });

});

/**
* POST /api/favorites/delete/:id
* remove the scenario from favorites
*
* @param {Object} params
* scenario_id - id of scenario to be favorited by user
* @return {Status} 200
*/
router.post('/delete/:scenario_id', restrict, function (req, res, next) {

    var params = req.params;

    if (!params.scenario_id) { return res.sendStatus(404); }

    var q = {};
    q.args = { scenario: params.scenario_id, user: req.user._id, removed: null };
    q.select = '_id';

    mongoService.findOneWithPromise(q, Favorite)
    .then(function (favoriteDoc) {

        if (!favoriteDoc) {
            return Promise.resolve();
        } else {

            var q = {};
            q.where = { _id: favoriteDoc._id };
            q.update = { removed: Date.now() };
            q.select = '_id';

            return mongoService.updateWithPromise(q, Favorite);
        }
    })
    .then(function () {

        var q = {};
        q.args = { scenario: params.scenario_id, removed: null };

        return mongoService.countWithPromise(q, Favorite);
    })
    .then(function (count) {

        var q = {};
        q.where = { _id: params.scenario_id };
        q.update = { favorites_count: count };

        return mongoService.updateWithPromise(q, Scenario);
    })
    .then(function () {
        return res.status(200).send('removed from favorite successfully');
    })
    .catch(function (err) {
        console.log(err);
        return res.status(500).send('unable to add to favorites due to server error');
    });

});

module.exports = router;
