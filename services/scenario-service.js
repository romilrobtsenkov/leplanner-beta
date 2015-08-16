var config = require('../config/config');
var Scenario = require('../models/scenario').Scenario;
var Comment = require('../models/comment').Comment;
var Favorite = require('../models/favorite').Favorite;
var Follower = require('../models/follower').Follower;

exports.getSortOrder = function(query, next){

  // default sort
  var sort = { created: -1 };

  if(typeof query != 'undefined' && typeof query.order != 'undefined'){
    switch (query.order) {
      case 'latest':
        sort = { created: -1 };
        break;
      case 'popular':
        sort = { view_count: -1 };
        break;
      case 'favorited':
        sort = { favorites_count: -1 };
        break;
      case 'commented':
        sort = { comments_count: -1 };
        break;
      default:
        sort = { created: -1 };
    }
  }

  next(null, sort);

};

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
  if(q.limit){ query.limit(q.limit); }
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

exports.saveNew = function(new_scenario, next) {
  var newScenario = new Scenario(new_scenario);
  newScenario.save(function(err, scenario) {
    if (err) { return next(err); }
    next(null, scenario);
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
