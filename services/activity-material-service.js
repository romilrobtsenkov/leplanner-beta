var Material = require('../models/activity-material').Material;

exports.find = function(q, next){
  var query = Material.find();
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
  var query = Material.findOne();
  query.where(q.args);
  if(q.select){ query.select(q.select); }
  query.exec(function(err, follower) {
    next(err, follower);
  });
};

exports.saveNew = function(material, next) {
  var newMaterial = new Material(material);
  newMaterial.save(function(err, saved_material) {
    next(err, saved_material);
  });
};

exports.update = function(q, next){
  var conditions = q.where;
  var update = q.update;
  var options = {new: true};
  if(q.select){ options.select = q.select; }
  var query = Material.findOneAndUpdate(conditions, update, options);
  if(q.populated_fields){
    for(var i = 0; i< q.populated_fields.length; i++){
      query.populate(q.populated_fields[i].field, q.populated_fields[i].populate);
    }
  }
  query.exec(function(err, material) {
    next(err, material);
  });
};
