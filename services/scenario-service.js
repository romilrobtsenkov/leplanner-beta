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
      case 'liked':
        sort_args.likes = -1 ;
        break;
      default:
        sort_args.created = -1;
    }
  }

  args.deleted = false;

  query.where(args);

  query.sort(sort_args);

  query.limit(8);

  query.exec(function(err, scenarios) { //  executes the query(show all on the page or show what was searched)
    if (err) return next(err);
    return next(null, scenarios);
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
