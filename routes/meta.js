const express = require('express');
const router = express.Router();
const Promise = require('bluebird');

const metaService = require('../services/meta-service');

const log = require('../logger');

router.get('/subjects/', function(req, res) {

    metaService.getSubjects()
    .then(function (subjects) {
        return res.status(200).json({ subjects: subjects });
    })
    .catch(function (error) {
        log.error(error);
        return res.status(500).send('could not get subjects');
    });
});

router.get('/scenario/', function(req, res) {

    Promise.props({
        subjects: metaService.getSubjects(),
        activity_organization: metaService.getActivityOrganization(),
        involvement_options: metaService.getInvolvementOptions(),
        displays: metaService.getDisplays(),
    })
    .then(function (response) {
        return res.status(200).json(response);
    })
    .catch(function (error) {
        log.error(error);
        return res.status(500).send('could not get meta for scenarios');
    });
});

module.exports = router;
