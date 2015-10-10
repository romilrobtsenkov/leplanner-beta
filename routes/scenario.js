var express = require('express');
var request = require('request');
var fs = require('fs');
var config = require('../config/config');
var router = express.Router();
var restrict = require('../auth/restrict');
var scenarioService = require('../services/scenario-service');
var commentService = require('../services/comment-service');
var notificationService = require('../services/notification-service');
var validateService = require('../services/validate-service');
var favoriteService = require('../services/favorite-service');
var followerService = require('../services/follower-service');
var materialService = require('../services/activity-material-service');
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

router.post('/create/', restrict, function(req, res, next) {

    var params = req.body;

    async.waterfall([
      function(next){

        validateService.validate([{fn:'createScenario', data:params}], function(err){
          if (err) { return next({error: err}); }
          next();
        });

      },
      function(next){

        var new_scenario = params.scenario;
        new_scenario.author = params.user._id;
        new_scenario.draft = true;
        new_scenario.last_modified = new Date();

        scenarioService.saveNew(new_scenario, function(err, scenario){
          if (err) { return next({error: err}); }
          next(null, {scenario: { _id: scenario._id } } );
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

router.post('/delete-comment/', restrict, function(req, res, next) {

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
          return next({error: {id: 3, message: 'no rights'}});
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

router.post('/delete-material/', restrict, function(req, res, next) {

  var params = req.body;

  async.waterfall([
    function(next){
      //check author
      var q = {};
      q.args = { _id: params.scenario._id, author: req.user._id };
      q.select = "_id";

      scenarioService.findOne(q, function(err, latest_scenario){
        if (err) { return next({error: err}); }
        if(latest_scenario === null){
          console.log('no rights');
          // passport req user different from scenario author
          return next({error: {id: 3, message: 'no rights'}});
        }
        next(null);
      });
    },
    function(next){
      // check if there is such material
      if(typeof params.material._id == 'undefined'){ return next({error: {id: 0, message: 'no material id provided'}}); }

      var q = {};
      q.args = { _id: params.material._id, deleted: false };
      q.select = '_id';

      materialService.findOne(q , function(err, material){
        if (err) { return next({error: err}); }
        if(material === null){ return next({error: {id: 1, message: 'no material exist' }});}
        next(null, material);
      });

    },
    function(material, next){
      var q = {};
      q.where = { _id: material._id };
      q.update = {
        deleted: true,
        deleted_date: new Date()
      };
      q.select = '_id';

      materialService.update(q, function(err, material){
        if (err) { return next({error: err}); }
        console.log('material '+material._id+' deleted');
        next(null, { material: { _id: material._id} } );
      });

    }
  ], function (err, result) {
    if(err){ res.json(err); }
    res.json(result);
  });

});

router.post('/delete-scenario/', restrict, function(req, res, next) {

  var params = req.body;

  async.waterfall([
    function(next){

      //check if user has rights to delete the comment
      var q = {};
      q.args = { _id: params.scenario._id, author: req.user._id };

      scenarioService.findOne(q, function(err, scenario){
        if (err) { return next({error: err}); }
        if(scenario === null){
          // passport req user different from scenario author
          return next({error: {id: 3, message: 'no rights'}});
        }
        next();
      });
    },
    function(next){

      var q = {};
      q.where = { _id: params.scenario._id, deleted: false};
      q.update = {
        deleted: true
      };
      q.select = '_id';

      scenarioService.update(q, function(err, scenario){
        if (err) { return next({error: err}); }
        if(scenario === null){ return next({error: "no scenario to remove"}); }
        next(null, {success: 'success'});
      });
    }
  ], function (err, result) {
    if(err){ res.json(err); }
    res.json(result);
  });

});

router.post('/get-edit-data-single-scenario/', restrict, function(req, res, next) {

  var params = req.body;

  async.waterfall([
    function(next){
      var q = {};
      q.args = { _id: params.scenario._id, author: req.user._id };

      scenarioService.findOne(q, function(err, user){
        if (err) { return next({error: err}); }
        if(user === null){
          console.log('no rights');
          // passport req user different from scenario author
          return next({error: {id: 3, message: 'no rights'}});
        }
        next();
      });
    },
    function(next){
      var q = {};
      q.args = { _id: params.scenario._id };
      q.populated_fields = [];
      q.populated_fields.push({
        field: 'subject',
        populate: '_id name'
      });

      scenarioService.findOne(q, function(err, scenario){
        if (err) { return next({error: err}); }
        if(scenario === null){ return next({error: {id: 0, message: 'no scenario found' }}); }
        next(null, scenario);
      });
    },
    function(scenario, next){
      //get activity materials
      var q = {};
      q.args = { scenario: params.scenario._id, deleted: false };
      materialService.find(q, function(err, materials){
        if (err) { return next({error: err}); }
        next(null, {scenario: scenario, materials: materials});
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
      q.populated_fields.push({
        field: 'subject',
        populate: 'name'
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

    var params = req.body;

    async.waterfall([
      function(next){
        //check author
        var q = {};
        q.args = { _id: params.scenario_data._id, author: req.user._id };

        scenarioService.findOne(q, function(err, latest_scenario){
          if (err) { return next({error: err}); }
          if(latest_scenario === null){
            console.log('no rights');
            // passport req user different from scenario author
            return next({error: {id: 3, message: 'no rights'}});
          }
          next(null, latest_scenario);
        });
      },
      function(latest_scenario, next){

        var new_scenario = params.scenario_data;
        new_scenario.last_modified = new Date();

        //disallow in any way to change author
        new_scenario.author = req.user._id;

        // fix only positive numbers in grade, duration
        if(new_scenario.grade !== null){
          new_scenario.grade = Math.abs(new_scenario.grade);
        }
        if(new_scenario.duration !== null){
          new_scenario.duration = Math.abs(new_scenario.duration);
        }

        // reset to calculate again
        new_scenario.activities_duration = 0;

        for(var i = 0; i < new_scenario.activities.length; i++){
          if(typeof new_scenario.activities[i].duration == 'undefined'){
            // fix if user left it empty
            new_scenario.activities[i].duration = 0;
          }
          new_scenario.activities[i].duration = Math.abs(new_scenario.activities[i].duration);
          new_scenario.activities_duration += new_scenario.activities[i].duration;
        }

        //console.log(new_scenario);

        if(typeof new_scenario._id == 'undefined'){ return next ({error: {id: 0, message: "No scenario id" }}); }

        //update existing
        var q = {};
        q.where = { _id: new_scenario._id };
        q.update = new_scenario;
        q.update.last_modified = new Date();
        scenarioService.update(q, function(err, scenario){
          if (err) { return next({error: err}); }
          console.log(req.user.first_name+' updated scenario: '+scenario._id);
          next(null, {scenario: { _id: scenario._id } } );
        });

      }
    ], function (err, result) {
      if(err){ res.json(err); }
      res.json(result);
    });

});

router.post('/save-material/', restrict, function(req, res, next) {

    var params = req.body;

    async.waterfall([
      function(next){
        validateService.validate([{fn:'activityMaterialData', data:params}], function(err){
          if (err) { return next({error: err}); }
          next();
        });
      },
      function(next){
        //check author
        var q = {};
        q.args = { _id: params.scenario._id, author: req.user._id };
        q.select = "_id";

        scenarioService.findOne(q, function(err, latest_scenario){
          if (err) { return next({error: err}); }
          if(latest_scenario === null){
            console.log('no rights');
            // passport req user different from scenario author
            return next({error: {id: 3, message: 'no rights'}});
          }
          next(null);
        });
      },
      function(next){
        // check if that spot is empty for new Material

        // if updating skip this step
        if(typeof params.material._id != 'undefined'){ return next(); }

        var q = {};
        q.args = { scenario: params.scenario._id, activity_id: params.material.activity_id, position: params.material.position, deleted: false };
        q.select = '_id';

        materialService.findOne(q , function(err, material){
          if (err) { return next({error: err}); }
          if(material){ return next({error: {id: 20, message: 'material exists' }});}
          next(null);
        });

      },
      function(next){

        if(typeof params.material.conveyor_url == 'undefined'){ return next(); }
        if(params.material.conveyor_url === '' || typeof params.material.conveyor_url == 'undefined' || params.material.conveyor_url === null){ return next(); }

        var new_fav_url = config.fav_icons_path+'icon_'+params.material.conveyor_url+'.png';
        var new_fav_url_escaped = config.fav_icons_path+'icon_'+escapeRegExp(params.material.conveyor_url)+'.png';

        //console.log(new_fav_url);

        function escapeRegExp(str) {
          return str.replace(/[.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");
        }


        fs.exists(new_fav_url_escaped, function(exists) {
          if (exists) {
            //console.log('exists');
            fs.unlink(new_fav_url_escaped, function (err) {
              if (err) return next(err);
              //console.log('deleted previous');
              loadBase64Image(params.material.conveyor_url, function (image, prefix) {
                fs.writeFile(new_fav_url_escaped, image, 'base64', function(err){
                  if (err) { return next({error: err}); }
                    //console.log('Favicon saved.');
                    next();
                });
              });
            });
          }else{
            loadBase64Image(params.material.conveyor_url, function (image, prefix) {
              fs.writeFile(new_fav_url_escaped, image, 'base64', function(err){
                if (err) { return next({error: err}); }
                  //console.log('Favicon saved.');
                  next();
              });
            });
          }

        });

        var loadBase64Image = function (url, callback) {

          // Make request to our image url
          request({url: 'http://www.google.com/s2/favicons?domain='+url, encoding: 'base64'}, function (err, res, body) {
              if (!err && res.statusCode == 200) {
                  // So as encoding set to null then request body became Buffer object
                  var base64prefix = 'data:' + res.headers['content-type'] + ';base64,', image = body;
                  if (typeof callback == 'function') {
                      callback(image, base64prefix);
                  }
              } else {
                console.log(url);
                  throw new Error('Can not download image');
              }
          });
        };

      },
      function(next){

        if(typeof params.material._id != 'undefined'){
            // update
            //console.log('update '+params.material._id);
            var q = {};
            q.where = { _id: params.material._id };
            q.update = params.material;
            if(typeof q.update.conveyor_name == 'undefined'){
              q.update.conveyor_name = null;
            }
            if(typeof q.update.conveyor_url == 'undefined'){
              q.update.conveyor_url = null;
            }
            if(typeof q.update.display_id == 'undefined'){
              q.update.display_id = null;
            }
            if(typeof q.update.material_url == 'undefined'){
              q.update.material_url = null;
            }
            q.update.last_modified = new Date();
            //console.log(q.update);

            materialService.update(q, function(err, material){
              if (err) { return next({error: err}); }
              next(null, { material: material } );
            });
        }else{
          // save new
          var new_material = params.material;
          new_material.scenario = params.scenario._id;
          new_material.last_modified = new Date();

          materialService.saveNew(new_material, function(err, material){
            if (err) { return next({error: err}); }
            next(null, { material: material } );
          });
        }

      },
      function(result, next){
        //update last modified Date
        var q = {};
        q.where = { _id: params.scenario._id };
        q.update = {
          last_modified: new Date()
        };
        scenarioService.update(q, function(err, scenario){
          if (err) { return next({error: err}); }
          console.log(req.user.first_name+' updated scenario: '+scenario._id);
          next(null, result );
        });
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
              q.populated_fields.push({
                field: 'subject',
                populate: 'name'
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
          q.populated_fields.push({
            field: 'subject',
            populate: 'name'
          });
          q.sort = sort;

          scenarioService.find(q, function(err, scenarios) {
            if (err) { return next({error: err}); }
            next(null, {scenarios: scenarios});
          });

          break;

        case 'published':

          q = {};
          q.args = { author: query.user._id, draft: false, deleted: false};
          q.populated_fields = [];
          q.populated_fields.push({
            field: 'author',
            populate: 'first_name last_name created'
          });
          q.populated_fields.push({
            field: 'subject',
            populate: 'name'
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
                q.populated_fields.push({
                  field: 'subject',
                  populate: 'name'
                });
                q.sort = sort;

                scenarioService.find(q, function(err, scenarios) {
                  if (err) { return next({error: err}); }
                  next(null, {scenarios: scenarios});
                });

              }else{
                return next(null, {scenarios: []});
              }
            }
          ], function (err, result) {
            if(err){ next(err); }
            next(null, result);
          });

          break;

        default:
          return next(null, {scenarios: []});
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

      //console.log(q.args);

      q.populated_fields = [];
      q.populated_fields.push({
        field: 'author',
        populate: 'first_name last_name created'
      });
      q.populated_fields.push({
        field: 'subject',
        populate: 'name'
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
    },
    function(response, next){
      //get materials
      var q = {};
      q.args = { scenario: params.scenario._id, deleted: false };
      materialService.find(q, function(err, materials){
        if (err) { return next({error: err}); }
        response.materials = materials;
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
