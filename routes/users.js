var express = require('express');
var router = express.Router();
var passport = require('passport');
var userService = require('../services/user-service');
var config = require('../config/config');
var restrict = require('../auth/restrict');

/* GET users listing - /api/users/ */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', function(req, res, next) {
  userService.addUser(req.body, function(err) {
    if (err) {
      console.log(err);
      var vm = {
        title: 'Create an account',
        input: req.body,
        error: err
      };
      delete vm.input.password;
      return res.render('users/create', vm);
    }
    req.login(req.body, function(err) {
      res.redirect('/home');
    });
  });
});

router.get('/me', restrict, function(req, res){
      return res.json(req.session.passport.user);
});

router.post('/login',
  function(req, res, next) {

    req.session.cookie.maxAge = config.cookieMaxAge;

    passport.authenticate('local', {
      failureRedirect: '/#/login',
      successRedirect: '/#/'
    });
  },

  function(req, res) {
    // Successful authentication, redirect home.
    console.log(req.body);
    //res.send(200);
    res.redirect('/#/');
  }
);

router.get('/logout', function(req, res, next) {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
