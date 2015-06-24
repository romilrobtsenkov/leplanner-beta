var express = require('express');
var router = express.Router();
var restrict = require('../auth/restrict');
var scenarioService = require('../services/scenario-service');

router.get('/api/scenarios', restrict, function(req, res, next) {
  scenarioService.getScenarios(function(err, restaurants) {
    if (err) {
      return res.status(500).json({error: 'Failed to retrieve scenarios'});
    }
    res.json(restaurants);
  });
});

router.get('/api/scenario-details/:restId', function(req, res, next) {
  scenarioService.getScenarioDetails(req.params.restId, function(err, details) {
    if (err) {
      return res.status(500).json({error: 'Failed to retrieve details'});
    }
    res.json(details);
  });
});

module.exports = router;
