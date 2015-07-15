var config = require('../config/config');


exports.getScenarios = function(query, next) {

  scenarios = [{id: 1},{id: 2}];
  /*var query = Scenario.find();
  if (req.query.subject) {
    query.where({ subject: req.query.subject, deleted: false });
  } else if(req.query.name){  //IF SCENARIO NAME IS SEND ON HOME PAGE TO THE SEARCH BOX
    var escapeRegExp = function escapeRegExp(str){
      return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"); // replaces special chars
    };
    var regex = new RegExp('(?=.*'+ escapeRegExp(req.query.name).split(' ').join(')(?=.*') + ')', 'i'); //  sets req.query.name so that we can search similar names

    query.where({ name: regex, deleted: false}); //  find all where name is similar to regex and deleted is false
  }else {
    query.where({ deleted: false });  //  if you are not searching anything it will show all results or only 12 if too many
  }
  query.exec(function(err, scenarios) { //  executes the query(show all on the page or show what was searched)
    if (err) return next(err);
    res.send(scenarios);
  });*/
  next(null, scenarios);
};
