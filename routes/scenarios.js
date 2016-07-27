var express = require('express');
var request = require('request');
var fs = require('fs');
var config = require('../config/config');
var router = express.Router();
var restrict = require('../auth/restrict');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var Promise = require('bluebird');

var mongoService = require('../services/mongo-service');
var validateService = require('../services/validate-service');
var validationPromise = Promise.promisify(validateService.validate);
var scenarioService = require('../services/scenario-service');
var metaService = require('../services/meta-service');


var Scenario = require('../models/scenario').Scenario;
var Comment = require('../models/comment').Comment;
var Notification = require('../models/notification').Notification;
var Favorite = require('../models/favorite').Favorite;
var Follower = require('../models/follower').Follower;
var Material = require('../models/activity-material').Material;
var User = require('../models/user').User;

var async = require('async');

var main_subjects_languages = main_subjects_languages;

const E = require('../errors');

/* template
async.waterfall([], function (err, result) {
if(err){ res.json(err); }
res.json(result);
});
*/

router.get('/copy/:id', restrict, function(req, res, next) {

    var params = req.params;
    var response;

    console.log(req.user._id + ' creates copy of ' +params.id);

    // find parent to copy
    var q = {};
    q.args = { _id: params.id };

    mongoService.findOneWithPromise(q, Scenario)
    .then(function (scenario) {

        if(!scenario) { return Promise.reject(new E.NotFoundError('no scenario with such id')); }

        //add mother_scenario params.id
        //change user
        var newOne = scenario;
        newOne.name = "[copy] "+scenario.name;
        newOne.mother_scenario = scenario._id;

        newOne._id = mongoose.Types.ObjectId();
        newOne.isNew = true; //<--------------------IMPORTANT

        newOne.author = req.user._id;
        newOne.created = new Date();
        newOne.favorites_count = 0;
        newOne.comments_count = 0;
        newOne.view_count = 0;
        newOne.draft = true;
        newOne.last_modified = new Date();

        return mongoService.saveNewWithPromise(newOne, Scenario);
    })
    .then(function (newScenario) {

        console.log('saved new copy');
        response = { _id: newScenario };

        // Find all materials
        var q = {};
        q.args = {
            scenario: params.id,
            deleted: false
        };

        return mongoService.findWithPromise(q, Material);
    })
    .then(function (materials) {

        if(materials.length === 0){ return Promise.resolve(); }

        for(var i = 0; i < materials.length; i++){
            materials[i]._id = mongoose.Types.ObjectId();
            materials[i].isNew = true; //<--------------------IMPORTANT
            materials[i].created = new Date();
            materials[i].last_modified = new Date();
            materials[i].scenario = response._id; //<--------------------NEW SCENARIO ID
        }

        return Material.create(materials);
    })
    .then(function (savedMaterials) {

        if (savedMaterials) { console.log('materials added:' + savedMaterials.length); }

        return res.json(response);
    })
    .catch(E.Error, function (err) {
        return res.status(err.statusCode).send(err.message);
    })
    .catch(function (error) {
        console.log(error);
        return res.status(500).send('could not copy scenario');
    });

});

router.post('/create/', restrict, function(req, res, next) {

    var params = req.body;

    validationPromise([{fn:'createScenario', data:params}])
    .then(function (){
        var new_scenario = params.scenario;
        new_scenario.author = params.user._id;
        new_scenario.draft = true;
        new_scenario.last_modified = new Date();

        return mongoService.saveNewWithPromise(new_scenario, Scenario);
    })
    .then(function (scenario){
        res.json({scenario: { _id: scenario._id } });
    })
    .catch(function (err) {
        console.log(err);
        res.json({error: err});
    });

});

router.post('/delete-scenario/', restrict, function(req, res, next) {

    var params = req.body;

    async.waterfall([
        function(next){

            //check if user has rights to delete the comment
            var q = {};
            q.args = { _id: params.scenario._id, author: req.user._id };

            mongoService.findOne(q, Scenario, function(err, scenario){
                if (err) { return next({error: err}); }
                if(scenario === null){
                    // passport req user different from scenario author
                    return next({error: {id: 3, message: 'no rights'}});
                }
                next();
            });
        },
        function(next){

            var q = {};
            q.where = { _id: params.scenario._id, deleted: false};
            q.update = {
                deleted: true
            };
            q.select = '_id';

            mongoService.update(q, Scenario, function(err, scenario){
                if (err) { return next({error: err}); }
                if(scenario === null){ return next({error: "no scenario to remove"}); }
                next(null, {success: 'success'});
            });
        }
    ], function (err, result) {
        if(err){ res.json(err); }
        res.json(result);
    });

});

