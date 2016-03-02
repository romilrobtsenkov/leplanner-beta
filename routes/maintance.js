var express = require('express');
var router = express.Router();
var mongoService = require('../services/mongo-service');
var restrict = require('../auth/restrict');
var Scenario = require('../models/scenario').Scenario;

var async = require('async');

router.get('/update-scenario-subjects/', restrict,  function(req, res, next) {

  /*async.waterfall([
    function(next){
        var q = {};
        q.args = {deleted: false};
        mongoService.find(q, Scenario, function(err, scenarios){
          if (err) { return next({error: err}); }
          if(scenarios){

              console.log(scenarios.length);
              console.log(scenarios[0]._id);
              console.log(scenarios[0].subjects.length);

              var array = [];

              for(var i = 0; i < scenarios.length; i++){
                  if(scenarios[i].subjects.length !== 0){
                      console.log(scenarios[i]);
                  }

                  if(scenarios[i].subject && scenarios[i].subjects.length === 0){
                      array.push({_id: scenarios[i]._id, subject: scenarios[i].subject});
                  }
              }

              console.log(array);

              next(null, array);
          }
        });

    },
    function(scenarios, next){

        for(var i = 0; i < scenarios.length; i++){

            var q = {};
            q.where = {"_id": scenarios[i]._id};
            q.update = { subjects: [scenarios[i].subject] , subject: undefined};

            mongoService.update(q, Scenario, function(err, s){
              if (err) { return next({error: err}); }
              console.log('updated '+ s.subjects + ' ' + s.subject);
              //next(null, success);
          });
        }


      next(null, {hello: 'success'});
    }
  ], function (err, result) {
    if(err){ res.json(err); }
    res.json(result);
});*/

});

module.exports = router;
