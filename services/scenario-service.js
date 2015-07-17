var config = require('../config/config');
var Scenario = require('../models/scenario').Scenario;


exports.getScenarios = function(q, next) {

  var query = Scenario.find();

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

  args.deleted = false;
  //args.draft = false;
  query.where(args);
  query.sort(sort_args);
  query.limit(4);

  query.exec(function(err, scenarios) {
    if (err) return next(err);
    return next(null, scenarios);
  });

};

exports.searchScenarios = function(q, next) {

  //console.log(q);

  var query = Scenario.find();
  args = {};
  sort_args = {};
  filter_args = [];

  sort_args.created = -1;
  filter_args.push({deleted: false});
  //args.draft = false;

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
      if(typeof params.user_id !== 'undefined'){
        // check if favorite
        if(scenario.favorites.indexOf(params.user_id) !== -1){
          response.is_favorite = true;
        }
      }

      response.scenario = scenario;
      return next(null, response);
    });

  });

};

exports.addRemoveFavorite = function(params, next){

  var query = Scenario.findOne();
  query.where({_id: params.scenario_id});

  query.exec(function(err, scenario) {
    //console.log(err);
    if (err) return next(err);

    if(typeof params.remove === 'undefined'){

      // ADD
      if(scenario.favorites.indexOf(params.user_id) !== -1){
        return next(null, {success: 'add'});
      }else{

        // add to favorite array
        scenario.favorites.push(params.user_id);

        scenario.save(function(err, scenario){
          if (err) return next(err);

          return next(null, {success: 'add'});
        });
      }
    }else{

      // REMOVE
      if(scenario.favorites.indexOf(params.user_id) === -1){
        return next(null, {success: 'remove'});
      }else{

        // remove from favorite array
        var index = scenario.favorites.indexOf(params.user_id);
        scenario.favorites.splice(index, 1);

        scenario.save(function(err, scenario){
          if (err) return next(err);
          return next(null, {success: 'remove'});
        });
      }

    }

  });
};

exports.saveScenario = function(scenario, next) {
  console.log(scenario);
  if(!scenario.name){ return next({id: 0, message: 'Please enter scenario title'}); }
  // TODO full validation

  var new_scenario = new Scenario(scenario);

    new_scenario.save(function(err, scenario){
      if(err){ return next(err); }

      return next(null, 'Saved successfully, id:'+ scenario._id);
    });

};
