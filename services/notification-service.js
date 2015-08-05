var Notification = require('../models/notification').Notification;

exports.find = function(q, next){
  var query = Notification.find();
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

exports.saveNew = function(notification, next) {
  var newNotification = new Notification(notification);
  newNotification.save(function(err) {
    if (err) { return next(err); }
    next(null);
  });
};

exports.updateMultiple = function(q, next){
  var conditions = q.where;
  var update = q.update;
  var options = { multi: true };
  var query = Notification.update(conditions, update, options);
  query.exec(function(err, success) {
    next(err, success);
  });
};
