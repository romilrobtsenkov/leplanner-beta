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

        $scope.login_in_process = true;
        if(!user){
            user = {};
        }
		user.new_beta_code = 'tallinnaülikool';
        requestService.post('/user/login', {email: user.email, password: user.password, remember_me: user.remember_me})
          .then(function(data) {

            $scope.login_in_process = undefined;

            if(data.user){
              //user id

              //set or get language
              if(data.user.lang){
                  //console.log(data.user.lang + ' lang loaded from user data');
                  $translate.use(data.user.lang);
              }else{
                  $scope.setLanguage(); //located in Main, saves lang to user
              }

              if(typeof $rootScope.navigatedToLoginFrom !== 'undefined'){
                $location.path($rootScope.navigatedToLoginFrom);
                $rootScope.navigatedToLoginFrom = undefined;
              }else{
                if(typeof $rootScope.navigatedToLoginFrom !== 'undefined'){
                  $location.path($rootScope.navigatedToLoginFrom);
                  $rootScope.navigatedToLoginFrom = undefined;
                }else{
                  $location.path('/dashboard');
                }
              }
            }

            if(data.error){
              switch (data.error.id) {
                case 10:
                  //$scope.login_error = 'Wrong credentials';
                  $translate('NOTICE.WRONG_CREDENTIALS').then(function (t) {
                      $scope.login_error = t;
                  });
                  break;
                default:
                    //$scope.login_error = 'Unknown error';
                    $translate('NOTICE.UNKNOWN').then(function (t) {
                        $scope.login_error = t;
                    });
              }
              $timeout(function() { $scope.login_error = null; }, 2000);
            }

        });
      };

      $scope.reset = function(user){

        $scope.sending_in_progress = true;

        requestService.post('/user/send-reset-token', user)
          .then(function(data) {

            $scope.sending_in_progress = undefined;

            if(data.success){
              //$scope.success_alert = 'Successfully reset email sent';
              $translate('NOTICE.SUCCESS_EMAIL_SENT').then(function (t) {
                  $scope.success_alert = t;
              });
              $scope.reset_error = null;
              $timeout(function() { $scope.success_alert = null; }, 2000);
            }

            if(data.error){
              console.log(data);
              switch(data.error.id) {
                case 3:
                  //$scope.reset_error = 'Please enter correct email';
                  $translate('NOTICE.PLEASE_ENTER_CORRECT_EMAIL').then(function (t) {
                      $scope.reset_error = t;
                  });
                  break;
                case 20:
                  //$scope.reset_error = 'No such email found';
                  $translate('NOTICE.NO_SUCH_EMAIL').then(function (t) {
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
      };

  }]); // LoginController end
}());
