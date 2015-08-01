var express = require('express');
var router = express.Router();
var metaService = require('../services/meta-service');

router.get('/subjects/', function(req, res, next) {
  metaService.getSubjects(function(err, subjects) {
    if (err) { return res.json({error: err}); }
    return res.json({subjects: subjects});
  });
});

module.exports = router;
