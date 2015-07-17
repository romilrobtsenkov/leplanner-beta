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
    console.log('here');
    filter_args.push({subject: { $in : q.subjects }});
  }
  if(typeof q.method !== 'undefined' && q.method.length > 0){
    filter_args.push({method: q.method[0]});
    }
  if(typeof q.stage !== 'undefined' && q.stage.length > 0){
    filter_args.push({stage: q.stage[0]});
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

exports.getSingleScenario = function(req, next){
  console.log('find'+req.id);
  var query = Scenario.findOne();
  query.where({_id: req.id});
  query.populate('author', 'first_name last_name created');
  //query.limit(1);
  query.exec(function(err, scenario) {
    //console.log(err);
    if (err) return next(err);

    return next(null, scenario);
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
