var express = require('express');
var router = express.Router();
var restrict = require('../auth/restrict');
var scenarioService = require('../services/scenario-service');

router.post('/scenarios-list/', function(req, res, next) {
  scenarioService.getScenarios(req.body, function(err, scenarios) {
    if (err) { return res.json({error: err}); }
    return res.json({scenarios: scenarios});
  });
});

router.post('/create/', function(req, res, next) {
  scenarioService.saveScenario(req.body, function(err, success) {
    if (err) { return res.json({error: err}); }
    return res.json({success: 'Saved successfully'});
  });
});

router.post('/search/', function(req, res, next) {
  scenarioService.searchScenarios(req.body, function(err, scenarios) {
    if (err) { return res.json({error: err}); }
    return res.json({scenarios: scenarios});
  });
});

router.post('/single-scenario/', function(req, res, next) {
  scenarioService.getSingleScenario(req.body, function(err, scenario) {
    if (err) { return res.json({error: err}); }
    return res.json({scenario: scenario});
  });
});

module.exports = router;
