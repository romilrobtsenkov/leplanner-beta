const express = require('express');
const router = express.Router();
const restrict = require('../auth/restrict');
const Promise = require('bluebird');

const mongoService = require('../services/mongo-service');
const metaService = require('../services/meta-service');

const Material = require('../models/activity-material').Material;
const Scenario = require('../models/scenario').Scenario;

const screenshotService = require('../services/screenshot-service');

const E = require('../errors');
const log = require('../logger');

router.post('/', restrict, function (req, res) {

    var params = req.body;
    var savedMaterial;

    if (!params.material.material_name ||
        !params.material.activity_id ||
        !params.material.position ||
        !params.scenario._id) {

        return res.sendStatus(404);
    }

    var q = {};
    q.args = { _id: params.scenario._id, author: req.user._id };
    q.select = '_id';

    mongoService.findOne(q, Scenario)
    .then(function (latestScenario) {

        if (!latestScenario) {
            return Promise.reject(new E.ForbiddenError('no access to others scenarios'));
        }

        var q = {};
        q.args = {
            scenario: params.scenario._id,
            activity_id: params.material.activity_id,
            position: params.material.position,
            deleted: false,
        };
        q.select = '_id';

        return mongoService.findOne(q, Material);
    })
    .then(function (material) {
        if (material) { return Promise.reject(new E.Error('already exists')); }

        // save new
        var newMaterial = params.material;
        newMaterial.scenario = params.scenario._id;
        newMaterial.last_modified = new Date();

        return Promise.props({
            material: mongoService.saveNew(newMaterial, Material),
            involvement_options: metaService.getInvolvementOptions(),
            displays: metaService.getDisplays(),
        });
    })
    .then(function (meta) {

        var material = meta.material.toJSON();

        // Add displays
        if(material.displays) {
            for (var l = 0; l < material.displays.length; l++) {
                material.displays[l] = meta.displays[material.displays[l]];
            }
        }

        // Add involvement level name
        material.involvement = meta.involvement_options[material.involvement_level];

        savedMaterial = material;

        //update scenario last modified Date
        var q = {};
        q.where = { _id: params.scenario._id };
        q.update = { last_modified: new Date() };

        return mongoService.update(q, Scenario);
    })
    .then(function (scenario) {

        //create screenshot in the background
        if(!scenario.draft){
            screenshotService.create(scenario._id);
        }

        log.notice(req.user.first_name + '(' + req.user._id + ') updated scenario: ' + scenario._id);
        res.status(200).json({ material: savedMaterial });
    })
    .catch(E.Error, function (err) {
        res.status(err.statusCode).send(err.message);
    })
    .catch(function (err) {
        log.error(err);
        res.status(500).send('could not create material due to server error');
    });

});

router.post('/:id', restrict, function (req, res) {

    var params = req.params;
    var postData = req.body;
    var updatedMaterial;

    if (!postData.material.material_name ||
        !postData.material.activity_id ||
        !postData.material.position ||
        !params.id ||
        !postData.scenario._id) {

        return res.sendStatus(404);
    }

    var q = {};
    q.args = { _id: postData.scenario._id, author: req.user._id };
    q.select = '_id';

    mongoService.findOne(q, Scenario)
    .then(function (latestScenario) {

        if (!latestScenario) { return Promise.reject(new E.ForbiddenError('no access to others scenarios')); }

        var q = {};
        q.where = { _id: params.id };
        q.update = postData.material;
        q.update.last_modified = new Date();

        // TODO replace
        if (typeof q.update.conveyor_name === 'undefined') {
            q.update.conveyor_name = null;
        }

        if (typeof q.update.conveyor_url === 'undefined') {
            q.update.conveyor_url = null;
        }

        if (typeof q.update.display_id === 'undefined') {
            q.update.display_id = null;
        }

        if (typeof q.update.material_url === 'undefined') {
            q.update.material_url = null;
        }

        return Promise.props({
            material: mongoService.update(q, Material),
            involvement_options: metaService.getInvolvementOptions(),
            displays: metaService.getDisplays(),
        });
    })
    .then(function (meta) {

        var material = meta.material.toJSON();

        // Add displays
        if(material.displays) {
            for (var l = 0; l < material.displays.length; l++) {
                material.displays[l] = meta.displays[material.displays[l]];
            }
        }

        // Add involvement level name
        material.involvement = meta.involvement_options[material.involvement_level];

        updatedMaterial = material;

        //update scenario last modified Date
        var q = {};
        q.where = { _id: postData.scenario._id };
        q.update = { last_modified: new Date() };

        return mongoService.update(q, Scenario);
    })
    .then(function (scenario) {

        //create screenshot in the background
        if(!scenario.draft){
            screenshotService.create(scenario._id);
        }

        log.notice(req.user.first_name + '(' + req.user._id + ') updated scenario: ' + scenario._id);
        res.status(200).json({ material: updatedMaterial });
    })
    .catch(E.Error, function (err) {
        res.status(err.statusCode).send(err.message);
    })
    .catch(function (err) {
        log.error(err);
        res.status(500).send('could not update material due to server error');
    });
});

router.post('/delete/:id', restrict, function (req, res) {

    var params = req.params;
    var postData = req.body;
    var responseMaterial;

    if (!params.id || !postData.scenario._id) {
        return res.sendStatus(404);
    }

    var q = {};
    q.args = { _id: postData.scenario._id, author: req.user._id };
    q.select = '_id';

    mongoService.findOne(q, Scenario)
    .then(function (latestScenario) {

        if (!latestScenario) {
            return Promise.reject(new E.ForbiddenError());
        }

        var q = {};
        q.args = { _id: params.id, deleted: false };
        q.select = '_id';

        return mongoService.findOne(q, Material);
    })
    .then(function (existingMaterial) {

        if (!existingMaterial) {
            return Promise.reject(new E.Error('material already does not exist'));
        }

        var q = {};
        q.where = { _id: existingMaterial._id };
        q.update = {
            deleted: true,
            deleted_date: new Date(),
        };
        q.select = '_id activity_id';

        return mongoService.update(q, Material);
    })
    .then(function (material) {

        responseMaterial = material;

        //update scenario last modified Date
        var q = {};
        q.where = { _id: postData.scenario._id };
        q.update = { last_modified: new Date() };

        return mongoService.update(q, Scenario);
    })
    .then(function (scenario) {

        //create screenshot in the background
        if(!scenario.draft){
            screenshotService.create(scenario._id);
        }

        log.notice('material ' + responseMaterial._id + ' deleted');
        log.notice(req.user.first_name + ' updated scenario: ' + scenario._id);
        res.status(200).json({ material: { _id: responseMaterial._id, activity_id: responseMaterial.activity_id } });
    })
    .catch(E.Error, function (err) {
        res.status(err.statusCode).send(err.message);
    })
    .catch(function (err) {
        log.error(err);
        res.status(500).send('could not delete material due to server error');
    });

});

module.exports = router;
