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

/* template
async.waterfall([], function (err, result) {
  if(err){ res.json(err); }
  res.json(result);
});
*/

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

router.post('/add-remove-favorite/',restrict, function(req, res, next) {

  var params = req.body;

  async.waterfall([
    function(next){

      validateService.validate([{fn:'addRemoveFavorite', data:params}], function(err){
        if (err) { return next({error: err}); }
        next();
      });
    },
    function(next){

      var q = {};
      q.args = { scenario: params.scenario_id, user: params.user._id, removed: null };
      q.select = '_id';

      favoriteService.findOne(q, function(err, favorite_doc){
        if (err) { return next({error: err}); }
        next(null, favorite_doc);
      });
    },
    function(favorite_doc, next){

      // add favorite
      if(typeof params.remove === 'undefined'){
        if(favorite_doc === null){
          new_favorite_doc = { scenario: params.scenario_id, user: params.user._id };

          favoriteService.saveNew(new_favorite_doc, function(err) {
            if (err) { return next({error: err}); }
            next(null, {success: 'add'});
          });
        }else{
          next(null, {success: 'add'});
        }
      }else{
        //remove favorite
        if(favorite_doc === null){
          next(null, {success: 'remove'});
        }else{
          var update = { removed : Date.now() };
          var q = {};
          q.where = {"_id": favorite_doc._id};
          q.update = update;
          q.select = "_id";

          favoriteService.update(q, function(err){
            if (err) { return next({error: err}); }
            next(null, {success: 'remove'});
          });
        }
      }

    },
    function(success, next){

      var q = {};
      q.args = {scenario: params.scenario_id, removed: null};

      favoriteService.count(q, function(err, favorites_count){
        if (err) { return next({error: err}); }
        var count = {favorites_count: favorites_count};
        next(null, success, count);
      });
    },
    function(success, count, next){

      var q = {};
      q.where = {"_id": params.scenario_id};
      q.update = { favorites_count: count.favorites_count };

      scenarioService.update(q, function(err){
        if (err) { return next({error: err}); }
        next(null, success);
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

router.post('/list/', function(req, res, next) {

  var query = req.body;

  async.waterfall([
    function(next){

      scenarioService.getSortOrder(query, function(err, sort){
        if (err) { return next({error: err}); }
        next(null, sort);
      });
    },
    function(sort, next){

      var q = {};
      q.args = { author: query.user._id, draft: false, deleted: false};
      q.populated_fields = [];
      q.populated_fields.push({
        field: 'author',
        populate: 'first_name last_name created'
      });
      q.sort = sort;

      scenarioService.find(q, function(err, scenarios) {
        if (err) { return next({error: err}); }
        next(null, {scenarios: scenarios});
      });
    }
  ], function (err, result) {
    if(err){ res.json(err); }
    res.json(result);
  });

});

router.post('/save/', restrict, function(req, res, next) {

    var query = req.body;

    async.waterfall([
      function(next){

        var new_scenario = query.scenario_data;

        // validation !!!!
        // - scenario
        // - outcomes
        // - activities

        new_scenario.draft = true;
        new_scenario.last_modified = new Date();

        //console.log(new_scenario);

        if(typeof new_scenario._id == 'undefined'){

          // save new
          scenarioService.saveNew(new_scenario, function(err, scenario){
            if (err) { return next({error: err}); }
            console.log('new save');
            next(null, {scenario: { _id: scenario._id } } );
          });
        }else{

          //update existing
          var q = {};
          q.where = { _id: new_scenario._id };
          q.update = new_scenario;
          scenarioService.update(q, function(err, scenario){
            if (err) { return next({error: err}); }
            console.log('updated _id: '+scenario._id);
            next(null, {scenario: { _id: scenario._id } } );
          });
        }
      }
    ], function (err, result) {
      if(err){ res.json(err); }
      res.json(result);
    });

});

router.post('/scenarios-dash-list/', restrict, function(req, res, next) {

  var query = req.body;

  async.waterfall([
    function(next){

      scenarioService.getSortOrder(query, function(err, sort){
        if (err) { return next({error: err}); }
        next(null, sort);
      });
    },
    function(sort, next){

      // default page to feed
      if(typeof query.page == 'undefined'){ query.page = 'feed'; }

      switch (query.page) {
        case 'feed':

          async.waterfall([
            function(next){

              var q = {};
              q.args = {follower: query.user._id, removed: null};
              q.select = 'following';

              followerService.find(q, function(err, following){
                if (err) { return next({error: err}); }
                next(null, following);
              });
            },
            function(following, next){

              var list_of_following_ids = [];
              for(var i = 0; i< following.length; i++){
                list_of_following_ids[i] = following[i].following;
              }

              var q = {};
              q.args = { author: { $in : list_of_following_ids }, draft: false, deleted: false};
              q.populated_fields = [];
              q.populated_fields.push({
                field: 'author',
                populate: 'first_name last_name created'
              });
              q.sort = sort;

              scenarioService.find(q, function(err, scenarios) {
                if (err) { return next({error: err}); }
                next(null, {scenarios: scenarios});
              });

            }
          ], function (err, result) {
            if(err){ next(err); }
            next(null, result);
          });

          break;

        case 'drafts':

          var q = {};
          q.args = { author: query.user._id, draft: true, deleted: false};
          q.populated_fields = [];
          q.populated_fields.push({
            field: 'author',
            populate: 'first_name last_name created'
          });
          q.sort = sort;

          scenarioService.find(q, function(err, scenarios) {
            if (err) { return next({error: err}); }
            next(null, {scenarios: scenarios});
          });

          break;

        case 'published':

          var q = {};
          q.args = { author: query.user._id, draft: false, deleted: false};
          q.populated_fields = [];
          q.populated_fields.push({
            field: 'author',
            populate: 'first_name last_name created'
          });
          q.sort = sort;

          scenarioService.find(q, function(err, scenarios) {
            if (err) { return next({error: err}); }
            next(null, {scenarios: scenarios});
          });

          break;
        case 'favorites':

          async.waterfall([
            function(next){

              var q = {};
              q.args = {user: query.user._id, removed: null};
              q.select = 'scenario';

              favoriteService.find(q, function(err, favorites){
                if (err) { return next({error: err}); }
                next(null, favorites);
              });
            },
            function(favorites, next){

              if(favorites.length > 0){
                list_of_scenario_ids = [];

                //create a list of scenario ids
                for(var i = 0; i < favorites.length; i++){
                  list_of_scenario_ids.push(favorites[i].scenario);
                }

                var q = {};
                q.args = { _id: { $in : list_of_scenario_ids }, draft: false, deleted: false};
                q.populated_fields = [];
                q.populated_fields.push({
                  field: 'author',
                  populate: 'first_name last_name created'
                });
                q.sort = sort;

                scenarioService.find(q, function(err, scenarios) {
                  if (err) { return next({error: err}); }
                  next(null, {scenarios: scenarios});
                });

              }else{
                return next(null, []);
              }
            }
          ], function (err, result) {
            if(err){ next(err); }
            next(null, result);
          });

          break;

        default:
          return next(null, []);
      }

    }
  ], function (err, result) {
    if(err){ res.json(err); }
    res.json(result);
  });

});

router.post('/search/', function(req, res, next) {

  var query = req.body;

  async.waterfall([
    function(next){

      scenarioService.getSortOrder(query, function(err, sort){
        if (err) { return next({error: err}); }
        next(null, sort);
      });
    },
    function(sort, next){

      var q = {};
      q.args = { draft: false, deleted: false };

      // search word
      if(typeof query.search_word !== 'undefined'){
        q.args.$or = [ { name: { "$regex": query.search_word, "$options": "i" } }, { description: { "$regex": query.search_word, "$options": "i" } }];
      }

      // meta fields
      if(typeof query.subjects !== 'undefined' && query.subjects.length > 0){
        q.args.subject = { $in : query.subjects };
      }

      q.populated_fields = [];
      q.populated_fields.push({
        field: 'author',
        populate: 'first_name last_name created'
      });
      q.sort = sort;

      scenarioService.find(q, function(err, scenarios) {
        if (err) { return next({error: err}); }
        next(null, {scenarios: scenarios});
      });
    }
  ], function (err, result) {
    if(err){ res.json(err); }
    res.json(result);
  });

});

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

      // if author viewing if there are notifications - mark them as seen, else skip!
      if(typeof params.user == 'undefined'){ return next(null, response); }
      if(typeof params.user != 'undefined' && params.user._id !== response.scenario.author._id.toString()){ return next(null, response); }

      var q = {};
      q.where = { user: params.user._id, type: 'comment', 'data.scenario': response.scenario._id, seen: null };
      q.update = { seen: new Date() };

      notificationService.updateMultiple(q, function(err, notifications){
        if (err) { return next({error: err}); }
        //console.log('modified notifications :'+notifications.nModified);
        next(null, response);
      });
    }
  ], function (err, result) {
    if(err){ res.json(err); }
    res.json(result);
  });
});

router.post('/widget-list/', function(req, res, next) {

  var query = req.body;

  async.waterfall([
    function(next){

      scenarioService.getSortOrder(query, function(err, sort){
        if (err) { return next({error: err}); }
        next(null, sort);
      });
    },
    function(sort, next){

      var q = {};
      q.args = { draft: false, deleted: false};

      // single scenario view widget, exclude scenario that is viewd and get same user scenarios
      if(typeof query.exclude !== 'undefined'){ q.args._id = {'$ne': query.exclude }; }
      if(typeof query.author !== 'undefined'){ q.args.author = query.author; }

      q.populated_fields = [];
      q.populated_fields.push({
        field: 'author',
        populate: 'first_name last_name created'
      });
      q.sort = sort;
      q.limit = query.limit;

      scenarioService.find(q, function(err, scenarios) {
        if (err) { return next({error: err}); }
        next(null, {scenarios: scenarios});
      });
    }
  ], function (err, result) {
    if(err){ res.json(err); }
    res.json(result);
  });

});

module.exports = router;
