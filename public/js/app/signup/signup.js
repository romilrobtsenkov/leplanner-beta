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
                  $scope.create_error = 'Please enter your first name';
                  break;
                case 1:
                  $scope.create_error = 'Please enter your last name';
                  break;
                case 2:
                  $scope.create_error = 'Please enter yout email';
                  break;
                case 3:
                  $scope.create_error = 'Please enter correct email';
                  break;
                case 4:
                  $scope.create_error = 'Please enter your password';
                  break;
                case 5:
                  $scope.create_error = 'Password has to be min 8 chars long';
                  break;
                case 6:
                  $scope.create_error = 'That email is already in use';
                  break;
                default:
                  $scope.create_error = 'Unknown error';
              }
              $timeout(function() { $scope.create_error = null; }, 2000);
            }

        });
      };

  }]); // LoginController end
}());
