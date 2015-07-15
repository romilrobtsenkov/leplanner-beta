(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainController', MainController);

    MainController.$inject = ['$scope','$rootScope','$location','userService',];

    function MainController($scope,$rootScope,$location,userService) {

      $scope.logout = function(){
        userService.logOutUser()
          .then(function(data){
            console.log(data);
            $scope.user = null;
            $rootScope.user = null;
            $location.path('/login');
          });
      };

    } // MainController end
}());
