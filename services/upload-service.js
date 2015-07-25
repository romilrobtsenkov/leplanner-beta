var config = require('../config/config');
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
  return next({id: 22, message: 'Unsupported file type'}); }

  //var extension = file.name.substr(file.name.lastIndexOf('.'),file.name.length);
  var new_file_name = req.body.user._id+".jpg";
  //console.log(file);


  // check if file exists - delete
  fs.exists(config.profile_image_upload_path+new_file_name, function(exists) {
    if (exists) {
      fs.unlink(config.profile_image_upload_path+new_file_name, function (err) {
        if (err) return next(err);
        //console.log('deleted previous');
        saveAndResizeNewImage();
      });
    }else{
      saveAndResizeNewImage();
    }
  });

  function saveAndResizeNewImage(){

    lwip.open(file.path, function(err, image){
      if (err) return next(err);

      if(image.width() < 400 || image.height() < 400){
        return next({id: 23, message: 'Upload larger image'});
      }

      image.crop(400,400, function(err, image){
        if (err) return next(err);
        //console.log('resize complete');
        image.toBuffer('jpg', function(err, buffer){
          if (err) return next(err);
          //console.log('buffer complete');
          image.writeFile(config.profile_image_upload_path+new_file_name, function(err){
            if (err) return next(err);
            //console.log('save complete '+config.profile_image_upload_path+new_file_name);

            //save to user data --> that user has profile pic !url?

            next(null, 'upload successful');
          });
        });
      });

    });

  }

};
