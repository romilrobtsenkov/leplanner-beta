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

        /* fixed */
        $scope.reset = function(user){

            //validate
            if(!user || !user.new_password || !user.new_password_twice){
                $translate('NOTICE.ENTER_ALL').then(function (t) {
                    $scope.reset_error = t;
                });
                $timeout(function() { $scope.reset_error = null; }, 2000);
                return;
            }

            if(user.new_password.length < 8){
                $translate('NOTICE.PASSWORD_MIN_LENGTH').then(function (t) {
                    $scope.reset_error = t;
                });
                $timeout(function() { $scope.reset_error = null; }, 2000);
                return;
            }

            if(user.new_password !== user.new_password_twice){
                $translate('NOTICE.NEW_PASSWORDS_DONT_MATCH').then(function (t) {
                    $scope.reset_error = t;
                });
                $timeout(function() { $scope.reset_error = null; }, 2000);
                return;
            }

            // Save new password
            user.token = $routeParams.token;

            requestService.post('/users/reset-password', user)
            .then(function(data) {

                $location.path('/login');
            })
            .catch(function (error) {
                console.log(error);
                if (error.data === 'token expired') {
                    $translate('NOTICE.TOKEN_EXPIRED').then(function (t) {
                        $scope.reset_error = t;
                    });
                } else if (error.data === 'token not valid') {
                    $translate('NOTICE.REQUEST_NEW_TOKEN').then(function (t) {
                        $scope.reset_error = t;
                    });
                } else {
                    $translate('NOTICE.UNKNOWN').then(function (t) {
                        $scope.reset_error = t;
                    });
                }

                $timeout(function() { $scope.reset_error = null; }, 2000);
            });
        };

    }]); // ResetController end
}());
