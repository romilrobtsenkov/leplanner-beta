var express = require('express');
var router = express.Router();
var mongoService = require('../services/mongo-service');
var restrict = require('../auth/restrict');
var Scenario = require('../models/scenario').Scenario;
var Material = require('../models/activity-material').Material;
var Subject = require('../models/subject').Subject;

var async = require('async');

router.get('/update-tags/', restrict,  function(req, res, next) {

    //CreativeClassroom
    //var creativeClassroomTagsCandidates = ['56efc40c4fbc0e6a49cea3f9', '5697aa9ea19db84e04a0f948', '56effb374fbc0e6a49cea44a', '56f007224fbc0e6a49cea4df', '56efa82f4fbc0e6a49cea38e', '56efb7ce4fbc0e6a49cea3b6', '56e7eb9defd1c7885be56a52', '56ef14b04fbc0e6a49cea371', '56e6d965b6d86c5a04446f69', '55dc50679a0d005e59de1f8a', '56e46feeb6d86c5a04446e95', '56e4321cb6d86c5a04446e44', '56220a36d5e6ba8e61df6744', '56e46e9db6d86c5a04446e94', '55dc4e179a0d005e59de1f6e', '55e1e1e756b62c1b4e88a19b', '56effc044fbc0e6a49cea44f', '570251ca4fbc0e6a49cea6f3', '57015abd4fbc0e6a49cea652', '56f000cb4fbc0e6a49cea48a', '5697b68aa19db84e04a0f9b9', '563f4c8206fb5c7961d8f71d', '570186d74fbc0e6a49cea673', '5697ac21a19db84e04a0f956', '569777ada19db84e04a0f929', '56407c9c06fb5c7961d8f734', '55dc4f169a0d005e59de1f7c', '5696b7a0a19db84e04a0f8fc', '5697ab73a19db84e04a0f94f', '5696c6eca19db84e04a0f90f', '56e55a06b6d86c5a04446eee', '55dc4f9e9a0d005e59de1f87', '56ea66c6efd1c7885be56aa8', '56e3ebf9b6d86c5a04446dd6', '563e5db806fb5c7961d8f6f3', '56c082d3a19db84e04a0f9c1', '564248b706fb5c7961d8f744', '55dc4e9a9a0d005e59de1f76', '56ffddaa4fbc0e6a49cea5ae', '56f3dfec4fbc0e6a49cea4ff', '56fff18d4fbc0e6a49cea5af', '57025b7c4fbc0e6a49cea701', '56efb0a74fbc0e6a49cea38f', '56e55e20b6d86c5a04446eef', '56e4830cb6d86c5a04446eb6', '5697a19da19db84e04a0f93b', '56efc9814fbc0e6a49cea405', '56efb1c04fbc0e6a49cea393', '56e874cdefd1c7885be56a67', '56e85520efd1c7885be56a60', '56e715baefd1c7885be56a4b', '5697aacda19db84e04a0f949', '56e42020b6d86c5a04446e2d', '56e413b5b6d86c5a04446e0e', '56dde43f0fd9a2313cfe34d0', '56e446aeb6d86c5a04446e77', '56e30d45569de1657849760b', '5697aa12a19db84e04a0f944', '57018d1f4fbc0e6a49cea689', '5697aa10a19db84e04a0f943', '56fa5a2c4fbc0e6a49cea52e', '56f6d8a24fbc0e6a49cea501', '5697ab14a19db84e04a0f94d', '56e5cea2b6d86c5a04446f2e', '56f0008d4fbc0e6a49cea489', '570a7bfb4fbc0e6a49cea771', '56efea8a4fbc0e6a49cea438', '56efe7204fbc0e6a49cea418', '55dc4f3b9a0d005e59de1f7e', '56eee51aefd1c7885be56adb', '56e9c474efd1c7885be56a82', '56eadfb3efd1c7885be56ac0', '56e5ae59b6d86c5a04446f18', '56e5986cb6d86c5a04446f11', '56e403ffb6d86c5a04446df2', '56e5b995b6d86c5a04446f28', '56c09c77a19db84e04a0f9cf', '56e6f53eefd1c7885be56a3e', '56fa3fce4fbc0e6a49cea527', '55dc50539a0d005e59de1f89', '56fac6bb4fbc0e6a49cea537', '5702ae0a4fbc0e6a49cea71c'];

    //CreativeClassroomKogumik
    //var creativeClassroomTagsCandidates = ['5697aa9ea19db84e04a0f948', '56f007224fbc0e6a49cea4df', '56efa82f4fbc0e6a49cea38e', '56ef14b04fbc0e6a49cea371', '56e6d965b6d86c5a04446f69', '56e46feeb6d86c5a04446e95', '56e4321cb6d86c5a04446e44', '56220a36d5e6ba8e61df6744', '55e1e1e756b62c1b4e88a19b', '56effc044fbc0e6a49cea44f', '57015abd4fbc0e6a49cea652', '5697b68aa19db84e04a0f9b9', '563f4c8206fb5c7961d8f71d', '570186d74fbc0e6a49cea673', '5697ac21a19db84e04a0f956', '56407c9c06fb5c7961d8f734', '5696b7a0a19db84e04a0f8fc', '5697ab73a19db84e04a0f94f', '56e3ebf9b6d86c5a04446dd6', '563e5db806fb5c7961d8f6f3', '56c082d3a19db84e04a0f9c1', '564248b706fb5c7961d8f744', '56f3dfec4fbc0e6a49cea4ff', '56fff18d4fbc0e6a49cea5af', '57025b7c4fbc0e6a49cea701', '56efb0a74fbc0e6a49cea38f', '56e55e20b6d86c5a04446eef', '5697a19da19db84e04a0f93b', '56efc9814fbc0e6a49cea405', '56e874cdefd1c7885be56a67', '5697aacda19db84e04a0f949', '56e42020b6d86c5a04446e2d', '56e413b5b6d86c5a04446e0e', '56dde43f0fd9a2313cfe34d0', '56e446aeb6d86c5a04446e77', '56e30d45569de1657849760b', '57018d1f4fbc0e6a49cea689', '5697aa10a19db84e04a0f943', '56fa5a2c4fbc0e6a49cea52e', '56f0008d4fbc0e6a49cea489', '56efea8a4fbc0e6a49cea438', '56eee51aefd1c7885be56adb', '56e9c474efd1c7885be56a82', '56eadfb3efd1c7885be56ac0', '56e403ffb6d86c5a04446df2', '56e5b995b6d86c5a04446f28', '56e6f53eefd1c7885be56a3e', '56fa3fce4fbc0e6a49cea527', '55dc50539a0d005e59de1f89', '5702ae0a4fbc0e6a49cea71c'];

    //CreativeClassroomCollection
    //var creativeClassroomTagsCandidates = ['574cb665f4054ed555f79b65', '574caa2cf4054ed555f79b54', '574c9f7cf4054ed555f79b4d', '574c9c32f4054ed555f79b46', '574c936ff4054ed555f79b2f', '574c8e88f4054ed555f79b20', '574c8b71f4054ed555f79b15', '574c7f0af4054ed555f79b00', '574c66e8f4054ed555f79af3', '574c5304f4054ed555f79ae3', '574c4a88f4054ed555f79ad8', '574c421af4054ed555f79acf', '574c35d4f4054ed555f79ac2', '574c23eff4054ed555f79abc', '574c1cc2f4054ed555f79aad', '574c0f52f4054ed555f79a9a', '574c0b43f4054ed555f79a8e', '574c0710f4054ed555f79a85', '574c0541f4054ed555f79a7e', '574bf1edf4054ed555f79a6f', '574bf09ef4054ed555f79a6b', '574bdd11f4054ed555f79a5a', '574bd90cf4054ed555f79a50', '574bd559f4054ed555f79a47', '574afb1af4054ed555f79a42', '574aa2b2f4054ed555f79a1a', '574a9aecf4054ed555f79a02', '5749d795f4054ed555f799f3', '574980f3f4054ed555f799e6', '57496a0af4054ed555f799a3', '574948baf4054ed555f7999e', '57493a08f4054ed555f79991', '57493364f4054ed555f7997e', '574869cef4054ed555f79971', '574726cbf4054ed555f79961', '57471c7ff4054ed555f79954', '5745c269f4054ed555f79914', '5745bca4f4054ed555f79907', '57459d2af4054ed555f798ee', '57459323f4054ed555f798df', '57458b1ef4054ed555f798cf', '57457f23f4054ed555f798ba', '574576e6f4054ed555f798a9', '5745596ff4054ed555f7988d', '574171964fc55b5a1a694423', '574090484fc55b5a1a694412', '57191a8f9ce3eb7640702d9d', '5718dbc79ce3eb7640702d25', '57162eab9ce3eb7640702b96', '56deca3e0fd9a2313cfe34e2'];

    //extra
    var creativeClassroomTagsCandidates = ['5745d462f4054ed555f79931', '57470079f4054ed555f7993c', '57470a5bf4054ed555f79945', '574c23edf4054ed555f79ab6', '574d8e17f4054ed555f79b6f'];


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
                        if(scenarios[i].tags[j].text == 'CreativeClassroomCollection'){
                            hasTag = true;
                        }
                    }

                    if(!hasTag){
                        if(!scenarios[i].tags){
                            scenarios[i].tags = [];
                        }
                        var newTags = scenarios[i].tags;
                        console.log(newTags);
                        newTags.push({text: "CreativeClassroomCollection"});
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
  });
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

