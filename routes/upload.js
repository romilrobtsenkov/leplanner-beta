var express = require('express');
var router = express.Router();
var restrict = require('../auth/restrict');
var uploadService = require('../services/upload-service');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();

router.post('/profile-image/',multipartyMiddleware, restrict, function(req, res, next) {
  uploadService.uploadProfileImage(req, function(err, success) {
    if (err) { return res.json({error: err}); }
    return res.json({success: 'uploaded successfully'});
  });
});

module.exports = router;
