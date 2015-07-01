var express = require('express');
var router = express.Router();
var passport = require('passport');
var userService = require('../services/user-service');
var config = require('../config/config');
var restrict = require('../auth/restrict');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', function(req, res, next) {
  userService.addUser(req.body, function(err) {
    if (err) {
      //debug
      console.log(err);
      return res.json({error: err});

    }

    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) {
        return res.json({error: info.message});
      }

      req.logIn(user, function(err) {
        if (err) { return next(err); }

        // login successful
        // future: redirect to /users/:id or to linking with social accounts
        res.json({successful: user});
      });

    })(req, res, next);

  });
});

router.get('/me', function(req, res){
      res.json(req.session.passport.user);
});

router.post('/login',
  function(req, res, next) {

    req.session.cookie.maxAge = config.cookieMaxAge;

    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) {
        return res.json({error: info.message});
      }

      req.logIn(user, function(err) {
        if (err) { return next(err); }

        // login successful
        // future: redirect to /users/:id
        res.json({successful: user});
      });

    })(req, res, next);

  }
);

router.get('/logout', function(req, res, next) {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