router.post('/get-edit-data-single-scenario/', restrict, function(req, res, next) {

    var params = req.body;

    async.waterfall([
        function(next){
            var q = {};
            q.args = { _id: params.scenario._id, author: req.user._id };

            mongoService.findOne(q, Scenario, function(err, user){
                if (err) { return next({error: err}); }
                if(user === null){
                    console.log('no rights');
                    // passport req user different from scenario author
                    return next({error: {id: 3, message: 'no rights'}});
                }
                next();
            });
        },
        function(next){
            var q = {};
            q.args = { _id: params.scenario._id };
            q.populated_fields = [];
            q.populated_fields.push({
                field: 'subjects',
                populate: main_subjects_languages
            });

            mongoService.findOne(q, Scenario, function(err, scenario){
                if (err) { return next({error: err}); }
                if(scenario === null){ return next({error: {id: 0, message: 'no scenario found' }}); }
                next(null, scenario);
            });
        },
        function(scenario, next){
            //get activity materials
            var q = {};
            q.args = { scenario: params.scenario._id, deleted: false };
            mongoService.find(q, Material, function(err, materials){
                if (err) { return next({error: err}); }
                next(null, {scenario: scenario, materials: materials});
            });
        }
    ], function (err, result) {
        if(err){ res.json(err); }
        res.json(result);
    });
});

router.post('/list/', function(req, res, next) {

    var query = req.body;

    async.waterfall([
        function(next){

            scenarioService.getSortOrder(query, function(err, sort){
                if (err) { return next({error: err}); }
                next(null, sort);
            });
        },
        function(sort, next){

            var q = {};
            q.args = { author: query.user._id, draft: false, deleted: false};
            q.populated_fields = [];
            q.populated_fields.push({
                field: 'author',
                populate: 'first_name last_name created'
            });
            q.populated_fields.push({
                field: 'subjects',
                populate: main_subjects_languages
            });
            q.sort = sort;

            mongoService.find(q, Scenario, function(err, scenarios) {
                if (err) { return next({error: err}); }
                next(null, {scenarios: scenarios});
            });
        }
    ], function (err, result) {
        if(err){ res.json(err); }
        res.json(result);
    });

});

router.post('/save/', restrict, function(req, res, next) {

    var params = req.body;

    async.waterfall([
        function(next){
            //check author
            var q = {};
            q.args = { _id: params.scenario_data._id, author: req.user._id };

            mongoService.findOne(q, Scenario, function(err, latest_scenario){
                if (err) { return next({error: err}); }
                if(latest_scenario === null){
                    console.log('no rights');
                    // passport req user different from scenario author
                    return next({error: {id: 3, message: 'no rights'}});
                }
                next(null, latest_scenario);
            });
        },
        function(latest_scenario, next){

            var new_scenario = params.scenario_data;
            new_scenario.last_modified = new Date();

            //disallow in any way to change author
            new_scenario.author = req.user._id;

            // fix only positive numbers in grade, duration
            if(new_scenario.grade !== null){
                new_scenario.grade = Math.abs(new_scenario.grade);
            }
            if(new_scenario.duration !== null){
                new_scenario.duration = Math.abs(new_scenario.duration);
            }

            // reset to calculate again
            new_scenario.activities_duration = 0;

            for(var i = 0; i < new_scenario.activities.length; i++){
                if(typeof new_scenario.activities[i].duration === 'undefined'){
                    // fix if user left it empty
                    new_scenario.activities[i].duration = 0;
                }
                new_scenario.activities[i].duration = Math.abs(new_scenario.activities[i].duration);
                new_scenario.activities_duration += new_scenario.activities[i].duration;
            }

            //console.log(new_scenario);

            if(typeof new_scenario._id === 'undefined'){ return next ({error: {id: 0, message: "No scenario id" }}); }

            //update existing
            var q = {};
            q.where = { _id: new_scenario._id };
            q.update = new_scenario;
            q.update.last_modified = new Date();
            mongoService.update(q, Scenario, function(err, scenario){
                if (err) { return next({error: err}); }
                console.log(req.user.first_name+' updated scenario: '+scenario._id);
                next(null, {scenario: { _id: scenario._id } } );
            });

        }
    ], function (err, result) {
        if(err){ res.json(err); }
        res.json(result);
    });

});

