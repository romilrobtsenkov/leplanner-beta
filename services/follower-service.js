var Follower = require('../models/follower').Follower;

exports.count = function(q, next){
  Follower.count(q.args, function (err, count) {
    next(err, count);
  });
};

exports.find = function(q, next){
  var query = Follower.find();
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
  var query = Follower.findOne();
  query.where(q.args);
  if(q.select){ query.select(q.select); }
  query.exec(function(err, follower) {
    next(err, follower);
  });
};

exports.saveNew = function(follower, next) {
  var newFollower = new Follower(follower);
  newFollower.save(function(err) {
    if (err) { return next(err); }
    next(null);
  });
};

exports.update = function(q, next){
  var conditions = q.where;
  var update = q.update;
  var options = {new: true};
  if(q.select){ options.select = q.select; }
  var query = Follower.findOneAndUpdate(conditions, update, options);
  if(q.populated_fields){
    for(var i = 0; i< q.populated_fields.length; i++){
      query.populate(q.populated_fields[i].field, q.populated_fields[i].populate);
    }
  }
  query.exec(function(err, follower) {
    next(err, follower);
  });
};
