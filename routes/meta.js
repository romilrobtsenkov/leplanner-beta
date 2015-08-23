var express = require('express');
var router = express.Router();
var metaService = require('../services/meta-service');
var async = require('async');

router.get('/subjects/', function(req, res, next) {
  metaService.getSubjects(function(err, subjects) {
    if (err) { return res.json({error: err}); }
    return res.json({ subjects: subjects });
  });
});

router.get('/get-scenario-meta/', function(req, res, next) {

  async.waterfall([
    function(next){

      metaService.getSubjects(function(err, subjects) {
        if (err) { return next({error: err}); }
        next(null, subjects);
      });
    },
    function(subjects, next){

      metaService.getActivityOrganization(function(err, activity_organization) {
        if (err) { return next({error: err}); }
        next(null, subjects, activity_organization );
      });
    },
    function(subjects, activity_organization, next){

      metaService.getInvolvementOptions(function(err, involvement_options) {
        if (err) { return next({error: err}); }
        next(null, subjects, activity_organization, involvement_options );
      });
    },
    function(subjects, activity_organization, involvement_options, next){

      metaService.getDisplays(function(err, displays) {
        if (err) { return next({error: err}); }
        next(null, {
          subjects: subjects,
          activity_organization: activity_organization,
          involvement_options: involvement_options,
          displays: displays
         });
      });
    }
  ], function (err, result) {
    if(err){ res.json(err); }
    res.json(result);
  });

});

/* router.get('/insert-subjects/', function(req, res, next) {
  metaService.insertSubjects(function(err, subjects) {
    if (err) { return res.json({error: err}); }
    return res.json(subjects);
  });
}); */

module.exports = router;
