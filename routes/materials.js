const express = require('express');
const router = express.Router();

const restrict = require('../auth/restrict');

const Promise = require('bluebird');

const mongoService = require('../services/mongo-service');
const validateService = require('../services/validate-service');
const validationPromise = Promise.promisify(validateService.validate);
const Material = require('../models/activity-material').Material;

const Scenario = require('../models/scenario').Scenario;

/**
* POST /api/materials/
* save new material for activity
*
* @param {Object} params
*    material.material_name
*    material.activity_id
*    material.position
*    scenario._id
* @return {Element} element
*/
router.post('/', restrict, function (req, res, next) {

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

    mongoService.findOneWithPromise(q, Scenario)
    .then(function (latestScenario) {

        if (!latestScenario) { return res.status(403).send('no access to others scenarios'); }

        var q = {};
        q.args = {
            scenario: params.scenario._id,
            activity_id: params.material.activity_id,
            position: params.material.position,
            deleted: false,
          };
        q.select = '_id';

        return mongoService.findOneWithPromise(q, Material);
      })
    .then(function (material) {
        if (material) { return res.status(400).send('already exists'); }

        // save new
        var newMaterial = params.material;
        newMaterial.scenario = params.scenario._id;
        newMaterial.last_modified = new Date();

        return mongoService.saveNewWithPromise(newMaterial, Material);
      })
    .then(function (material) {

        savedMaterial = material;

        //update scenario last modified Date
        var q = {};
        q.where = { _id: params.scenario._id };
        q.update = { last_modified: new Date() };

        return mongoService.updateWithPromise(q, Scenario);
      })
    .then(function (scenario) {
        console.log(req.user.first_name + ' updated scenario: ' + scenario._id);
        res.json({ material: savedMaterial });
      })
    .catch(function (err) {
        console.log(err);
        res.status(500).send('could not create material due to server error');
      });

  });

/**
* POST /api/materials/:id
* update material for activity
*
* @param {Object} id of the material
* @param {Object} params
*    material.material_name
*    material.activity_id
*    material.position
*    scenario._id
* @return {Element} element
*/
router.post('/:id', restrict, function (req, res, next) {

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

    mongoService.findOneWithPromise(q, Scenario)
    .then(function (latestScenario) {

        if (!latestScenario) { return res.status(403).send('no access to others scenarios'); }

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

        return mongoService.updateWithPromise(q, Material);
      })
    .then(function (material) {

        updatedMaterial = material;

        //update scenario last modified Date
        var q = {};
        q.where = { _id: postData.scenario._id };
        q.update = { last_modified: new Date() };

        return mongoService.updateWithPromise(q, Scenario);
      })
    .then(function (scenario) {
        console.log(req.user.first_name + ' updated scenario: ' + scenario._id);
        res.json({ material: updatedMaterial });
      })
    .catch(function (err) {
        console.log(err);
        res.status(500).send('could not update material due to server error');
      });
  });

/**
* POST /api/materials/delete/:id
* delete activity material based on id
*
* @param {String} tag
* @return {Element} element
*/
router.post('/delete/:id', restrict, function (req, res, next) {

    var params = req.params;
    var postData = req.body;

    if (!params.id || !postData.scenario._id) {
      return res.sendStatus(404);
    }

    var q = {};
    q.args = { _id: postData.scenario._id, author: req.user._id };
    q.select = '_id';

    mongoService.findOneWithPromise(q, Scenario)
    .then(function (latestScenario) {

        if (!latestScenario) {
          return res.sendStatus(403);
        }

        var q = {};
        q.args = { _id: params.id, deleted: false };
        q.select = '_id';

        return mongoService.findOneWithPromise(q, Material);
      })
    .then(function (existingMaterial) {

        if (!existingMaterial) {
            return res.status(400).send('material already does not exist'); }

        var q = {};
        q.where = { _id: existingMaterial._id };
        q.update = {
            deleted: true,
            deleted_date: new Date(),
          };
        q.select = '_id';

        return mongoService.updateWithPromise(q, Material);

      })
    .then(function (material) {
        console.log('material ' + material._id + ' deleted');
        res.json({ material: { _id: material._id } });
      })
    .catch(function (err) {
        console.log(err);
        res.status(500).send('could not delete material due to server error');
      });

  });

module.exports = router;
