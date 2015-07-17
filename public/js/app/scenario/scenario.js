(function() {
  'use strict';

  angular
    .module('app')
    .controller('ScenarioController', ScenarioController);

    ScenarioController.$inject = ['$scope','$rootScope','$routeParams','$location','scenarioService'];

    function ScenarioController($scope,$rootScope,$routeParams,$location,scenarioService) {

      if(typeof $routeParams.id !== 'undefined'){
        $scope.scenario_id = $routeParams.id;
      }else{
        $location.path('/');
      }

      console.log($scope.scenario_id);
      scenarioService.getSingleScenario($scope.scenario_id)
        .then(function(data) {
          console.log(data);
          if(data.scenario){
            $scope.scenario = data.scenario;
          }

          if(data.error){
            console.log(data.error);
          }
      });


    }
}());
