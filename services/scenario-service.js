var config = require('../config/config');
var Scenario = require('../models/scenario').Scenario;
var Comment = require('../models/comment').Comment;
var Favorite = require('../models/favorite').Favorite;
var ScenarioView = require('../models/scenario-view').ScenarioView;


exports.getScenarios = function(q, next) {

  var query = Scenario.find();

  args = {};
  args.draft = false;
  args.deleted = false;


  sort_args = {};

  if(typeof q != 'undefined' && typeof q.order != 'undefined'){
    switch (q.order) {
      case 'latest':
        sort_args.created = -1;
        break;
      case 'popular':
        sort_args.view_count = -1 ;
        break;
      default:
        sort_args.created = -1;
    }
  }

  if(typeof q != 'undefined' && typeof q.limit != 'undefined'){
    query.limit(q.limit);
  }

  if(typeof q != 'undefined' && typeof q.exclude != 'undefined'){
    args._id = {'$ne': q.exclude };
  }

  if(typeof q != 'undefined' && typeof q.filter != 'undefined' && typeof q.user_id != 'undefined'){
    switch (q.filter) {
      case 'drafts':
        args.draft = true;
        args.author = q.user_id;
        break;
      case 'published':
          q.filter = 'published';
          args.author = q.user_id;
        break;
      case 'favorites':
          q.filter = 'favorites';
        break;
      case 'following':
          q.filter = 'following';
        break;
      default:
        sort_args.created = -1;
    }

    args._id = {'$ne': q.exclude };
  }

  query.where(args);
  query.populate('author', 'first_name last_name');
  query.sort(sort_args);


  query.exec(function(err, scenarios) {
    if (err) return next(err);
    return next(null, scenarios);
  });

};

exports.getDashScenarios = function(q, next) {

  var query;

  args = {};
  sort_args = {};

  if(typeof q != 'undefined' && typeof q.order != 'undefined'){
    switch (q.order) {
      case 'latest':
        sort_args.created = -1;
        break;
      case 'popular':
        sort_args.view_count = -1 ;
        break;
      default:
        sort_args.created = -1;
    }
  }

  if(typeof q != 'undefined' && typeof q.filter != 'undefined' && typeof q.user != 'undefined'){
    switch (q.filter) {
      case 'drafts':
        args.draft = true;
        args.deleted = false;
        args.author = q.user._id;

        query = Scenario.find();
        query.populate('author', 'first_name last_name');
        query.where(args);
        query.sort(sort_args);
        query.exec(function(err, scenarios) {
          if (err) return next(err);
          return next(null, {scenarios: scenarios});
        });

        break;
      case 'published':
          args.draft = false;
          args.deleted = false;
          args.author = q.user._id;
          query = Scenario.find();
          query.populate('author', 'first_name last_name');
          query.where(args);
          query.sort(sort_args);
          query.exec(function(err, scenarios) {
            if (err) return next(err);
            return next(null, {scenarios: scenarios});
          });
        break;
      case 'favorites':
          // get favorite scenarios
          args.user = q.user._id;
          query = Favorite.find();
          query.where(args);
          query.select('scenario user');
          query.sort(sort_args);
          query.exec(function(err, list) {
            if (err) return next(err);

            if(list.length > 0){
              list_of_scenario_ids = [];

              //create a list of scenario ids
              for(var i = 0; i < list.length; i++){
                list_of_scenario_ids.push(list[i].scenario);
              }

              args = {};
              args.draft = false;
              args.deleted = false;

              var filter_args = [];
              filter_args.push({_id: { $in : list_of_scenario_ids }});
              args.$and = filter_args;
              query = Scenario.find();
              query.populate('author', 'first_name last_name');
              query.where(args);
              query.sort(sort_args);
              query.exec(function(err, scenarios) {
                if (err) return next(err);
                return next(null, {scenarios: scenarios});
              });

            }else{
              return next(null, {scenarios: []});
            }

          });


        break;
      case 'following':
        return next(null, {scenarios: []});
        break;
    }
  }

};

exports.searchScenarios = function(q, next) {

  //console.log(q);

  var query = Scenario.find();
  args = {};
  sort_args = {};
  filter_args = [];

  sort_args.created = -1;
  filter_args.push({deleted: false});
  args.draft = false;

  if(typeof q.search_word !== 'undefined'){
    args.$or = [ { name: { "$regex": q.search_word, "$options": "i" } }, { description: { "$regex": q.search_word, "$options": "i" } }];
  }
  if(typeof q.subjects !== 'undefined' && q.subjects.length > 0){
    filter_args.push({subject: { $in : q.subjects }});
  }
  if(typeof q.methods !== 'undefined' && q.methods.length > 0){
    filter_args.push({method: { $in : q.methods }});
    }
  if(typeof q.stages !== 'undefined' && q.stages.length > 0){
    filter_args.push({stage: { $in : q.stages }});
  }

  if(filter_args.length > 0){
    args.$and = filter_args;
  }

  //console.log(args);
  query.where(args);
  query.sort(sort_args);
  query.populate('author', 'first_name last_name');
  query.limit(4);
  query.exec(function(err, scenarios) {
    //console.log(err);
    if (err) return next(err);
    return next(null, scenarios);
  });

};

