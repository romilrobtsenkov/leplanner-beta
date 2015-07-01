(function() {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope','$location','api'];

    function LoginController($scope,$location,api) {

      // check for login?

      $scope.login = function(user){
        api.loginUser(user)
          .then(function(data) {

            if(data.error){
              // TODO get errors by id
              $scope.login_error = 'login failed';
            }

          });
      };

      $scope.activateCreateForm = function($event){
        $event.preventDefault();
        $scope.create_form = true;
      };

      $scope.create = function(user){
        api.createUser(user)
          .then(function(data) {

            if(data.error){
              // TODO get errors by id
              console.log(data.error);
              if(data.error.errors && data.error.errors.email.message == 'That email is already in use'){
                $scope.create_error = 'That email is already in use';
              }else{
                $scope.create_error = 'unknown error';
              }

            }

        });
      };

    }
}());
