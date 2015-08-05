var config = require('../config/config');
var Scenario = require('../models/scenario').Scenario;
var Comment = require('../models/comment').Comment;
var Favorite = require('../models/favorite').Favorite;
var Follower = require('../models/follower').Follower;

exports.find = function(q, next){
  var query = Scenario.find();
  query.where(q.args);
  if(q.populated_fields){
    for(var i = 0; i< q.populated_fields.length; i++){
      query.populate(q.populated_fields[i].field, q.populated_fields[i].populate);
    }
  }
  if(q.select){ query.select(q.select); }
  if(q.sort){ query.sort(q.sort); }
  query.exec(function(err, array) {
    next(err, array);
  });
};

exports.findOne = function(q, next){
  var query = Scenario.findOne();
  query.where(q.args);
  if(q.select){ query.select(q.select); }
  query.exec(function(err, scenario) {
    next(err, scenario);
  });
};

exports.update = function(q, next){
  var conditions = q.where;
  var update = q.update;
  var options = {new: true};
  if(q.select){ options.select = q.select; }
  var query = Scenario.findOneAndUpdate(conditions, update, options);
  if(q.populated_fields){
    for(var i = 0; i< q.populated_fields.length; i++){
      query.populate(q.populated_fields[i].field, q.populated_fields[i].populate);
    }
  }
  query.exec(function(err, scenario) {
    next(err, scenario);
  });
};

exports.saveNew = function(new_user, next) {
  var newUser = new User(new_user);
  newUser.save(function(err) {
    if (err) {
      if(err.errors.email.message == 'That email is already in use'){
        return next({id: 6, message: 'That email is already in use'});
      }else{
        return next(err);
      }
    }
    next(null);
  });
};


exports.getWidgetScenarios = function(q, next) {

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
      case 'favorited':
        sort_args.favorites_count = -1 ;
        break;
      case 'commented':
        sort_args.comments_count = -1 ;
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
      case 'favorited':
        sort_args.favorites_count = -1 ;
        break;
      case 'commented':
        sort_args.comments_count = -1 ;
        break;
      default:
        sort_args.created = -1;
    }
  }

  if(typeof q != 'undefined' && typeof q.filter != 'undefined' && typeof q.user != 'undefined'){
    switch (q.filter) {
      case 'feed':

        // get list of following ids
        var following_query = Follower.find();
        args = {};
        multiple_args = [];
        multiple_args.push({follower: q.user._id});
        multiple_args.push({ removed: null });
        args.$and = multiple_args;
        following_query.where(args);
        following_query.select('following');
        following_query.exec(function(err, following) {
          if (err) return next(err);

          var list_of_following_ids = [];
          for(var i = 0; i< following.length; i++){
            list_of_following_ids[i] = following[i].following;
          }

          args.draft = false;
          args.deleted = false;
          var filter_args = [];
          filter_args.push({author: { $in : list_of_following_ids }});
          args.$and = filter_args;
          query = Scenario.find();
          query.populate('author', 'first_name last_name');
          query.where(args);
          query.sort(sort_args);
          query.exec(function(err, scenarios) {
            if (err) return next(err);
            return next(null, scenarios);
          });

        });

        break;
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
          return next(null, scenarios);
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
            return next(null, scenarios);
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
                return next(null, scenarios);
              });

            }else{
              return next(null, []);
            }

          });

        break;

      default:
        return next(null, []);

    }

  }

};

exports.searchScenarios = function(q, next) {

  //console.log(q);

  var query = Scenario.find();
  args = {};
  filter_args = [];

  sort_args = {};
  if(typeof q != 'undefined' && typeof q.order != 'undefined'){
    switch (q.order) {
      case 'latest':
        sort_args.created = -1;
        break;
      case 'popular':
        sort_args.view_count = -1 ;
        break;
      case 'favorited':
        sort_args.favorites_count = -1 ;
        break;
      case 'commented':
        sort_args.comments_count = -1 ;
        break;
      default:
        sort_args.created = -1;
    }
  }

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

exports.getUserScenarios = function(q, next){

  var query = Scenario.find();

  args = {};
  args.draft = false;
  args.deleted = false;

  sort_args = {};

  if(typeof q != 'undefined' && typeof q.user != 'undefined'){
    args.author = q.user._id;
  }else{
    return next(null, []);
  }

  if(typeof q != 'undefined' && typeof q.order != 'undefined'){
    switch (q.order) {
      case 'latest':
        sort_args.created = -1;
        break;
      case 'popular':
        sort_args.view_count = -1 ;
        break;
      case 'favorited':
        sort_args.favorites_count = -1 ;
        break;
      case 'commented':
        sort_args.comments_count = -1 ;
        break;
      default:
        sort_args.created = -1;
    }
  }

  query.where(args);
  query.populate('author', 'first_name last_name created');
  query.sort(sort_args);

  query.exec(function(err, scenarios) {
    if (err) return next(err);
    return next(null, scenarios);
  });
};

exports.addRemoveFavorite = function(params, next){

  var query = Favorite.find();
  // using find insted to get latest favorites count
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

    //console.log(favorite);

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

exports.saveScenario = function(scenario, next) {
  //console.log(scenario);
  if(!scenario.name){ return next({id: 0, message: 'Please enter scenario title'}); }
  scenario.draft = true;
  // TODO full validation

  var new_scenario = new Scenario(scenario);

    new_scenario.save(function(err, scenario){
      if(err){ return next(err); }

      return next(null, 'Saved successfully, id:'+ scenario._id);
    });

};
