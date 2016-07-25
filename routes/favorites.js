const express = require('express');
const router = express.Router();

const restrict = require('../auth/restrict');

const Promise = require('bluebird');

const mongoService = require('../services/mongo-service');
const validateService = require('../services/validate-service');
const validationPromise = Promise.promisify(validateService.validate);
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
router.post('/', restrict, function(req, res, next) {

    var params = req.body;

    if(!params.scenario_id){return res.sendStatus(400);}

    var q = {};
    q.args = { scenario: params.scenario_id, user: req.user._id, removed: null };
    q.select = '_id';

    mongoService.findOneWithPromise(q, Favorite)
    .then(function(favorite_doc) {
        if(!favorite_doc){
            var new_favorite_doc = { scenario: params.scenario_id, user: req.user._id };
            return mongoService.saveNewWithPromise(new_favorite_doc, Favorite);
        }else{
            return Promise.resolve();
        }
    })
    .then(function() {
        var q = {};
        q.args = {scenario: params.scenario_id, removed: null};
        return mongoService.countWithPromise(q, Favorite);
    })
    .then(function(count) {
        var q = {};
        q.where = {"_id": params.scenario_id};
        q.update = { favorites_count: count };
        return mongoService.updateWithPromise(q, Scenario);
    })
    .then(function () {
        res.sendStatus(200);
    })
    .catch(function (err) {
        console.log(err);
        res.json({error: err});
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
router.post('/delete/:scenario_id', restrict, function(req, res, next) {

    var params = req.params;

    if(!params.scenario_id){return res.sendStatus(400);}

    var q = {};
    q.args = { scenario: params.scenario_id, user: req.user._id, removed: null };
    q.select = '_id';

    mongoService.findOneWithPromise(q, Favorite)
    .then(function(favorite_doc) {
        if(!favorite_doc){
            return Promise.resolve();
        }else{
            var q = {};
            q.where = {"_id": favorite_doc._id};
            q.update = { removed : Date.now() };
            q.select = "_id";

            return mongoService.updateWithPromise(q, Favorite);
        }
    })
    .then(function() {
        var q = {};
        q.args = {scenario: params.scenario_id, removed: null};
        return mongoService.countWithPromise(q, Favorite);
    })
    .then(function(count) {
        var q = {};
        q.where = {"_id": params.scenario_id};
        q.update = { favorites_count: count };
        return mongoService.updateWithPromise(q, Scenario);
    })
    .then(function () {
        res.status(200).send({message:'removed successfully'});
    })
    .catch(function (err) {
        console.log(err);
        res.json({error: err});
    });

});

module.exports = router;
