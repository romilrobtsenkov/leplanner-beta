(function() {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope','$rootScope','$location','$timeout','userService'];

    function LoginController($scope,$rootScope,$location,$timeout,userService) {

      $rootScope.title = ' Login | Leplanner beta';

      $scope.activateCreateForm = function($event){
        $event.preventDefault();
        $scope.create_form = true;
        $scope.reset_form = false;
      };

      $scope.deactivateCreateForm = function($event){
        $event.preventDefault();
        $scope.create_form = false;
      };

      $scope.activateResetForm = function($event){
        $event.preventDefault();
        $scope.reset_form = true;
        $scope.create_form = false;
      };

      $scope.deactivateResetForm = function($event){
        $event.preventDefault();
        $scope.reset_form = false;
      };

      $scope.login = function(user){

        userService.loginUser(user)
          .then(function(data) {

            if(data.user){
              //user id
              //console.log(data.user.id);
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
                  $scope.login_error = 'Wrong credentials';
                  break;
                default:
                  $scope.login_error = 'Unknown error';
              }
              $timeout(function() { $scope.login_error = null; }, 2000);
            }

        });
      };

      $scope.create = function(user){

        userService.createUser(user)
          .then(function(data) {
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


      $scope.reset = function(user){
        userService.sendResetUserToken(user)
          .then(function(data) {

            if(data.success){
              $scope.success_alert = 'Successfully reset email sent';
              $scope.reset_error = null;
              $timeout(function() { $scope.success_alert = null; }, 2000);
            }

            if(data.error){
              console.log(data);
              switch(data.error.id) {
                case 3:
                  $scope.reset_error = 'Please enter correct email';
                  break;
                case 20:
                  $scope.reset_error = 'No such email found';
                  break;
                default:
                  $scope.reset_error = 'Unknown error';
              }
              $timeout(function() { $scope.reset_error = null; }, 2000);
            }

        });
      };

    } // LoginController end
}());