router.post('/scenarios-dash-list/', restrict, function(req, res, next) {

    var query = req.body;

    async.waterfall([
        function(next){

            scenarioService.getSortOrder(query, function(err, sort){
                if (err) { return next({error: err}); }
                next(null, sort);
            });
        },
        function(sort, next){

            // default page to feed
            if(typeof query.page === 'undefined'){ query.page = 'feed'; }

            switch (query.page) {
                case 'feed':

                async.waterfall([
                    function(next){

                        var q = {};
                        q.args = {follower: query.user._id, removed: null};
                        q.select = 'following';

                        mongoService.find(q, Follower, function(err, following){
                            if (err) { return next({error: err}); }
                            next(null, following);
                        });
                    },
                    function(following, next){

                        var list_of_following_ids = [];
                        for(var i = 0; i< following.length; i++){
                            list_of_following_ids[i] = following[i].following;
                        }

                        var q = {};
                        q.args = { author: { $in : list_of_following_ids }, draft: false, deleted: false};
                        q.populated_fields = [];
                        q.populated_fields.push({
                            field: 'author',
                            populate: 'first_name last_name created'
                        });
                        q.populated_fields.push({
                            field: 'subjects',
                            populate: main_subjects_languages
                        });
                        q.sort = sort;

                        mongoService.find(q, Scenario, function(err, scenarios) {
                            if (err) { return next({error: err}); }
                            next(null, {scenarios: scenarios});
                        });

                    }
                ], function (err, result) {
                    if(err){ next(err); }
                    next(null, result);
                });

                break;

                case 'drafts':

                var q = {};
                q.args = { author: query.user._id, draft: true, deleted: false};
                q.populated_fields = [];
                q.populated_fields.push({
                    field: 'author',
                    populate: 'first_name last_name created'
                });
                q.populated_fields.push({
                    field: 'subjects',
                    populate: main_subjects_languages
                });
                q.sort = sort;

                mongoService.find(q, Scenario, function(err, scenarios) {
                    if (err) { return next({error: err}); }
                    next(null, {scenarios: scenarios});
                });

                break;

                case 'published':

                q = {};
                q.args = { author: query.user._id, draft: false, deleted: false};
                q.populated_fields = [];
                q.populated_fields.push({
                    field: 'author',
                    populate: 'first_name last_name created'
                });
                q.populated_fields.push({
                    field: 'subjects',
                    populate: main_subjects_languages
                });
                q.sort = sort;

                mongoService.find(q, Scenario, function(err, scenarios) {
                    if (err) { return next({error: err}); }
                    next(null, {scenarios: scenarios});
                });

                break;
                case 'favorites':

                async.waterfall([
                    function(next){

                        var q = {};
                        q.args = {user: query.user._id, removed: null};
                        q.select = 'scenario';

                        mongoService.find(q, Favorite, function(err, favorites){
                            if (err) { return next({error: err}); }
                            next(null, favorites);
                        });
                    },
                    function(favorites, next){

                        if(favorites.length > 0){
                            var list_of_scenario_ids = [];

                            //create a list of scenario ids
                            for(var i = 0; i < favorites.length; i++){
                                list_of_scenario_ids.push(favorites[i].scenario);
                            }

                            var q = {};
                            q.args = { _id: { $in : list_of_scenario_ids }, draft: false, deleted: false};
                            q.populated_fields = [];
                            q.populated_fields.push({
                                field: 'author',
                                populate: 'first_name last_name created'
                            });
                            q.populated_fields.push({
                                field: 'subjects',
                                populate: main_subjects_languages
                            });
                            q.sort = sort;

                            mongoService.find(q, Scenario, function(err, scenarios) {
                                if (err) { return next({error: err}); }
                                next(null, {scenarios: scenarios});
                            });

                        }else{
                            return next(null, {scenarios: []});
                        }
                    }
                ], function (err, result) {
                    if(err){ next(err); }
                    next(null, result);
                });

                break;

                default:
                return next(null, {scenarios: []});
            }

        }
    ], function (err, result) {
        if(err){ res.json(err); }
        res.json(result);
    });

});

