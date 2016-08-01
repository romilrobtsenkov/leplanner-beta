(function() {
    'use strict';

    angular
    .module('app')
    .controller('ResetController', ['$scope','$location','$rootScope','$routeParams','$timeout','requestService','$translate','$window',
    function($scope,$location,$rootScope,$routeParams,$timeout,requestService,$translate,$window) {

        $translate('PAGE.PASSWORD_RESET').then(function (t) {
            $rootScope.title = t+' | Leplanner beta';

            /* ANALYTICS */
            $window.ga('send', 'pageview', {
                'page': $location.path(),
                'title': $rootScope.title
            });
        });


        $scope.reset = function(user){

            if(
                typeof user.new_password != 'undefined' &&
                typeof user.new_password_twice != 'undefined'
            ){
                if(user.new_password == user.new_password_twice){

                    // Save new password
                    user.token = $routeParams.token;

                    requestService.post('/user/reset-password', user)
                    .then(function(data) {
                        if(data.success){
                            $location.path('/login');
                        }

                        if(data.error){
                            switch(data.error.id) {
                                case 5:
                                //$scope.reset_error = 'Password has to be min 8 chars long';
                                $translate('NOTICE.PASSWORD_MIN_LENGTH').then(function (t) {
                                    $scope.reset_error = t;
                                });
                                break;
                                case 7:
                                //$scope.reset_error = 'Please enter all fields';
                                $translate('NOTICE.ENTER_ALL').then(function (t) {
                                    $scope.reset_error = t;
                                });
                                break;
                                case 9:
                                //$scope.reset_error = 'New passwords dont match';
                                $translate('NOTICE.NEW_PASSWORDS_DONT_MATCH').then(function (t) {
                                    $scope.reset_error = t;
                                });
                                break;
                                case 10:
                                //$scope.reset_error = 'Request new token';
                                $translate('NOTICE.REQUEST_NEW_TOKEN').then(function (t) {
                                    $scope.reset_error = t;
                                });
                                break;
                                case 11:
                                //$scope.reset_error = 'Token expired';
                                $translate('NOTICE.TOKEN_EXPIRED').then(function (t) {
                                    $scope.reset_error = t;
                                });
                                break;
                                default:
                                //$scope.reset_error = 'Unknown error';
                                $translate('NOTICE.UNKNOWN').then(function (t) {
                                    $scope.reset_error = t;
                                });
                            }
                            $timeout(function() { $scope.reset_error = null; }, 2000);
                        }

                    });

                }else{
                    //$scope.reset_error = 'New passwords dont match';
                    $translate('NOTICE.NEW_PASSWORDS_DONT_MATCH').then(function (t) {
                        $scope.reset_error = t;
                    });
                    $timeout(function() { $scope.reset_error = null; }, 2000);
                }

            }else{
                //$scope.reset_error = 'All fields are required';
                $translate('NOTICE.ENTER_ALL').then(function (t) {
                    $scope.reset_error = t;
                });
                $timeout(function() { $scope.reset_error = null; }, 2000);
            }

        };

    }]); // ResetController end
}());
