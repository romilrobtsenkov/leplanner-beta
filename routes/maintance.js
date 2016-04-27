var express = require('express');
var router = express.Router();
var mongoService = require('../services/mongo-service');
var restrict = require('../auth/restrict');
var Scenario = require('../models/scenario').Scenario;
var Material = require('../models/activity-material').Material;

var async = require('async');

router.get('/update-tags/', restrict,  function(req, res, next) {
    /*
    var creativeClassroomTagsCandidates = ['56efc40c4fbc0e6a49cea3f9', '5697aa9ea19db84e04a0f948', '56effb374fbc0e6a49cea44a', '56f007224fbc0e6a49cea4df', '56efa82f4fbc0e6a49cea38e', '56efb7ce4fbc0e6a49cea3b6', '56e7eb9defd1c7885be56a52', '56ef14b04fbc0e6a49cea371', '56e6d965b6d86c5a04446f69', '55dc50679a0d005e59de1f8a', '56e46feeb6d86c5a04446e95', '56e4321cb6d86c5a04446e44', '56220a36d5e6ba8e61df6744', '56e46e9db6d86c5a04446e94', '55dc4e179a0d005e59de1f6e', '55e1e1e756b62c1b4e88a19b', '56effc044fbc0e6a49cea44f', '570251ca4fbc0e6a49cea6f3', '57015abd4fbc0e6a49cea652', '56f000cb4fbc0e6a49cea48a', '5697b68aa19db84e04a0f9b9', '563f4c8206fb5c7961d8f71d', '570186d74fbc0e6a49cea673', '5697ac21a19db84e04a0f956', '569777ada19db84e04a0f929', '56407c9c06fb5c7961d8f734', '55dc4f169a0d005e59de1f7c', '5696b7a0a19db84e04a0f8fc', '5697ab73a19db84e04a0f94f', '5696c6eca19db84e04a0f90f', '56e55a06b6d86c5a04446eee', '55dc4f9e9a0d005e59de1f87', '56ea66c6efd1c7885be56aa8', '56e3ebf9b6d86c5a04446dd6', '563e5db806fb5c7961d8f6f3', '56c082d3a19db84e04a0f9c1', '564248b706fb5c7961d8f744', '55dc4e9a9a0d005e59de1f76', '56ffddaa4fbc0e6a49cea5ae', '56f3dfec4fbc0e6a49cea4ff', '56fff18d4fbc0e6a49cea5af', '57025b7c4fbc0e6a49cea701', '56efb0a74fbc0e6a49cea38f', '56e55e20b6d86c5a04446eef', '56e4830cb6d86c5a04446eb6', '5697a19da19db84e04a0f93b', '56efc9814fbc0e6a49cea405', '56efb1c04fbc0e6a49cea393', '56e874cdefd1c7885be56a67', '56e85520efd1c7885be56a60', '56e715baefd1c7885be56a4b', '5697aacda19db84e04a0f949', '56e42020b6d86c5a04446e2d', '56e413b5b6d86c5a04446e0e', '56dde43f0fd9a2313cfe34d0', '56e446aeb6d86c5a04446e77', '56e30d45569de1657849760b', '5697aa12a19db84e04a0f944', '57018d1f4fbc0e6a49cea689', '5697aa10a19db84e04a0f943', '56fa5a2c4fbc0e6a49cea52e', '56f6d8a24fbc0e6a49cea501', '5697ab14a19db84e04a0f94d', '56e5cea2b6d86c5a04446f2e', '56f0008d4fbc0e6a49cea489', '570a7bfb4fbc0e6a49cea771', '56efea8a4fbc0e6a49cea438', '56efe7204fbc0e6a49cea418', '55dc4f3b9a0d005e59de1f7e', '56eee51aefd1c7885be56adb', '56e9c474efd1c7885be56a82', '56eadfb3efd1c7885be56ac0', '56e5ae59b6d86c5a04446f18', '56e5986cb6d86c5a04446f11', '56e403ffb6d86c5a04446df2', '56e5b995b6d86c5a04446f28', '56c09c77a19db84e04a0f9cf', '56e6f53eefd1c7885be56a3e', '56fa3fce4fbc0e6a49cea527', '55dc50539a0d005e59de1f89', '56fac6bb4fbc0e6a49cea537', '5702ae0a4fbc0e6a49cea71c'];
    async.waterfall([
      function(next){
          var q = {};
          //q.args = {deleted: false}; update all!
          q.args = {
              _id: {$in : creativeClassroomTagsCandidates },
          };
          mongoService.find(q, Scenario, function(err, scenarios){
            if (err) { return next({error: err}); }
            if(scenarios){

                console.log(scenarios.length);
                //console.log(scenarios[0]._id);
                //console.log(scenarios[0].subjects.length);

                var uarray = [];

                for(var i = 0; i < scenarios.length; i++){
                    var hasTag = false;
                    for(var j = 0; j < scenarios[i].tags.length; j++){
                        if(scenarios[i].tags[j].text == 'CreativeClassroom'){
                            hasTag = true;
                        }
                    }

                    if(!hasTag){
                        if(!scenarios[i].tags){
                            scenarios[i].tags = [];
                        }
                        var newTags = scenarios[i].tags;
                        console.log(newTags);
                        newTags.push({text: "CreativeClassroom"});
                        //newTags.push({text: "CreativeClassroomEesti"});
                        console.log(newTags);
                        uarray.push({_id: scenarios[i]._id, tags: newTags});
                    }
                }

                //console.log(uarray.length);
                //return res.json({h: 'hello'});
                next(null, uarray);
            }
          });

      },
      function(scenarios, next){

         for(var i = 0; i < scenarios.length; i++){

              var q = {};
              q.where = {"_id": scenarios[i]._id};
              q.update = { tags: scenarios[i].tags};

              mongoService.update(q, Scenario, function(err, s){
                if (err) { return next({error: err}); }
                console.log('updated '+ s.tags);
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
