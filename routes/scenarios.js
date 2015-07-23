var express = require('express');
var router = express.Router();
var restrict = require('../auth/restrict');
var scenarioService = require('../services/scenario-service');

router.post('/scenarios-widget-list/', function(req, res, next) {
  scenarioService.getWidgetScenarios(req.body, function(err, scenarios) {
    if (err) { return res.json({error: err}); }
    return res.json({scenarios: scenarios});
  });
});

router.post('/scenarios-dash-list/', restrict, function(req, res, next) {
  scenarioService.getDashScenarios(req.body, function(err, scenarios) {
    if (err) { return res.json({error: err}); }
    return res.json({scenarios: scenarios});
  });
});

router.post('/scenarios-user-list/', function(req, res, next) {
  scenarioService.getUserScenarios(req.body, function(err, scenarios) {
    if (err) { return res.json({error: err}); }
    return res.json({scenarios: scenarios});
  });
});

router.post('/create/',restrict, function(req, res, next) {
  scenarioService.saveScenario(req.body.scenario, function(err, success) {
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
  scenarioService.getSingleScenario(req.body, function(err, response) {
    if (err) { return res.json({error: err}); }
    return res.json(response);
  });
});

router.post('/add-remove-favorite/',restrict, function(req, res, next) {
  scenarioService.addRemoveFavorite(req.body, function(err, response) {
    if (err) { return res.json({error: err}); }
    return res.json(response);
  });
});

router.post('/add-comment/',restrict, function(req, res, next) {
  scenarioService.addComment(req.body, function(err, comments) {
    if (err) { return res.json({error: err}); }
    return res.json(comments);
  });
});

router.post('/comments/', function(req, res, next) {
  scenarioService.getComments(req.body, function(err, comments) {
    if (err) { return res.json({error: err}); }
    return res.json(comments);
  });
});

module.exports = router;
