var express = require('express');
var router = express.Router();
var metaService = require('../services/meta-service');
var async = require('async');

var Promise = require('bluebird');

router.get('/subjects/', function(req, res, next) {

    metaService.getSubjects()
    .then(function (subjects) {
        return res.json({ subjects: subjects });
    })
    .catch(function (error) {
        console.log(error);
        return res.status(500).send('could not get subjects');
    });
});

router.get('/scenario/', function(req, res, next) {

    Promise.props({
        subjects: metaService.getSubjects(),
        activity_organization: metaService.getActivityOrganization(),
        involvement_options: metaService.getInvolvementOptions(),
        displays: metaService.getDisplays(),
    })
    .then(function (response) {
        return res.json(response);
    })
    .catch(function (error) {
        console.log(error);
        return res.status(500).send('could not get meta for scenarios');
    });
});

module.exports = router;