router.get('/search', function(req, res, next) {

    const PAGESIZE = 10;

    var query = req.query;
    //console.log(query);

    query.page = parseInt(query.page, 10) > 0 || 0;
    if(query.page < 0) {query.page = 0;}

    Promise.resolve(scenarioService.getSortOrder(query))
    .then(function (sort) {
        var q = {};
        q.args = { draft: false, deleted: false };

        // search word
        if(typeof query.q !== 'undefined'){
            q.args.$or = [
                { name: { "$regex": query.q, "$options": "i" } },
                { description: { "$regex": query.q, "$options": "i" } },
                { 'tags.text': { "$regex": query.q, "$options": "i" } },
            ];
        }

        // meta fields
        if(query.subjects){
            query.subjects= query.subjects.split(",");
            q.args.subject = { $in : query.subjects };
        }
        if(query.languages){
            query.languages= query.languages.split(",");
            q.args.language = { $in : query.languages };
        }

        q.populated_fields = [];
        q.populated_fields.push({
            field: 'author',
            populate: 'first_name last_name created'
        });
        q.populated_fields.push({
            field: 'subjects',
            populate: main_subjects_languages
        });
        q.sort = sort;

        q.skip = query.page * PAGESIZE;
        q.limit = PAGESIZE;

        var count_q = q;
        count_q.skip = count_q.limit = undefined;

        return Promise.props({
            scenarios: mongoService.findWithPromise(q, Scenario),
            count: mongoService.countWithPromise(count_q, Scenario)
        });
    })
    .then(function (response) {
        return res.json(response);
    })
    .catch(function (err) {
        console.log(err);
        return res.json(err);
    });

});

