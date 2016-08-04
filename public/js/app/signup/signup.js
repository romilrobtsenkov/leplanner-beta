(function() {
    'use strict';

    angular
    .module('app')
    .controller('SignUpController', ['$scope','$rootScope','$location','$timeout','requestService','$translate','$window',
    function($scope,$rootScope,$location,$timeout,requestService,$translate,$window) {

        $translate('PAGE.SIGN_UP').then(function (t) {
            $rootScope.title = t+' | Leplanner beta';

            /* ANALYTICS */
            $window.ga('send', 'pageview', {
                'page': $location.path(),
                'title': $rootScope.title
            });
        });

        $scope.create = function(user){

            var error = true;
            //validate
            if(!user.new_first_name) {
                $translate('NOTICE.PLEASE_ENTER_FIRST_NAME').then(function (t) {
                    $scope.create_error = t;
                });
            } else if (!user.new_last_name) {
                $translate('NOTICE.PLEASE_ENTER_LAST_NAME').then(function (t) {
                    $scope.create_error = t;
                });
            } else if (!user.new_email){
                $translate('NOTICE.PLEASE_ENTER_EMAIL').then(function (t) {
                    $scope.create_error = t;
                });
            } else if (!user.new_password){
                $translate('NOTICE.PLEASE_ENTER_PASSWORD').then(function (t) {
                    $scope.create_error = t;
                });
            } else if (user.new_password.length < 8){
                $translate('NOTICE.PASSWORD_MIN_LENGTH').then(function (t) {
                    $scope.create_error = t;
                });
            } else {
                error = false;
            }

            if (error) {
                $timeout(function() { $scope.create_error = null; }, 2000);
                return;
            }

            $scope.creating_in_progress = true;

            requestService.post('/users', user)
            .then(function(data) {

                $scope.creating_in_progress = undefined;

                //user id
                if($rootScope.navigatedToLoginFrom){
                    $location.path($rootScope.navigatedToLoginFrom);
                    $rootScope.navigatedToLoginFrom = undefined;
                }else{
                    $location.path('/dashboard');
                }

            })
            .catch(function (error) {
                console.log(error);

                switch (error.data) {
                    case 'invalid email':
                        $translate('NOTICE.PLEASE_ENTER_CORRECT_EMAIL').then(function (t) {
                            $scope.create_error = t;
                        });
                        break;
                    case 'email exists':
                        $translate('NOTICE.EMAIL_IN_USE').then(function (t) {
                            $scope.create_error = t;
                        });
                        break;
                    case 'password too short':
                        $translate('NOTICE.PASSWORD_MIN_LENGTH').then(function (t) {
                            $scope.create_error = t;
                        });
                        break;
                    default:
                        $translate('NOTICE.UNKNOWN').then(function (t) {
                            $scope.create_error = t;
                        });
                }

                $scope.creating_in_progress = undefined;
                $timeout(function() { $scope.create_error = null; }, 2000);

            });
        };

    }]); // LoginController end
}());
