(function() {
    'use strict';

    angular
    .module('app')
    .controller('LoginController', ['$scope','$rootScope','$location','$timeout','requestService','$translate','$window',
    function($scope,$rootScope,$location,$timeout,requestService,$translate,$window) {

        $translate('PAGE.LOG_IN').then(function (t) {
            $rootScope.title = t+' | Leplanner beta';

            /* ANALYTICS */
            $window.ga('send', 'pageview', {
                'page': $location.path(),
                'title': $rootScope.title
            });
        });

        $scope.activateResetForm = function($event){
            $event.preventDefault();
            $scope.reset_form = true;
        };

        $scope.deactivateResetForm = function($event){
            $event.preventDefault();
            $scope.reset_form = false;
        };

        $scope.login = function(user){

            //validate
            if(!user || !user.email || !user.password || user.password.length < 8) {
                $translate('NOTICE.WRONG_CREDENTIALS').then(function (t) {
                    $scope.login_error = t;
                });
                $timeout(function() { $scope.login_error = null; }, 2000);
                return;
            }

            var query = {
                email: user.email,
                password: user.password,
                remember_me: user.remember_me
            };

            $scope.login_in_process = true;

            requestService.post('/users/login', query)
            .then(function(data) {

                $scope.login_in_process = undefined;

                //set or get language
                if(data.user.lang){
                    //console.log(data.user.lang + ' lang loaded from user data');
                    $translate.use(data.user.lang);
                }else{
                    $scope.setLanguage(); //located in Main, saves lang to user
                }

                if($rootScope.navigatedToLoginFrom){
                    $location.path($rootScope.navigatedToLoginFrom);
                    $rootScope.navigatedToLoginFrom = undefined;
                }else{
                    $location.path('/dashboard');
                }

            })
            .catch(function (error) {
                $scope.login_in_process = undefined;

                console.log(error);
                if(error.data === 'Wrong credentials'){
                    $translate('NOTICE.WRONG_CREDENTIALS').then(function (t) {
                        $scope.login_error = t;
                    });
                }else{
                    $translate('NOTICE.UNKNOWN').then(function (t) {
                        $scope.login_error = t;
                    });
                }

                $timeout(function() { $scope.login_error = null; }, 2000);
            });
        };

        $scope.reset = function(user){

            if(!user || !user.reset_email) {
                $translate('NOTICE.PLEASE_ENTER_CORRECT_EMAIL').then(function (t) {
                    $scope.reset_error = t;
                });

                $timeout(function() { $scope.reset_error = null; }, 2000);

                return;
            }

            $scope.sending_in_progress = true;

            requestService.post('/users/send-reset-token', user)
            .then(function(data) {

                $scope.sending_in_progress = undefined;

                $translate('NOTICE.SUCCESS_EMAIL_SENT').then(function (t) {
                    $scope.success_alert = t;
                });
                $scope.reset_error = null;
                $timeout(function() { $scope.success_alert = null; }, 2000);
            })
            .catch(function (error) {

                console.log(error);

                $scope.sending_in_progress = undefined;

                switch (error.data) {
                    case 'invalid email':
                        $translate('NOTICE.PLEASE_ENTER_CORRECT_EMAIL').then(function (t) {
                            $scope.reset_error = t;
                        });
                        break;
                    case 'no such user':
                        $translate('NOTICE.NO_SUCH_EMAIL').then(function (t) {
                            $scope.reset_error = t;
                        });
                        break;
                    default:
                        $translate('NOTICE.UNKNOWN').then(function (t) {
                            $scope.reset_error = t;
                        });
                }

                $timeout(function() { $scope.reset_error = null; }, 2000);

            });
        };

    }]); // LoginController end
}());
