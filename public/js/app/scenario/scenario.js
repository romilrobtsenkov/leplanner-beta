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

      var params = {};
      params.scenario_id = $scope.scenario_id;
      if($rootScope.user !== null){
        params.user_id = $rootScope.user._id;
      }

      scenarioService.getSingleScenario(params)
        .then(function(data) {
          console.log(data);
          if(data.scenario){
            $scope.scenario = data.scenario;
            $scope.is_favorite = data.is_favorite;
          }

          if(data.error){
            console.log(data.error);
          }
      });

      $scope.addRemoveFavorite = function(remove){

        var params = {
          user_id: $rootScope.user._id,
          scenario_id: $scope.scenario._id
        };

        if(typeof remove !== 'undefined'){
          params.remove = true;
        }

        scenarioService.addRemoveFavorite(params)
          .then(function(data) {

            if(data.success){
              //DID NOT update scenario object favorites array

              if(data.success == 'remove'){
                $scope.is_favorite = false;
              }else{
                $scope.is_favorite = true;
              }
            }

            if(data.error){
              console.log(data.error);
            }
        });
      };

    }
}());
