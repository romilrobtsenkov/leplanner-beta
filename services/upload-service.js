var config = require('../config/config');
var User = require('../models/user').User;
var fs = require('fs');
var lwip = require('lwip');

exports.uploadProfileImage = function(req, next) {
  var file = req.files.file;
  if(file.size > 1000000){ return next({id: 20, message: 'File too large'}); }
  if(file.type.toLowerCase() != 'image/jpeg' &&
     file.type.toLowerCase() != 'image/jpg' &&
     file.type.toLowerCase() != 'image/png'
    ){
    //console.log(file.type.toLowerCase());
    return next({id: 22, message: 'Unsupported file type'});
  }

  var new_full_image_url = config.profile_image_upload_path+req.body.user._id+".jpg";
  var new_image_thumb_url = config.profile_image_upload_path+req.body.user._id+"_thumb.jpg";

  checkAndDeletePreviousFullImage();

  function checkAndDeletePreviousFullImage(){
    fs.exists(new_full_image_url, function(exists) {
      if (exists) {
        fs.unlink(new_full_image_url, function (err) {
          if (err) return next(err);
          //console.log('deleted previous');
          checkAndDeletePreviousThumbnail();
        });
      }else{
        checkAndDeletePreviousThumbnail();
      }
    });
  }

  function checkAndDeletePreviousThumbnail(){
    fs.exists(new_image_thumb_url, function(exists) {
      if (exists) {
        fs.unlink(new_image_thumb_url, function (err) {
          if (err) return next(err);
          //console.log('deleted previous');
          saveAndResizeNewImage();
        });
      }else{
        saveAndResizeNewImage();
      }
    });
  }

  function saveAndResizeNewImage(){

    lwip.open(file.path, function(err, image){
      if (err) return next(err);

      if(image.width() < 400 || image.height() < 400){
        return next({id: 23, message: 'Upload larger image'});
      }

      image.cover(400,400, function(err, image){
        if (err) return next(err);
        //console.log('resize complete');
        image.toBuffer('jpg', function(err, buffer){
          if (err) return next(err);
          //console.log('buffer complete');
          image.writeFile(new_full_image_url, function(err){
            if (err) return next(err);
            //console.log('save complete '+config.profile_image_upload_path+new_file_name);
            image.cover(72,72, function(err, image){
              if (err) return next(err);
              //console.log('resize complete');
              image.writeFile(new_image_thumb_url, function(err){
                if (err) return next(err);
                  //console.log('save complete '+config.profile_image_upload_path+new_file_name);
                  saveImageToDatabase({image: req.body.user._id+".jpg", image_thumb: req.body.user._id+"_thumb.jpg"});
              });
            });
          });
        });
      });

    });

  }

  function saveImageToDatabase(update){

    update.last_modified = new Date();

    var query = {"_id": req.body.user._id};
    var options = {new: true};
    User.findOneAndUpdate(query, update, options, function(err, user) {
      if (err) { return next(err); }
      if(user){
        next(null, 'upload and save successful');
      }else{
        next({error: 'no such user'});
      }
    });

  }

};
