const express = require('express');
const router = express.Router();

const restrict = require('../auth/restrict');

const Promise = require('bluebird');

const mongoService = require('../services/mongo-service');

const Scenario = require('../models/scenario').Scenario;
const Comment = require('../models/comment').Comment;
const Notification = require('../models/notification').Notification;

/**
* POST /api/comments/
* create new scenario comment, adds notification, updates scenarios comment count, returns all scenario omments
*
* @param {Object} params
*   comment.text - comment
*   user._id - comment author
*   scenario._id - commented scenario
*   author._id - commented scenario author
* @return {Status} 200
*/
router.post('/', restrict, function (req, res, next) {

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

    mongoService.saveNewWithPromise(newComment, Comment)
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

        return mongoService.saveNewWithPromise(newNotification, Notification);
      })
    .then(function () {

        var q = {};
        q.args = { scenario: params.scenario._id, deleted: false };
        q.populated_fields = [];
        q.populated_fields.push({
            field: 'author',
            populate: 'first_name last_name last_modified image_thumb',
          });

        return mongoService.countWithPromise(q, Comment);
      })
    .then(function (count) {

        var q = {};
        q.where = { _id: params.scenario._id };
        q.update = { comments_count: count };

        return mongoService.updateWithPromise(q, Scenario);
      })
    .then(function () {
        res.status(200).send('comment successfully saved');
      })
    .catch(function (err) {
        console.log(err);
        res.status(500).send('comment saving failed due to server error');
      });
  });

/**
* GET /api/comments/scenario/:id
* retrieve all scenario comments
* based on given scenario id
*
* @param {String} scenario_id
* @return {Status} 200
*/
router.get('/scenario/:id', function (req, res, next) {

    var params = req.params;

    if (!params.id) { return res.sendStatus(404); }

    var q = {};
    q.args = { scenario: params.id, deleted: false };
    q.populated_fields = [];
    q.populated_fields.push({
        field: 'author',
        populate: 'first_name last_name last_modified image_thumb',
      });

    mongoService.findWithPromise(q, Comment)
    .then(function (comments) {
        res.json({ comments: comments });
      })
    .catch(function (err) {
        console.log(err);
        res.status(500).send('comments retrieving failed due to server error');
      });
  });

/**
* POST /api/comments/delete/:id
* delete comment based on passed id, update comment count
*
* @param {String} id of the comment
* @return {Status} 200
*/
router.post('/delete/:id', restrict, function (req, res, next) {

    var params = req.params;
    var scenarioId; // store scenario id which has comment

    if (!params.id) { return res.sendStatus(404); }

    var q = {};
    q.where = { _id: params.id, deleted: false };
    q.select = 'scenario';

    mongoService.updateWithPromise(q, Comment)
    .then(function (comment) {

        if (comment === null) { return res.sendStatus(404); }

        scenarioId = comment.scenario;

        //check if user has rights to delete the comment
        var q = {};
        q.args = { _id: scenarioId, author: req.user._id };

        return mongoService.findOneWithPromise(q, Scenario);
      })
    .then(function (scenario) {

        if (scenario === null) {
          // passport req user different from scenario author
          return res.status(403).send('no access to others scenarios');
        }

        var q = {};
        q.where = { _id: params.id, deleted: false };
        q.update = {
            deleted: true,
            deleted_date: new Date(),
          };
        q.select = '_id';

        return mongoService.updateWithPromise(q, Comment);
      })
    .then(function (comment) {

        var q = {};
        q.args = { scenario: scenarioId, deleted: false };

        return mongoService.countWithPromise(q, Comment);
      })
    .then(function (count) {

        var q = {};
        q.where = { _id: scenarioId };
        q.update = { comments_count: count };

        return mongoService.updateWithPromise(q, Scenario);
      })
    .then(function () {
        res.status(200).send('scenario comment successfully deleted');
      })
    .catch(function (err) {
        console.log(err);
        res.status(500).send('could not delete comment due to server error');
      });

  });

module.exports = router;