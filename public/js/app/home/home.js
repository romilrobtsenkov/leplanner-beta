(function() {
  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope','$rootScope','userService'];

    function HomeController($scope,$rootScope,userService) {

      console.log($rootScope.user);

      /*userService.getScenarios()
        .then(function(data) {

        });*/

    }
}());
