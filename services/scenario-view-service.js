var ScenarioView = require('../models/scenario-view').ScenarioView;

exports.aggregate = function(q, next){
  var query = ScenarioView.aggregate(q.args);
  query.exec(function(err, scenario_views) {
    if (err) return next(err);
    next(null, scenario_views);
  });
};