router.get('/update-subjects/', restrict,  function(req, res, next) {
  /*console.log('updating');

 var translated_subjects=[{name_et:"Eesti keel ",name_en:"Estonian"},{name_et:"Vene keel emakeelena",name_en:"Russian (as the native language)"},{name_et:"Kirjandus",name_en:"Literature"},{name_et:"Eesti keel võõrkeelena",name_en:"Estonian (as a foreign language)"},{name_et:"Inglise keel",name_en:"English"},{name_et:"Prantsuse keel",name_en:"French"},{name_et:"Saksa keel",name_en:"German"},{name_et:"Vene keel",name_en:"Russian"},{name_et:"Rootsi keel",name_en:"Swedish"},{name_et:"Soome keel",name_en:"Finnish"},{name_et:"Matemaatika",name_en:"Mathematics"},{name_et:"Loodusõpetus",name_en:"Nature education"},{name_et:"Bioloogia",name_en:"Biology"},{name_et:"Geograafia",name_en:"Geography"},{name_et:"Füüsika",name_en:"Physics"},{name_et:"Keemia",name_en:"Chemistry"},{name_et:"Inimeseõpetus",name_en:"Human studies"},{name_et:"Ajalugu",name_en:"History"},{name_et:"Ühiskonnaõpetus",name_en:"Civic education"},{name_et:"Kunst",name_en:"Art education"},{name_et:"Muusika",name_en:"Music education"},{name_et:"Töö- ja tehnoloogiaõpetus",name_en:"Craft and technology studies"},{name_et:"Käsitöö",name_en:"Handicraft"},{name_et:"Kodundus",name_en:"Home economics"},{name_et:"Haridustehnoloogia",name_en:"Education technology"},{name_et:"Kehaline kasvatus",name_en:"Physical education"},{name_et:"Informaatika",name_en:"Computer science"},{name_et:"Majandus ja ettevõtlus",name_en:"Economics and entrepreneurial education"},{name_et:"Meediaõpetus",name_en:"Media studies"},{name_et:"Rigiikaitse",name_en:"National defence"},{name_et:"Uurimistöö",name_en:"Research paper"},{name_et:"Filosoofia",name_en:"Philosophy"}];

  async.waterfall([
    function(next){
        var q = {};
        q.args = {};
        mongoService.find(q, Subject, function(err, subjects){
          if (err) { return next({error: err}); }
          if(subjects){

              console.log(subjects.length);
              //console.log(scenarios[0]._id);
              //console.log(scenarios[0].subjects.length);

              var array = [];

              for(var i = 0; i < subjects.length; i++){

                  for(var j = 0; j < translated_subjects.length; j++){

                      if(subjects[i].name == translated_subjects[j].name_et){

                         array.push({_id: subjects[i]._id, name_et: translated_subjects[j].name_et, name_en: translated_subjects[j].name_en});

                      }
                  }
              }

              //console.log(array);

              next(null, array);
          }
        });
        console.log('updating');


    },
    function(subjects, next){

        for(var i = 0; i < subjects.length; i++){

            var q = {};
            q.where = {"_id": subjects[i]._id};
            q.update = { name_et: subjects[i].name_et, name_en: subjects[i].name_en};

            mongoService.update(q, Subject, function(err, s){
              if (err) { return next({error: err}); }
              console.log('updated '+ s._id + ' ' + s.name_et+ ' ' + s.name_en);
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
