(function() {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope','$rootScope','$location','userService'];

    function LoginController($scope,$rootScope,$location,userService) {

      $scope.activateCreateForm = function($event){
        $event.preventDefault();
        $scope.create_form = true;
      };

      $scope.deactivateCreateForm = function($event){
        $event.preventDefault();
        $scope.create_form = false;
      };

      $scope.activateRecoverForm = function($event){
        $event.preventDefault();
        $scope.recover_form = true;
      };

      $scope.login = function(user){

        userService.loginUser(user)
          .then(function(data) {

            if(data.user){
              //user id
              console.log(data.user.id);
              $location.path('/settings');
            }

            if(data.error){
              switch (data.error.id) {
                case 10:
                  $scope.login_error = 'Wrong credentials';
                  break;
                default:
                  $scope.login_error = 'Unknown error';
              }
            }

        });
      };

      $scope.create = function(user){

        userService.createUser(user)
          .then(function(data) {

            if(data.user){
              //user id
              console.log(data.user.id);
              $location.path('/settings');

            }

            if(data.error){
              switch(data.error.id) {
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
            }

        });
      };


      $scope.recover = function(user){
        userService.recoverUser(user)
          .then(function(data) {
            $scope.success_alert = 'Successfully reset email sent';
            $scope.recover_error = null;
            console.log(data);
            if(data.error){
              console.log(data);
              switch(data.error.id) {
                case 3:
                  $scope.recover_error = 'Please enter correct email';
                  break;
                case 20:
                  $scope.recover_error = 'No such email found';
                  break;
                default:
                  $scope.recover_error = 'Unknown error';
              }
            }

        });
      };

    } // LoginController end
}());
