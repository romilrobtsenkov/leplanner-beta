var config = require('../config/config');
var Subject = require('../models/subject').Subject;

exports.getSubjects = function(next) {
    var query = Subject.find();
    query.sort({name: 1});
    query.select('name');
    query.exec(function(err, subjects) {
      return next(null,subjects);
    });

};
