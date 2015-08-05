var Favorite = require('../models/favorite').Favorite;

exports.find = function(q, next){
  var query = Favorite.find();
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
  var query = Favorite.findOne();
  query.where(q.args);
  if(q.select){ query.select(q.select); }
  query.exec(function(err, favorite) {
    next(err, favorite);
  });
};

exports.update = function(q, next){
  var conditions = q.where;
  var update = q.update;
  var options = {new: true};
  if(q.select){ options.select = q.select; }
  var query = Favorite.findOneAndUpdate(conditions, update, options);
  if(q.populated_fields){
    for(var i = 0; i< q.populated_fields.length; i++){
      query.populate(q.populated_fields[i].field, q.populated_fields[i].populate);
    }
  }
  query.exec(function(err, favorite) {
    next(err, favorite);
  });
};

exports.saveNew = function(favorite, next) {
  var newFavorite = new Favorite(favorite);
  newFavorite.save(function(err) {
    if (err) { return next(err); }
    next(null);
  });
};

exports.count = function(q, next){
  Favorite.count(q.args, function (err, count) {
    next(err, count);
  });
};
