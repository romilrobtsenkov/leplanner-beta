var express = require('express');
var router = express.Router();
var restrict = require('../auth/restrict');

router.get('/', restrict, function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  var vm = {
    title: 'Home',
    orderId: req.session.orderId,
    firstName: req.user ? req.user.firstName : null
  };
  res.render('home/index', vm);
});

module.exports = router;
