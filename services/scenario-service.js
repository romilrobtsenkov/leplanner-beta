var config = require('../config/config');


exports.getScenarios = function(next) {

  scenarios = [{id: 1},{id: 2}];
  next(null, scenarios);
};

exports.getScenarioDetails = function(restId, next) {

  details = {id: 1};
  next(null, details);
};
