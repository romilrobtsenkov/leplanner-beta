(function() {
  'use strict';

  angular
    .module('app')
    .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['$scope','$rootScope','$location','api'];

    function SettingsController($scope,$rootScope,$location,api) {

      console.log($rootScope.user);
      $scope.user = $rootScope.user;

      $scope.user.new_first_name = $scope.user.first_name;
      $scope.user.new_last_name = $scope.user.last_name;
      $scope.user.new_email = $scope.user.email;

      console.log($scope.user);

      $scope.logout = function(){
        api.logOutUser()
          .then(function(data){
            console.log(data);
            $scope.user = null;
            $rootScope.user = null;
            $location.path('/login');
          });
      };

      $scope.update = function(user){

        // TODO validate for empty fields

        api.loginUser(user)
          .then(function(data) {

            if(data.user){
              //user id
              console.log(data.user.id);
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


    } // SettingsController end
}());
