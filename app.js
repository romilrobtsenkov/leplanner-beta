var express = require('express');
var path = require('path');
var logger = require('morgan');
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

var passportConfig = require('./auth/passport-config');
passportConfig();
var restrict = require('./auth/restrict');

mongoose.connect(config.db);

var app = express();


if(app.get('env') == 'development'){
  app.use(logger('dev'));
}else{
  app.use(logger('combined'));
}

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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
app.use(function(err, req, res, next) {
    if(app.get('env') == 'development'){
      console.log(err.message);
    }else{
      err = {};
    }

    res.status(err.status || 500).
    json({
        status: err.status || 500,
        message: err.message,
        error: err
    });
});

// https://strongloop.com/strongblog/robust-node-applications-error-handling/
if (app.get('env') === 'production') {
  process.on('uncaughtException', function (err) {
    console.error(err.stack);

    var transport = nodemailer.createTransport();

    transport.sendMail({
      from: config.email,
      to: config.developer_email,
      subject: '[LePlanner beta][uncaughtException] '+err.message,
      text: err.stack
    }, function (err) {
       if (err) console.error(err);
       console.log('Email sent to developer about error');
       process.exit(1);
    });

  });
}

module.exports = app;