router.get('/single/:id', function(req, res, next) {

    var params = req.params;
    var response = {};

    if (!params.id) { return res.sendStatus(404); }

    var q = {};
    q.where = { _id: params.id };
    q.populated_fields = [];
    q.populated_fields.push({
        field: 'author',
        populate: 'first_name last_name organization created image last_modified'
    });
    q.populated_fields.push({
        field: 'subjects',
        populate: main_subjects_languages
    });
    // mother scenario id, scenario name ja scenario author
    q.populated_fields.push({
        field: 'mother_scenario',
        populate: '_id name author'
    });
    q.update = { $inc: { view_count: 1 } };

    mongoService.updateWithPromise(q, Scenario)
    .then(function (scenario) {

        if(!scenario){return Promise.reject(new E.NotFoundError('no scenario with such id')); }

        response.scenario = scenario.toJSON(); // Plain JSON obj to modify

        // CHILD SCENARIOS
        var q = {};
        q.args = { mother_scenario:response.scenario._id, draft:false, deleted:false };
        q.select = "name author";
        q.populated_fields = [];
        q.populated_fields.push({
            field: 'author',
            populate: 'first_name last_name'
        });

        return mongoService.findWithPromise(q, Scenario);
    })
    .then(function (childScenarios) {

        if (childScenarios && childScenarios.length > 0) {
            response.scenario.child_scenarios = childScenarios;
        }

        if (!response.scenario.mother_scenario) { return Promise.resolve(); }

        // MOTHER SCENARIO AUTHOR NAME
        var q = {};
        q.args = { _id: response.scenario.mother_scenario.author };
        q.select = "first_name last_name";

        return mongoService.findOneWithPromise(q, User);
    })
    .then(function (user) {

        if (user) { response.scenario.mother_scenario.author = user; }
        if(!req.user){ return Promise.resolve(); }

        // CHECK IF IS FAVORITED OR IS FOLLOWING
        var favQ = {};
        favQ.args = { scenario: response.scenario._id, user: req.user._id };

        var folQ = {};
        folQ.args = { follower: req.user._id, following: response.scenario.author._id, removed: null };

        return Promise.props({
            favorite: mongoService.findOneWithPromise(favQ, Favorite),
            following: mongoService.findOneWithPromise(folQ, Follower)
        });
    })
    .then(function (obj) {

        if(obj && obj.favorite){ response.is_favorite = true; }
        if(obj && obj.following){ response.is_following = true; }

        // MARK NOTIFICATIONS SEEN
        // if author viewing if there are notifications - mark them as seen, else skip!
        if(!req.user){ return Promise.resolve(); }
        if(req.user && req.user._id.toString() !== response.scenario.author._id.toString()){ return Promise.resolve(); }

        var q = {};
        q.where = { user: req.user._id, type: 'comment', 'data.scenario': response.scenario._id, seen: null };
        q.update = { seen: new Date() };

        return mongoService.updateMultipleWithPromise(q, Notification);
    })
    .then(function () {

        // GET RESOURCES AND OTHER META
        var q = {};
        q.args = { scenario: response.scenario._id, deleted: false };

        return Promise.props({
            materials: mongoService.findWithPromise(q, Material),
            activity_organization: metaService.getActivityOrganization(),
            involvement_options: metaService.getInvolvementOptions(),
            displays: metaService.getDisplays(),
        });
    })
    .then(function (meta) {

        // add materials & other meta to scenario activities
        for(var i = 0; i < meta.materials.length; i++){
            for(var j = 0; j < response.scenario.activities.length; j++) {
                if(meta.materials[i].activity_id === response.scenario.activities[j]._id) {
                    if (!response.scenario.activities[j].materials) {
                        response.scenario.activities[j].materials = [];
                    }

                    var material = meta.materials[i].toJSON();

                    // displays
                    if(material.displays) {
                        for (var l = 0; l < material.displays.length; l++) {
                            material.displays[l] = meta.displays[material.displays[l]];
                        }
                    }

                    // involvement level name
                    material.involvement = meta.involvement_options[material.involvement_level];

                    response.scenario.activities[j].materials.push(material);
                }
            }
        }

        // activity organization
        for(var k = 0; k < response.scenario.activities.length; k++) {
            response.scenario.activities[k].activity_organization.name = meta.activity_organization[response.scenario.activities[k].activity_organization._id].name;
        }

        return res.json(response);
    })
    .catch(E.Error, function (err) {
        return res.status(err.statusCode).send(err.message);
    })
    .catch(function (err) {
        console.log(err);
        return res.status(500).send('retrieving scenario failed due to server error');
    });


});

router.post('/tag/', function(req, res, next) {

    var query = req.body;

    async.waterfall([
        function(next){

            scenarioService.getSortOrder(query, function(err, sort){
                if (err) { return next({error: err}); }
                next(null, sort);
            });
        },
        function(sort, next){

            var q = {};

            q.args = { 'tags.text': {$regex: new RegExp('^' + query.tag.text, 'i')}, draft: false, deleted: false};
            q.populated_fields = [];
            q.populated_fields.push({
                field: 'author',
                populate: 'first_name last_name created'
            });
            q.populated_fields.push({
                field: 'subjects',
                populate: main_subjects_languages
            });
            q.sort = sort;

            mongoService.find(q, Scenario, function(err, scenarios) {
                if (err) { return next({error: err}); }
                next(null, {scenarios: scenarios});
            });
        }
    ], function (err, result) {
        if(err){ res.json(err); }
        res.json(result);
    });

});

// Takes in parameters
// order & limit & exclude? & author?
router.get('/widget/', function(req, res, next) {

    var query = req.query;

    Promise.resolve(scenarioService.getSortOrder(query))
    .then(function (sort) {

        var q = {};
        q.args = { draft: false, deleted: false};

        // single scenario view widget, exclude scenario that is viewd and get same user scenarios
        if (query.exclude) { q.args._id = {'$ne': query.exclude }; }
        if (query.author) { q.args.author = query.author; }

        q.populated_fields = [];
        q.populated_fields.push({
            field: 'author',
            populate: 'first_name last_name created'
        });
        q.sort = sort;
        if (query.limit) { query.limit = parseInt(query.limit); }
        q.limit = query.limit;

        return mongoService.findWithPromise(q, Scenario);
    })
    .then(function (scenarios) {
        return res.json({scenarios: scenarios});
    })
    .catch(function (error) {
        console.log(error);
        return res.status(500).send('could not get scenarios');
    });

});

module.exports = router;
