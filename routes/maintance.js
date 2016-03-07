var express = require('express');
var router = express.Router();
var mongoService = require('../services/mongo-service');
var restrict = require('../auth/restrict');
var Scenario = require('../models/scenario').Scenario;
var Material = require('../models/activity-material').Material;

var async = require('async');

router.get('/update-scenario-subjects/', restrict,  function(req, res, next) {

  /*async.waterfall([
    function(next){
        var q = {};
        //q.args = {deleted: false}; update all!
        q.args = {}
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
            q.update = { subjects: [scenarios[i].subject]};

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

router.get('/update-displays/', restrict,  function(req, res, next) {
/*console.log('updating');
  async.waterfall([
    function(next){
        var q = {};
        q.args = {};
        mongoService.find(q, Material, function(err, materials){
          if (err) { return next({error: err}); }
          if(materials){

              console.log(materials.length);
              //console.log(scenarios[0]._id);
              //console.log(scenarios[0].subjects.length);

              var array = [];

              for(var i = 0; i < materials.length; i++){
                  if(materials[i].display_id !== null && typeof materials[i].display_id !== 'undefined'){

                      //if already has not
                     if(materials[i].displays.length === 0){
                         // 0 > 2
                         // 1 > 4
                         // 2 > 3
                         // 3 > NO TRANSFER
                         var new_id = null;
                         if(materials[i].display_id === 0){
                             new_id = 2;
                         }else if(materials[i].display_id === 1){
                             new_id = 4;
                         }else if(materials[i].display_id === 2){
                             new_id = 3;
                         }

                         var displays = [];
                         if(new_id !== null){
                             displays = [new_id];
                         }

                         array.push({_id: materials[i]._id, displays: displays});
                     }
                  }
              }

              console.log(array);

              next(null, array);
          }
        });
        console.log('updating');


    },
    function(materials, next){

        for(var i = 0; i < materials.length; i++){

            var q = {};
            q.where = {"_id": materials[i]._id};
            q.update = { displays: materials[i].displays};

            mongoService.update(q, Material, function(err, m){
              if (err) { return next({error: err}); }
              console.log('updated '+ m._id + ' ' + m.displays.length);
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

router.get('/update-conveyors/', restrict,  function(req, res, next) {
  /*console.log('updating');
  async.waterfall([
    function(next){
        var q = {};
        q.args = {};
        mongoService.find(q, Material, function(err, materials){
          if (err) { return next({error: err}); }
          if(materials){

              console.log(materials.length);
              //console.log(scenarios[0]._id);
              //console.log(scenarios[0].subjects.length);

              var array = [];

              for(var i = 0; i < materials.length; i++){
                  if(materials[i].conveyor_name !== null && typeof materials[i].conveyor_name !== 'undefined'){

                      //if already has not
                     if(materials[i].conveyors.length === 0){

                        var new_conveyor = {
                            name: materials[i].conveyor_name
                        };


                         if(materials[i].conveyor_url){
                             new_conveyor.url = materials[i].conveyor_url;
                         }

                         var conveyors = [];
                         conveyors.push(new_conveyor);
                         console.log(new_conveyor);

                         array.push({_id: materials[i]._id, conveyors: conveyors});
                     }
                  }
              }

              //console.log(array);

              next(null, array);
          }
        });
        console.log('updating');


    },
    function(materials, next){

        for(var i = 0; i < materials.length; i++){

            var q = {};
            q.where = {"_id": materials[i]._id};
            q.update = { conveyors: materials[i].conveyors};

            mongoService.update(q, Material, function(err, m){
              if (err) { return next({error: err}); }
              console.log('updated '+ m._id + ' ' + m.conveyors.length);
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
