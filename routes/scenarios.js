var express = require('express');
var router = express.Router();
var restrict = require('../auth/restrict');
var scenarioService = require('../services/scenario-service');

router.post('/scenarios-list/', function(req, res, next) {
    console.log(scenarioService);
    scenarioService.getScenarios(req.body, function(err, scenarios) {
      if (err) { return res.json({error: err}); }
      return res.json({hello: 'hello'});
    });
  });

module.exports = router;
