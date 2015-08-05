var express = require('express');
var router = express.Router();
var restrict = require('../auth/restrict');
var scenarioService = require('../services/scenario-service');
var commentService = require('../services/comment-service');
var notificationService = require('../services/notification-service');
var validateService = require('../services/validate-service');
var favoriteService = require('../services/favorite-service');
var followerService = require('../services/follower-service');
var async = require('async');

router.post('/single-scenario/', function(req, res, next) {

  var params = req.body;

  async.waterfall([
    function(next){

      var q = {};
      q.where = { _id: params.scenario._id };
      q.populated_fields = [];
      q.populated_fields.push({
        field: 'author',
        populate: 'first_name last_name organization created image last_modified'
      });
      q.update = { $inc: { view_count: 1 } };

      scenarioService.update(q, function(err, scenario){
        if (err) { return next({error: err}); }
        var response = {
          scenario: scenario,
          is_favorite: false,
          is_following: false
        };
        next(null, response);
      });
    },
    function(response, next){
      if(typeof params.user === 'undefined'){ return next(null, response); } // skip

      var q = {};
      q.args = { scenario: response.scenario._id, user: params.user._id };

      favoriteService.findOne(q, function(err, favorite){
        if (err) { return next({error: err}); }
        if(favorite !== null){ response.is_favorite = true; }
        next(null, response);
      });
    },
    function(response, next){
      if(typeof params.user === 'undefined'){ return next(null, response); } //skip

      var q = {};
      q.args = { follower: params.user._id, following: response.scenario.author._id, removed: null };

      followerService.findOne(q, function(err, following){
        if (err) { return next({error: err}); }
        if(following !== null){ response.is_following = true; }
        next(null, response);
      });
    },
    function(response, next){

      // if author viewing if there are notifications - mark them as seen!
      if(typeof params.user === 'undefined' && params.user._id !== response.scenario.author._id.toString()){ return next(null, response); }

      var q = {};
      q.where = { user: params.user._id, type: 'comment', 'data.scenario': response.scenario._id, seen: null };
      q.update = { seen: new Date() };

      notificationService.updateMultiple(q, function(err, notifications){
        if (err) { return next({error: err}); }
        console.log('modified notifications :'+notifications.nModified);
        next(null, response);
      });
    }
  ], function (err, result) {
    if(err){ res.json(err); }
    res.json(result);
  });
});

// TODO
router.post('/scenarios-widget-list/', function(req, res, next) {
  scenarioService.getWidgetScenarios(req.body, function(err, scenarios) {
    if (err) { return res.json({error: err}); }
    return res.json({scenarios: scenarios});
  });
});

// TODO
router.post('/scenarios-dash-list/', restrict, function(req, res, next) {
  scenarioService.getDashScenarios(req.body, function(err, scenarios) {
    if (err) { return res.json({error: err}); }
    return res.json({scenarios: scenarios});
  });
});

// TODO
router.post('/scenarios-user-list/', function(req, res, next) {
  scenarioService.getUserScenarios(req.body, function(err, scenarios) {
    if (err) { return res.json({error: err}); }
    return res.json({scenarios: scenarios});
  });
});

// TODO
router.post('/create/',restrict, function(req, res, next) {
  scenarioService.saveScenario(req.body.scenario, function(err, success) {
    if (err) { return res.json({error: err}); }
    return res.json({success: 'Saved successfully'});
  });
});

// TODO
router.post('/search/', function(req, res, next) {
  scenarioService.searchScenarios(req.body, function(err, scenarios) {
    if (err) { return res.json({error: err}); }
    return res.json({scenarios: scenarios});
  });
});

// TODO
router.post('/add-remove-favorite/',restrict, function(req, res, next) {
  scenarioService.addRemoveFavorite(req.body, function(err, response) {
    if (err) { return res.json({error: err}); }
    return res.json(response);
  });
});

router.post('/add-comment/',restrict, function(req, res, next) {

  var params = req.body;

  async.waterfall([
    function(next){

      validateService.validate([{fn:'commentData', data:params}], function(err){
        if (err) { return next({error: err}); }
        next();
      });
    },
    function(next){

      var new_comment = {
        text: params.comment.text,
        author: params.user._id,
        scenario: params.scenario._id,
      };

      commentService.saveNew(new_comment, function(err, comment) {
        if (err) { return next({error: err}); }
        next(null, comment);
      });
    },
    function(comment, next){

      // No notification if scenario author comments own scenario
      if(params.author._id == params.user._id){ return next(); }

      new_notification = {
        user: params.author._id,
        type: "comment",
        data: {
          comment: comment._id,
          user: params.user._id,
          scenario: params.scenario._id,
        }
      };

      notificationService.saveNew(new_notification, function(err) {
        if (err) { return next({error: err}); }
        next();
      });
    },
    function(next){

      var q = {};
      q.args = { scenario: params.scenario._id, deleted: false };
      q.populated_fields = [];
      q.populated_fields.push({
        field: 'author',
        populate: 'first_name last_name last_modified image_thumb'
      });

      commentService.find(q, function(err, comments){
        if (err) { return next({error: err}); }
        next(null, comments);
      });
    },
    function(comments, next){

      var q = {};
      q.where = { _id: params.scenario._id };
      q.update = { comments_count: comments.length};

      scenarioService.update(q, function(err){
        if (err) { return next({error: err}); }
        next(null, { comments: comments });
      });
    }
  ], function (err, result) {
    if(err){ res.json(err); }
    res.json(result);
  });

});

router.post('/delete-comment/',restrict, function(req, res, next) {

  var params = req.body;

  async.waterfall([
    function(next){

      validateService.validate([{fn:'deleteComment', data:params}], function(err){
        if (err) { return next({error: err}); }
        next();
      });
    },
    function(next){

      //check if user has rights to delete the comment
      var q = {};
      q.args = { _id: params.scenario._id, author: req.user._id };

      scenarioService.findOne(q, function(err, user){
        if (err) { return next({error: err}); }
        if(user === null){
          // passport req user different from scenario author
          return next({id: 3, message: 'no rights'});
        }
        next();
      });
    },
    function(next){

      var q = {};
      q.where = { _id: params.comment._id, deleted: false};
      q.update = {
        deleted: true,
        deleted_date: new Date()
      };
      q.select = '_id';

      commentService.update(q, function(err, comment){
        if (err) { return next({error: err}); }
        if(comment === null){ return next({error: "no comment to remove"}); }
        next();
      });
    },
    function(next){

      var q = {};
      q.args = { scenario: params.scenario._id, deleted: false };
      q.populated_fields = [];
      q.populated_fields.push({
        field: 'author',
        populate: 'first_name last_name last_modified image_thumb'
      });

      commentService.find(q, function(err, comments){
        if (err) { return next({error: err}); }
        next(null, comments);
      });
    },
    function(comments, next){

      var q = {};
      q.where = { _id: params.scenario._id };
      q.update = { comments_count: comments.length};

      scenarioService.update(q, function(err){
        if (err) { return next({error: err}); }
        next(null, { comments: comments });
      });
    }
  ], function (err, result) {
    if(err){ res.json(err); }
    res.json(result);
  });

});

router.post('/comments/', function(req, res, next) {

  var q = {};
  q.args = { scenario: req.body.scenario_id, deleted: false };
  q.populated_fields = [];
  q.populated_fields.push({
    field: 'author',
    populate: 'first_name last_name last_modified image_thumb'
  });

  commentService.find(q, function(err, comments) {
    if (err) { return res.json({error: err}); }
    return res.json({ comments: comments });
  });
});

module.exports = router;
