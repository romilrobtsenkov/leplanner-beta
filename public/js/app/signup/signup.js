(function() {
  'use strict';

  angular
    .module('app')
    .controller('SignUpController', ['$scope','$rootScope','$location','$timeout','requestService','$translate',
    function($scope,$rootScope,$location,$timeout,requestService,$translate) {

        $translate('PAGE.SIGN_UP').then(function (t) {
           $rootScope.title = t+' | Leplanner beta';
        });

      $scope.create = function(user){

        $scope.creating_in_progress = true;

        requestService.post('/user/create', user)
          .then(function(data) {

            $scope.creating_in_progress = undefined;

            console.log(data);
            if(data.user){
              //user id
              //console.log(data.user.id);
              if(typeof $rootScope.navigatedToLoginFrom !== 'undefined'){
                $location.path($rootScope.navigatedToLoginFrom);
                $rootScope.navigatedToLoginFrom = undefined;
              }else{
                $location.path('/dashboard');
              }

            }

            if(data.error){
              switch(data.error.id) {
                case 'beta':
                  $scope.create_error = 'Please enter required beta code';
                  break;
                case 'wrong_beta':
                  $scope.create_error = 'Wrong beta code!';
                  break;
                case 0:
                  //$scope.create_error = 'Please enter your first name';
                  $translate('NOTICE.PLEASE_ENTER_FIRST_NAME').then(function (t) {
                      $scope.create_error = t;
                  });
                  break;
                case 1:
                  //$scope.create_error = 'Please enter your last name';
                  $translate('NOTICE.PLEASE_ENTER_LAST_NAME').then(function (t) {
                      $scope.create_error = t;
                  });
                  break;
                case 2:
                  //$scope.create_error = 'Please enter yout email';
                  $translate('NOTICE.PLEASE_ENTER_EMAIL').then(function (t) {
                      $scope.create_error = t;
                  });
                  break;
                case 3:
                  //$scope.create_error = 'Please enter correct email';
                  $translate('NOTICE.PLEASE_ENTER_CORRECT_EMAIL').then(function (t) {
                      $scope.create_error = t;
                  });
                  break;
                case 4:
                  //$scope.create_error = 'Please enter your password';
                  $translate('NOTICE.PLEASE_ENTER_PASSWORD').then(function (t) {
                      $scope.create_error = t;
                  });
                  break;
                case 5:
                  //$scope.create_error = 'Password has to be min 8 chars long';
                  $translate('NOTICE.PASSWORD_MIN_LENGTH').then(function (t) {
                      $scope.create_error = t;
                  });
                  break;
                case 6:
                  //$scope.create_error = 'That email is already in use';
                  $translate('NOTICE.EMAIL_IN_USE').then(function (t) {
                      $scope.create_error = t;
                  });
                  break;
                default:
                  //$scope.create_error = 'Unknown error';
                  $translate('NOTICE.UNKNOWN').then(function (t) {
                      $scope.create_error = t;
                  });
              }
              $timeout(function() { $scope.create_error = null; }, 2000);
            }

        });
      };

  }]); // LoginController end
}());
