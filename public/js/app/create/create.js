(function() {
  'use strict';

  angular
    .module('app')
    .controller('CreateController', CreateController);

    CreateController.$inject = ['$scope','$rootScope','$timeout','$location','scenarioService','metaService'];

    function CreateController($scope,$rootScope,$timeout,$location,scenarioService,metaService) {

      $rootScope.title = 'Create new scenario | Leplanner beta';

      $scope.createScenario = function(scenario){

        $scope.saving_in_progress = true;

        if(typeof scenario.name == 'undefined' || scenario.name === '' || scenario.name.length <= 2){
          $scope.errorMessage = 'Scenario name has to be atleast 3 chars long!';
          $timeout(function() { $scope.errorMessage = null; }, 2000);
          return;
        }

        if(typeof scenario.description == 'undefined' || scenario.description === '' || scenario.description.length <= 2){
          $scope.errorMessage = 'Scenario description has to be atleast 3 chars long!';
          $timeout(function() { $scope.errorMessage = null; }, 2000);
          return;
        }

        var params = {
          user: {
            _id: $rootScope.user._id
          },
          scenario: scenario
        };

        $scope.saving = true;

        scenarioService.createScenario(params)
          .then(function(data) {

            $scope.saving_in_progress = undefined;

            if(data.scenario){

              $scope.errorMessage = null;

              $location.path('/edit-details/'+data.scenario._id);

            }

            if(data.error){
              console.log(data.error);
              switch (data.error.id) {
                case 100:
                  // user changed
                  $location.path('/');
                  break;
                case 0:
                  $scope.errorMessage = 'Scenario name has to be atlest 3 chars long';
                  break;
                case 1:
                  $scope.errorMessage = 'Scenario description has to be atlest 3 chars long';
                  break;
                default:
                  $scope.errorMessage = 'Unknown error';
              }

              $timeout(function() { $scope.errorMessage = null; }, 2000);

            }

        });

      };

    } // CreateController
}());