exports.getSingleScenario = function(params, next){

  var query = Scenario.findOne();
  query.where({_id: params.scenario_id});
  query.populate('author', 'first_name last_name created');
  //query.limit(1);
  query.exec(function(err, scenario) {
    //console.log(err);
    if (err) return next(err);

    scenario.view_count = scenario.view_count+1;
    scenario.save(function(err, scenario){
      if (err) return next(err);

      var response = {};
      response.is_favorite = false;
      response.scenario = scenario;
      if(typeof params.user_id !== 'undefined'){
        var query = Favorite.findOne();
        query.where({scenario: scenario._id, user: params.user_id});
        query.exec(function(err, favorite) {
          if (err) return next(err);
            console.log(favorite);
            if(favorite !== null){
              response.is_favorite = true;
            }

            // log scenario view separetly for future notifications
            var view = {
              user: params.user_id,
              scenario: scenario._id
            };
            var new_view = new ScenarioView(view);
            new_view.save(function(err, scenario){
              if (err) return next(err);
              return next(null, response);
            });

          });
      }else{
        return next(null, response);
      }

    });

  });

};

exports.addRemoveFavorite = function(params, next){

  var query = Favorite.find();
  query.where({scenario: params.scenario_id});
  query.exec(function(err, favorites) {
    if (err) return next(err);
    var favorite = null;
    if(favorites.length !== 0){
        for(var i = 0; i < favorites.length; i++){
          if(favorites[i].user == params.user._id){
            favorite = favorites[i];
            break;
          }
        }
    }

    console.log(favorite);

    if(typeof params.remove === 'undefined'){

      // add favorite
      if(favorite === null){

        favorite = {
          scenario: params.scenario_id,
          user: params.user._id
        };

        new_favorite = new Favorite(favorite);
        new_favorite.save(function(err, favorite){
          if(err){ return next(err); }

          // update scenario favorites count
          var query = Scenario.findOne();
          query.where({_id: params.scenario_id});
          query.exec(function(err, scenario) {
            if (err) return next(err);

            scenario.favorites_count = favorites.length+1;
            scenario.save(function(err, scenario){
              if (err) return next(err);
              return next(null, {success: 'add'});
            });
          });

        });


      }else{
        //already favorite
        return next(null, {success: 'add'});
      }

    }else{

      // remove favorite
      if(favorite === null){
        // already not favorite
        return next(null, {success: 'remove'});
      }else{
        // delete that favorite
        favorite.remove(function(err, a){
          if (err) return next(err);

          // update scenario favorites count
          var query = Scenario.findOne();
          query.where({_id: params.scenario_id});
          query.exec(function(err, scenario) {
            if (err) return next(err);

            scenario.favorites_count = favorites.length-1;
            scenario.save(function(err, scenario){
              if (err) return next(err);
              return next(null, {success: 'remove'});
            });
          });


        });
      }
    }

  });

};

exports.getComments = function(params, next) {

  var query = Comment.find();
  query.where({scenario: params.scenario_id, deleted: false});
  query.populate('author', 'first_name last_name');
  query.exec(function(err, comments) {
    if (err) return next(err);
    return next(null, {comments: comments});
  });

};


exports.addComment = function(params, next) {
  console.log('scenario text '+ params.comment.text);
  console.log('user '+params.user._id);
  if(!params.comment.text){ return next({id: 0, message: 'Comment can not be empty'}); }
  if(!params.user._id){ return next({id: 1, message: 'User id missing'}); }
  if(!params.scenario._id){ return next({id: 2, message: 'Scenario id missing'}); }

  var comment = {
    text: params.comment.text,
    author: params.user._id,
    scenario: params.scenario._id,
  };

  // save comment
  var new_comment = new Comment(comment);
  new_comment.save(function(err){
    if(err){ return next(err); }

    // update comment count
    var query = Scenario.findOne();
    query.where({_id: params.scenario._id});
    query.exec(function(err, scenario) {
      if (err) return next(err);
      scenario.comments_count = scenario.comments_count+1;
      scenario.save(function(err, scenario){
        if (err) return next(err);

        // return all comments
        var query = Comment.find();
        query.where({scenario: params.scenario._id, deleted: false});
        query.populate('author', 'first_name last_name');
        query.exec(function(err, comments) {
          if (err) return next(err);
          return next(null, {comments: comments});
        });

      });
    });

  });

};

exports.saveScenario = function(scenario, next) {
  console.log(scenario);
  if(!scenario.name){ return next({id: 0, message: 'Please enter scenario title'}); }
  scenario.draft = true;
  // TODO full validation

  var new_scenario = new Scenario(scenario);

    new_scenario.save(function(err, scenario){
      if(err){ return next(err); }

      return next(null, 'Saved successfully, id:'+ scenario._id);
    });

};
