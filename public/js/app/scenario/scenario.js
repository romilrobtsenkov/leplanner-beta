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

      // single scenario details
      var params = {};
      params.scenario_id = $scope.scenario_id;
      if(typeof $rootScope.user !== 'undefined'){
        params.user_id = $rootScope.user._id;
      }
      scenarioService.getSingleScenario(params)
        .then(function(data) {
          //console.log(data);
          if(data.scenario){
            $scope.scenario = data.scenario;
            $scope.is_favorite = data.is_favorite;
            getSidebarScenarios();
          }

          if(data.error){
            console.log(data.error);
          }
      });

      function getSidebarScenarios(){
        var q= {order: 'popular', limit: 3, exclude: $scope.scenario._id};
        scenarioService.getScenarios(q)
          .then(function(data) {
            if(data.scenarios){
              $scope.scenarios = data.scenarios;
            }
            if(data.error){
              console.log(data.error);
            }
        });
      }

      $scope.addRemoveFavorite = function(remove){

        var params = {
          user: {
            _id: $rootScope.user._id
          },
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
              switch (data.error.id) {
                case 100:
                  // user changed
                  $location.path('/');
                  break;
                default:
                  console.log(data.error);

              }
              console.log(data.error);
            }
        });
      };

      $scope.navigateToLogin = function($event){
        $event.preventDefault();
        $rootScope.navigatedToLoginFrom = $location.path();
        $location.path('/login');
      };

      $scope.addComment = function(comment){
        if(typeof comment === 'undefined' || typeof comment.text == 'undefined' ){
          $scope.save_error = "Comment text cannot be empty";
          return;
        }

        if($scope){

        }

        console.log(comment);
      };

    }
}());
