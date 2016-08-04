const express = require('express');
const router = express.Router();
const restrict = require('../auth/restrict');
const Promise = require('bluebird');

const mongoService = require('../services/mongo-service');

const Scenario = require('../models/scenario').Scenario;
const Comment = require('../models/comment').Comment;
const Notification = require('../models/notification').Notification;

const E = require('../errors');

router.post('/', restrict, function (req, res) {

    var params = req.body;

    if (!params.comment.text ||
        !params.user._id ||
        !params.scenario._id ||
        !params.author._id) { return res.sendStatus(404); }

    var newComment = {
        text: params.comment.text,
        author: params.user._id,
        scenario: params.scenario._id,
    };

    mongoService.saveNew(newComment, Comment)
    .then(function (comment) {

        // No notification if scenario author comments own scenario
        if (params.author._id === params.user._id) { return Promise.resolve(); }

        var newNotification = {
            user: params.author._id,
            type: 'comment',
            data: {
                comment: comment._id,
                user: params.user._id,
                scenario: params.scenario._id,
            },
        };

        return mongoService.saveNew(newNotification, Notification);
    })
    .then(function () {

        var q = {};
        q.args = { scenario: params.scenario._id, deleted: false };
        q.populated_fields = [];
        q.populated_fields.push({
            field: 'author',
            populate: 'first_name last_name last_modified image_thumb',
        });

        return mongoService.count(q, Comment);
    })
    .then(function (count) {

        var q = {};
        q.where = { _id: params.scenario._id };
        q.update = { comments_count: count };

        return mongoService.update(q, Scenario);
    })
    .then(function () {
        return res.status(200).send('comment successfully saved');
    })
    .catch(function (err) {
        console.log(err);
        return res.status(500).send('comment saving failed due to server error');
    });
});

router.get('/scenario/:id', function (req, res) {

    var params = req.params;

    if (!params.id) { return res.sendStatus(404); }

    var q = {};
    q.args = { scenario: params.id, deleted: false };
    q.populated_fields = [];
    q.populated_fields.push({
        field: 'author',
        populate: 'first_name last_name last_modified image_thumb',
    });

    mongoService.find(q, Comment)
    .then(function (comments) {
        return res.status(200).json({ comments: comments });
    })
    .catch(function (err) {
        console.log(err);
        return res.status(500).send('comments retrieving failed due to server error');
    });
});

router.post('/delete/:id', restrict, function (req, res) {

    var params = req.params;
    var scenarioId; // store scenario id which has comment

    if (!params.id) { return res.sendStatus(404); }

    var q = {};
    q.where = { _id: params.id, deleted: false };
    q.select = 'scenario';

    mongoService.update(q, Comment)
    .then(function (comment) {

        if (comment === null) { return Promise.reject(new E.NotFoundError()); }

        scenarioId = comment.scenario;

        //check if user has rights to delete the comment
        var q = {};
        q.args = { _id: scenarioId, author: req.user._id };

        return mongoService.findOne(q, Scenario);
    })
    .then(function (scenario) {

        if (scenario === null) {
            // passport req user different from scenario author
            return Promise.reject(new E.ForbiddenError('no access to others scenarios'));
        }

        var q = {};
        q.where = { _id: params.id, deleted: false };
        q.update = {
            deleted: true,
            deleted_date: new Date(),
        };
        q.select = '_id';

        return mongoService.update(q, Comment);
    })
    .then(function (comment) {

        var q = {};
        q.args = { scenario: scenarioId, deleted: false };

        return mongoService.count(q, Comment);
    })
    .then(function (count) {

        var q = {};
        q.where = { _id: scenarioId };
        q.update = { comments_count: count };

        return mongoService.update(q, Scenario);
    })
    .then(function () {
        return res.status(200).send('scenario comment successfully deleted');
    })
    .catch(E.Error, function (err) {
        return res.status(err.statusCode).send(err.message);
    })
    .catch(function (err) {
        console.log(err);
        return res.status(500).send('could not delete comment due to server error');
    });

});

module.exports = router;
