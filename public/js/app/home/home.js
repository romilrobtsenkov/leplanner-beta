(function() {
  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope','$rootScope','api'];

    function HomeController($scope,$rootScope,api) {

      console.log($rootScope.user);

      /*api.getScenarios()
        .then(function(data) {

        });*/

    }
}());
