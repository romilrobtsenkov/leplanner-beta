var express = require('express');
var path = require('path');

var log = require('./logger');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var expressSession = require('express-session');
var connectMongo = require('connect-mongo');
var MongoStore = connectMongo(expressSession);
var nodemailer = require('nodemailer');

var config = require('./config/config');

var user = require('./routes/user');
var scenario = require('./routes/scenario');
var upload = require('./routes/upload');
var meta = require('./routes/meta');
var maintance = require('./routes/maintance');

//NEW
var comments = require('./routes/comments');
var favorites = require('./routes/favorites');
var materials = require('./routes/materials');
var scenarios = require('./routes/scenarios');

var passportConfig = require('./auth/passport-config');
passportConfig();
var restrict = require('./auth/restrict');

mongoose.connect(config.db);

var app = express();

app.use(log.middleWare());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var multipart = require('connect-multiparty');

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
app.use(passport.initialize());
app.use(passport.session());

app.use(multipart({
    uploadDir: config.profile_image_upload_temp_path
}));

app.use('/api/user', user);
app.use('/api/scenario', scenario);
app.use('/api/upload', upload);
app.use('/api/meta', meta);
app.use('/api/maintance', maintance);

// NEW
app.use('/api/comments', comments);
app.use('/api/favorites', favorites);
app.use('/api/materials', materials);
app.use('/api/scenarios', scenarios);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
app.use(function(err, req, res, next) {
    log.error(err.message);
    err = {};
    res.status(err.status || 500).
    json({
        status: err.status || 500,
        message: 'Unknown errror',
        error: err
    });
});

// https://strongloop.com/strongblog/robust-node-applications-error-handling/
if (config.errorMails) {

    var transport = nodemailer.createTransport();

    transport.sendMail({
      from: config.email,
      to: config.developer_email,
      subject: '[LePlanner beta] process restarted',
      text: 'leplanner restarted '+(new Date())
    }, function (err) {
       if (err) console.error(err);
       log.warning('Email sent to developer about restart');
    });

    process.on('uncaughtException', function (err) {
    log.error(err.stack);

    var transport = nodemailer.createTransport();

    transport.sendMail({
      from: config.email,
      to: config.developer_email,
      subject: '[LePlanner beta][uncaughtException] '+err.message,
      text: err.stack
    }, function (err) {
       if (err) console.error(err);
       log.warning('Email sent to developer about error');
       process.exit(1);
    });

  });
}

module.exports = app;
