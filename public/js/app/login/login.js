(function() {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope','api'];

    function LoginController($scope,api) {

      $scope.login = function(user){
        console.log(user.email,user.password);
        api.loginUser(user.email,user.password)
          .then(function(data) {
            console.log(data);
          });

      };

      $scope.activateCreateForm = function($event){
        $event.preventDefault();
        $scope.create = true;
      };



    }
}());
