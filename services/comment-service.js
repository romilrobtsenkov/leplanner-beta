var Comment = require('../models/comment').Comment;

exports.find = function(q, next){
  var query = Comment.find();
  query.where(q.args);
  if(q.select){ query.select(q.select); }
  if(q.populated_fields){
    for(var i = 0; i< q.populated_fields.length; i++){
      query.populate(q.populated_fields[i].field, q.populated_fields[i].populate);
    }
  }
  if(q.sort){ query.select(q.sort); }
  query.exec(function(err, array) {
    next(err, array);
  });
};

exports.findOne = function(q, next){
  var query = Comment.findOne();
  query.where(q.args);
  if(q.select){ query.select(q.select); }
  query.exec(function(err, comment) {
    next(err, comment);
  });
};

exports.update = function(q, next){
  var conditions = q.where;
  var update = q.update;
  var options = {new: true};
  if(q.select){ options.select = q.select; }
  var query = Comment.findOneAndUpdate(conditions, update, options);
  query.exec(function(err, comment) {
    next(err, comment);
  });
};

exports.saveNew = function(comment, next) {
  var newComment = new Comment(comment);
  newComment.save(function(err) {
    if (err) { return next(err); }
    next(null);
  });
};

exports.count = function(q, next){
  Comment.count(q.args, function (err, count) {
    next(err, count);
  });
};
