const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const MongoStore = connectMongo(expressSession);
const nodemailer = require('nodemailer');
const log = require('./logger');

const config = require('./config/config');

const comments = require('./routes/comments');
const favorites = require('./routes/favorites');
const followers = require('./routes/followers');
const materials = require('./routes/materials');
const meta = require('./routes/meta');
const scenarios = require('./routes/scenarios');
const upload = require('./routes/upload');
const users = require('./routes/users');

const passportConfig = require('./auth/passport-config');
passportConfig();
const restrict = require('./auth/restrict');

mongoose.connect(config.db);

var app = express();

app.use(log.middleWare());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const multipart = require('connect-multiparty');

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

app.use('/api/comments', comments);
app.use('/api/favorites', favorites);
app.use('/api/followers', followers);
app.use('/api/materials', materials);
app.use('/api/meta', meta);
app.use('/api/scenarios', scenarios);
app.use('/api/upload', upload);
app.use('/api/users', users);

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
        if (err) log.error(err);
        log.warning('Email sent to developer about restart');
        log.error('Email sent to developer about restart');
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
            if (err) log.error(err);
            log.warning('Email sent to developer about error');
            process.exit(1);
        });

    });
}

module.exports = app;
