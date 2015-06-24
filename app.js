var path = require('path');

var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var connectMongo = require('connect-mongo');
var passport = require('passport');
var expressSession = require('express-session');
var flash = require('connect-flash');

var MongoStore = connectMongo(expressSession);

var config = require('./config/config.js');

var restrict = require('./auth/restrict');

require('./services/passport-service')(passport); // pass passport for configuration

mongoose.connect(config.db, function(err){
  if(err) throw err;
  console.log('successfully connected to Mongo db');
});

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressSession(
  {
    secret: config.secret,
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  }
));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// routes ======================================================================
require('./routes/passport.js')(app, passport); // load our routes and pass in our app and fully configured passport
//app.use(restrict);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});


// production error handler
/*
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
*/

module.exports = app;
