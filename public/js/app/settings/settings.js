(function() {
  'use strict';

  angular
    .module('app')
    .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['$scope','$rootScope','$location','$timeout','userService','Upload'];

    function SettingsController($scope,$rootScope,$location,$timeout,userService,Upload) {
      //console.log($rootScope.user);

      $scope.user = $rootScope.user;

      function fillUpdateProfileForm() {
        $scope.user.new_first_name = $scope.user.first_name;
        $scope.user.new_last_name = $scope.user.last_name;
        $scope.user.new_email = $scope.user.email;
        $scope.user.new_organization = $scope.user.organization;
      }

      fillUpdateProfileForm($scope.user);

      $scope.updateProfile = function(user){

        if($scope.user.new_first_name != $scope.user.first_name ||
           $scope.user.new_last_name != $scope.user.last_name ||
           $scope.user.new_email != $scope.user.email ||
           $scope.user.new_organization != $scope.user.organization
          ){

            userService.updateUserProfile({user: $scope.user})
              .then(function(data) {
                //console.log(data);
                if(data.user){
                  $rootScope.user = data.user;
                  $scope.user = $rootScope.user;
                  fillUpdateProfileForm();
                  $scope.updateProfile_success = 'Update successful';
                  $scope.updateProfile_error = null;
                  $timeout(function() { $scope.updateProfile_success = null; }, 2000);
                }

                if(data.error){
                  switch(data.error.id) {
                    case 100:
                      // user changed
                      $location.path('/');
                      break;
                    case 0:
                      $scope.updateProfile_error = 'Please enter your first name';
                      break;
                    case 1:
                      $scope.updateProfile_error = 'Please enter your last name';
                      break;
                    case 2:
                      $scope.updateProfile_error = 'Please enter yout email';
                      break;
                    case 3:
                      $scope.updateProfile_error = 'Please enter correct email';
                      break;
                    case 6:
                      $scope.updateProfile_error = 'That email is already in use';
                      break;
                    case 7:
                      $scope.updateProfile_error = 'Please enter password to confirm email change!';
                      break;
                    case 10:
                      $scope.updateProfile_error = 'Wrong password!';
                      break;
                    default:
                      $scope.updateProfile_error = 'Unknown error';
                  }
                  $timeout(function() { $scope.updateProfile_error = null; }, 2000);
                }

            });

        }else{
          $scope.updateProfile_error = 'No profile data modified';
          $timeout(function() { $scope.updateProfile_error = null; }, 2000);
        }
      };

      $scope.updatePassword = function(user){

        if(typeof user.password != 'undefined' &&
           typeof user.new_password != 'undefined' &&
           typeof user.new_password_twice != 'undefined'
          ){
            if(user.new_password == user.new_password_twice){

              userService.updateUserPassword({user: user})
                .then(function(data) {
                  console.log(data);
                  if(data.user){
                    $scope.updatePassword_success = 'Update successful';
                    $scope.updatePassword_error = null;
                    user.password = undefined;
                    user.new_password = undefined;
                    user.new_password_twice = undefined;
                    $timeout(function() { $scope.updatePassword_success = null; }, 2000);
                  }

                  if(data.error){
                    switch(data.error.id) {
                      case 100:
                        // user changed
                        $location.path('/');
                        break;
                      case 5:
                        $scope.updatePassword_error = 'Password has to be min 8 chars long';
                        break;
                      case 7:
                        $scope.updatePassword_error = 'Please enter all fields';
                        break;
                      case 8:
                        $scope.updatePassword_error = 'New password has to be different from old one';
                        break;
                      case 9:
                        $scope.updatePassword_error = 'New passwords dont match';
                        break;
                      case 10:
                        $scope.updatePassword_error = 'Wrong password';
                        break;
                      default:
                        $scope.updatePassword_error = 'Unknown error';
                    }
                    $timeout(function() { $scope.updatePassword_error = null; }, 2000);
                  }

              });

            }else{
              $scope.updatePassword_error = 'New passwords dont match';
              $timeout(function() { $scope.updatePassword_error = null; }, 2000);
            }

        }else{
          $scope.updatePassword_error = 'All fields are required';
          $timeout(function() { $scope.updatePassword_error = null; }, 2000);
        }
      };

      $scope.uploadPicture = function(files){
        if (files && files.length) {

          var file = files[0];
          //console.log(file);
          var user_for_restrict_check = {};
          user_for_restrict_check._id = $rootScope.user._id;
          Upload.upload({
              url: 'api/upload/profile-image',
              fields: {
                  user: user_for_restrict_check
              },
              sendFieldsAs: "form",
              file: file
          }).progress(function (evt) {
              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
              $scope.progress_percentage = progressPercentage+ '% ';
              //console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
          }).success(function (data, status, headers, config) {

              if(data.success){
                //console.log('success');
                $scope.upload_success = 'Upload successful';
                $scope.progress_percentage = null;
                $timeout(function() { $scope.upload_success = null; }, 2000);
              }

              if(data.error){
                switch(data.error.id) {
                  case 100:
                    // user changed
                    $location.path('/');
                    break;
                  case 20:
                    $scope.upload_error = 'File too large';
                    break;
                  case 22:
                    $scope.upload_error = 'Unsupported file type';
                    break;
                  case 23:
                    $scope.upload_error = 'Upload larger image than 400px x 400px';
                    break;

                }
                $scope.progress_percentage = null;
                $timeout(function() { $scope.upload_error = null; }, 2000);
              }

          }).error(function (data, status, headers, config) {
            $scope.progress_percentage = null;
            $scope.upload_error = 'Unknown error!';
            $timeout(function() { $scope.upload_error = null; }, 2000);
          });

        }
      };

    } // SettingsController end
}());
