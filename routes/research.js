const express = require('express');
const router = express.Router();
const restrict = require('../auth/restrict');
//mongoose.Promise = require('bluebird');
const Promise = require('bluebird');

const mongoService = require('../services/mongo-service');
const scenarioService = require('../services/scenario-service');

const Scenario = require('../models/scenario').Scenario;
const Material = require('../models/activity-material').Material;

const E = require('../errors');
const log = require('../logger');

const config = require('../config/config');

/* PARAMS
    - key
    - tag || sceanrios
    - limit (default 500)
    - order (default created)
        latest
        popular
        favorited
        commented
*/
router.get('/', restrict, function(req, res) {

    var query = req.query;
    var response = {};
    var msg = '';

    if(!query.key ||  query.key !== config.apiKey){
        var key = '';
        if(query.key){ key = query.key; }
        msg = 'wrong or not existing API key, tried=' + query.key;

        log.error(msg);
        return res.status(500).send(msg);
    }

    if(!query.tag && !query.scenarios){
        msg = 'Please add correct tag to the key ?key=APIkey&tag=tagname OR specify scenarios comma separated ?key=APIkey&scnearios=1,2,3';

        log.error(msg);
        return res.status(500).send(msg);
    }

    if(query.scenarios){
        var scenariosApiList = query.scenarios.split(',');
        if(scenariosApiList.length < 1){
            msg = 'Please specify scenarios comma separated ?key=APIkey&scnearios=1,2,3 THERE SHOULD BE atleast ONE, provided = '+query.scenarios;

            log.error(msg);
            return res.status(500).send(msg);
        }
    }

    Promise.resolve(scenarioService.getSortOrder(query))
    .then(function (sort) {

        log.info('making query with details: ');
        log.info(query);

        var q = {};
        if(query.tag){
            /* REGEX exact match with lowercase */
            var tagRegex = '^' + query.tag+'$';
            q.args = { 'tags.text': { "$regex": tagRegex, "$options": "i" }, draft: false, deleted: false};
        }else{
            // find by scenarios id - one or many
            q.args = {_id: { $in: scenariosApiList}, draft: false, deleted: false};
        }

        q.populated_fields = [];
        q.populated_fields.push({
            field: 'subjects',
            populate: '_id name_et name_en'
        });
        q.select = "-subject"; // retired
        q.populated_fields.push({
            field: 'author',
            populate: 'first_name last_name created'
        });
        q.sort = sort;
        q.limit = 500;
        if (query.limit) {
            query.limit = parseInt(query.limit);
            q.limit = query.limit;
        }

        return mongoService.find(q, Scenario);
    })
    .then(function (scenarios) {

        //loose mongodb type before editing array, otherwise locked
        response.scenarios = JSON.parse(JSON.stringify(scenarios));

        var scenarioIds = [];
        scenarios.forEach(function(s){
            scenarioIds.push(s._id);
        });

        var q = {};
        q.args = {scenario: { $in: scenarioIds}};
        q.select = "-conveyor_name -conveyor_url -display_id -other_display"; // retired

        return mongoService.find(q, Material);

    })
    .then(function (materials) {

        // attach each resource to activity
        for(var i = 0; i < materials.length; i++){
            for(var j = 0; j < response.scenarios.length; j++){
                for(var k = 0; k < response.scenarios[j].activities.length; k++){
                    if(response.scenarios[j].activities[k]._id === materials[i].activity_id){
                        response.scenarios[j].activities[k].resource = materials[i];
                    }
                }
            }
        }

        // create corrected response by activity so there are multiple lines per scenario
        response.corrected = [];

        for(var s = 0; s < response.scenarios.length; s++){
            for(var a = 0; a < response.scenarios[s].activities.length; a++){
                var newObject = {};
                newObject.scenario = JSON.parse(JSON.stringify(response.scenarios[s]));
                newObject.activity = JSON.parse(JSON.stringify(response.scenarios[s].activities[a]));
                newObject.scenario.activities = undefined;
                response.corrected.push(newObject);
            }
        }
        log.notice('got '+response.scenarios.length+' scenarios for research request');
        return res.status(200).json(response.corrected);

    })
    .catch(function (error) {
        log.error(error);
        return res.status(500).send('could not get scenarios');
    });

});

module.exports = router;
