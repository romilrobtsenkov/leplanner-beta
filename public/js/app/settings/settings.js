(function() {
    'use strict';

    angular
    .module('app')
    .controller('SettingsController', ['$scope','$rootScope','$location','$timeout','requestService','Upload','$translate','$window',
    function($scope,$rootScope,$location,$timeout,requestService,Upload,$translate,$window) {

        $translate('PAGE.SETTINGS').then(function (t) {
            $rootScope.title = t+' | Leplanner beta';

            /* ANALYTICS */
            $window.ga('send', 'pageview', {
                'page': $location.path(),
                'title': $rootScope.title
            });
        });

        $scope.user = $rootScope.user;
        $scope.user.profile_image ="./images/user/"+$scope.user._id+".jpg";

        // INIT
        fillUpdateProfileForm($scope.user);

        function fillUpdateProfileForm() {
            $scope.user.new_first_name = $scope.user.first_name;
            $scope.user.new_last_name = $scope.user.last_name;
            $scope.user.new_email = $scope.user.email;
            $scope.user.new_organization = $scope.user.organization;
        }

        /* Fixed */
        $scope.updateProfile = function(user){

            var error = true;

            if(!$scope.user.new_first_name) {
                $translate('NOTICE.PLEASE_ENTER_FIRST_NAME').then(function (t) {
                    $scope.updateProfile_error = t;
                });
            } else if (!$scope.user.new_last_name) {
                $translate('NOTICE.PLEASE_ENTER_LAST_NAME').then(function (t) {
                    $scope.updateProfile_error = t;
                });
            } else if (!$scope.user.new_email) {
                $translate('NOTICE.PLEASE_ENTER_EMAIL').then(function (t) {
                    $scope.updateProfile_error = t;
                });
            } else {
                error = false;
            }

            if (error) {
                $timeout(function() { $scope.updateProfile_error = null; }, 2000);
                return;
            }

            if($scope.user.new_first_name === $scope.user.first_name &&
                $scope.user.new_last_name === $scope.user.last_name &&
                $scope.user.new_email === $scope.user.email &&
                $scope.user.new_organization === $scope.user.organization ){

                $translate('NOTICE.NO_DATA_MODIFIED').then(function (t) {
                    $scope.updateProfile_error = t;
                });
                $timeout(function() { $scope.updateProfile_error = null; }, 2000);

                return;
            }

            $scope.updating_in_progress = true;

            requestService.post('/users/update', {user: $scope.user})
            .then(function(data) {

                $scope.updating_in_progress = undefined;

                console.log(data);

                $rootScope.user = data.user;
                $scope.user = $rootScope.user;

                fillUpdateProfileForm();

                $translate('NOTICE.UPDATE_SUCCESS').then(function (t) {
                    $scope.updateProfile_success = t;
                });

                $scope.updateProfile_error = null;
                $timeout(function() { $scope.updateProfile_success = null; }, 2000);
            })
            .catch(function (error) {
                console.log(error);
                $scope.updating_in_progress = undefined;

                switch (error.data ) {
                    case 'no changes':
                        $translate('NOTICE.NO_DATA_MODIFIED').then(function (t) {
                            $scope.updateProfile_error = t;
                        });
                        break;
                    case 'invalid email':
                        $translate('NOTICE.PLEASE_ENTER_CORRECT_EMAIL').then(function (t) {
                            $scope.updateProfile_error = t;
                        });
                        break;
                    case 'no password':
                        $translate('NOTICE.ENTER_PASSWORD_TO_CONFIRM').then(function (t) {
                            $scope.updateProfile_error = t;
                        });
                        break;
                    case 'email exists':
                        $translate('NOTICE.EMAIL_IN_USE').then(function (t) {
                            $scope.updateProfile_error = t;
                        });
                        break;
                    case 'wrong password':
                        $translate('NOTICE.WRONG_PASSWORD').then(function (t) {
                            $scope.updateProfile_error = t;
                        });
                        break;
                    default:
                        $translate('NOTICE.UNKNOWN').then(function (t) {
                            $scope.updateProfile_error = t;
                        });
                }

                $timeout(function() { $scope.updateProfile_error = null; }, 2000);
            });
        };

        /* Fixed */
        $scope.updatePassword = function(user){

            if(!user.password ||
                !user.new_password ||
                !user.new_password_twice){

                $translate('NOTICE.ENTER_ALL').then(function (t) {
                    $scope.updatePassword_error = t;
                });
                $timeout(function() { $scope.updatePassword_error = null; }, 2000);
                return;
            }

            if(user.new_password.length < 8) {
                $translate('NOTICE.PASSWORD_MIN_LENGTH').then(function (t) {
                    $scope.updatePassword_error = t;
                });
                $timeout(function() { $scope.updatePassword_error = null; }, 2000);
                return;
            }

            if(user.new_password === user.password) {
                $translate('NOTICE.NEW_PASSWORD_DIFFERENT').then(function (t) {
                    $scope.updatePassword_error = t;
                });
                $timeout(function() { $scope.updatePassword_error = null; }, 2000);
                return;
            }

            if(user.new_password !== user.new_password_twice){
                $translate('NOTICE.NEW_PASSWORDS_DONT_MATCH').then(function (t) {
                    $scope.updatePassword_error = t;
                });
                $timeout(function() { $scope.updatePassword_error = null; }, 2000);
                return;
            }

            $scope.updating_in_progress = true;

            requestService.post('/users/update-password', {user: user})
            .then(function(data) {

                $scope.updating_in_progress = undefined;

                console.log(data);

                $translate('NOTICE.UPDATE_SUCCESS').then(function (t) {
                    $scope.updatePassword_success = t;
                });
                $scope.updatePassword_error = null;
                user.password = undefined;
                user.new_password = undefined;
                user.new_password_twice = undefined;
                $timeout(function() { $scope.updatePassword_success = null; }, 2000);
            })
            .catch(function (error) {
                console.log(error);
                $scope.updating_in_progress = undefined;

                if (error.data === 'wrong password') {
                    $translate('NOTICE.WRONG_PASSWORD').then(function (t) {
                        $scope.updatePassword_error = t;
                    });
                } else {
                    $translate('NOTICE.UNKNOWN').then(function (t) {
                        $scope.updatePassword_error = t;
                    });
                }

                $timeout(function() { $scope.updatePassword_error = null; }, 2000);
            });
        };

        /* Fixed */
        $scope.uploadPicture = function(files){


            if (!files || !files.length) { return; }

            var file = files[0];

            // larger than 5mb
            if (file.size > 5000000) {
                $translate('NOTICE.FILE_TO_LARGE').then(function (t) {
                    $scope.upload_error = t;
                });
                $scope.progress_percentage = null;
                $timeout(function() { $scope.upload_error = null; }, 2000);
                return;
            }

            // wrong type
            if(file.type.toLowerCase() !== 'image/jpeg' &&
                file.type.toLowerCase() !== 'image/jpg' &&
                file.type.toLowerCase() !== 'image/png'){
                $translate('NOTICE.WRONG_FILE_TYPE').then(function (t) {
                    $scope.upload_error = t;
                });
                $scope.progress_percentage = null;
                $timeout(function() { $scope.upload_error = null; }, 2000);
                return;
            }

            var user = {
                _id: $rootScope.user._id
            };

            Upload.upload({
                url: 'api/upload/profile-image',
                fields: { user: user },
                sendFieldsAs: 'form',
                file: file
            })
            .then(function (resp) {
                var last_modified = new Date();
                $scope.user.profile_image ="./images/user/"+$scope.user._id+".jpg?last_modified="+last_modified;

                //console.log(last_modified);
                // update rootScope to change user profile_image everywhere
                $rootScope.user.image = $scope.user._id+".jpg?last_modified="+last_modified;
                $rootScope.user.image_thumb = $scope.user._id+"_thumb.jpg?last_modified="+last_modified;

                //$scope.upload_success = 'Upload successful';
                $translate('NOTICE.UPLOAD_SUCCESS').then(function (t) {
                    $scope.upload_success = t;
                });
                $scope.progress_percentage = null;
                $timeout(function() { $scope.upload_success = null; }, 2000);

            }, function (error) {

                switch(error.data) {
                    case 'unsupported file type':
                        $translate('NOTICE.WRONG_FILE_TYPE').then(function (t) {
                            $scope.upload_error = t;
                        });
                        break;
                    case 'file too large':
                        $translate('NOTICE.FILE_TO_LARGE').then(function (t) {
                            $scope.upload_error = t;
                        });
                        break;
                    case 'upload larger image':
                        $translate('NOTICE.UPLOAD_LARGER_IMAGE').then(function (t) {
                            $scope.upload_error = t+' 400px x 400px';
                        });
                        break;
                    default:
                        $translate('NOTICE.UNKNOWN').then(function (t) {
                            $scope.upload_error = t;
                        });
                }
                $scope.progress_percentage = null;
                $timeout(function() { $scope.upload_error = null; }, 2000);

            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                $scope.progress_percentage = progressPercentage+ '% ';
            });

        };

    }]); // SettingsController end
}());
