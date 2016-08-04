const express = require('express');
const router = express.Router();
const restrict = require('../auth/restrict');
const multiparty = require('connect-multiparty');
const multipartyMiddleware = multiparty();

const config = require('../config/config');
const User = require('../models/user').User;
const Promise = require('bluebird');

const fs = require('fs');
Promise.promisifyAll(fs);

const lwip = require('lwip');
Promise.promisifyAll(lwip);
Promise.promisifyAll(require('lwip/lib/Image').prototype);
Promise.promisifyAll(require('lwip/lib/Batch').prototype);

const mongoService = require('../services/mongo-service');

const E = require('../errors');
const log = require('../logger');

router.post('/profile-image/',multipartyMiddleware , restrict, function(req, res) {

    var file = req.files.file;

    // 5mb
    if(file.size > 5000000){ return res.status(400).send('file too large'); }

    if(file.type.toLowerCase() !== 'image/jpeg' &&
        file.type.toLowerCase() !== 'image/jpg' &&
        file.type.toLowerCase() !== 'image/png'){
        //log.error(file.type.toLowerCase());
        return res.status(400).send('unsupported file type');
    }

    var new_full_image_url = config.profile_image_upload_path+req.body.user._id+".jpg";
    var new_image_thumb_url = config.profile_image_upload_path+req.body.user._id+"_thumb.jpg";
    var image;

    lwip.openAsync(file.path)
    .then(function (img) {

        image = img;

        if(image.width() < 400 || image.height() < 400){
            return Promise.reject(new E.Error('upload larger image'));
        }

        // full image
        return image.batch()
                .cover(400, 400)
                .writeFileAsync(new_full_image_url + '_temp', 'jpg');
    })
    .then(function (img) {

        //thumbnail
        return image.batch()
                .cover(72, 72)
                .writeFileAsync(new_image_thumb_url + '_temp', 'jpg');
    })
    .then(function () {

        //rename uploaded files
        return [fs.renameAsync(new_full_image_url + '_temp', new_full_image_url),
                fs.renameAsync(new_image_thumb_url + '_temp', new_image_thumb_url)];
    })
    .then(function () {

        // delete temp file
        return fs.statAsync(file.path)
                    .then(function (exist) {
                        return fs.unlinkAsync(file.path);
                    });
    })
    .then(function () {

        var q = {};
        q.where = {_id: req.body.user._id};
        q.update = {
            image: req.body.user._id+".jpg",
            image_thumb: req.body.user._id+"_thumb.jpg",
            last_modified: new Date()
        };

        return mongoService.update(q, User);
    })
    .then(function (user) {

        if(!user){ return Promise.reject(); }

        return res.sendStatus(200);
    })
    .catch(E.Error, function (err) {
        return res.status(err.statusCode).send(err.message);
    })
    .catch(function (error) {
        log.error(error);
        return res.status(500).send('could not upload profile picture');
    });
});

module.exports = router;
