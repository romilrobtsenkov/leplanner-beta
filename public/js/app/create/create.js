(function() {
  'use strict';

  angular
    .module('app')
    .controller('CreateController', CreateController);

    CreateController.$inject = ['$scope','$rootScope','scenarioService','metaService'];

    function CreateController($scope,$rootScope,scenarioService,metaService) {

      $rootScope.title = 'Create scenario | Leplanner beta';

      $scope.subjects = metaService.getSubjectList();
      $scope.languages = metaService.getLanguageList();
      $scope.licenses = metaService.getLicenseList();
      $scope.materials = metaService.getMaterialList();
      $scope.methods = metaService.getMethodList();
      $scope.stages = metaService.getStageList();

      $scope.saveScenario = function(scenario) {

        if (scenario.name) {

          // TODO additional validation

            var new_scenario = {  //  inserts values to the scenario object
              name: scenario.name,
              subject: scenario.subject,
              author: $rootScope.user._id,
              language: scenario.language, // from ng-model
              license: scenario.license,
              materialType: scenario.material_type,
              method: scenario.method,
              stage: scenario.stage,
              description: scenario.description
            };

            scenarioService.createScenario({scenario: new_scenario, user: {_id: $rootScope.user._id}})
              .then(function(data) {
                console.log(data);
                if(data.success){
                  console.log('saved');
                  $scope.successMessage = "Scenario has been submitted successfully";
                  $scope.errorMessage = null;

                  scenario.name = null;
                  scenario.subject = null;
                  scenario.language = null;
                  scenario.license = null;
                  scenario.materialType = null;
                  scenario.method = null;
                  scenario.stage = null;
                  scenario.description = null;

                }

                if(data.error){
                  switch (data.error.id) {
                    case 100:
                      // user changed
                      $location.path('/');
                      break;
                    case 0:
                      $scope.errorMessage = 'Title empty';
                      break;
                    default:
                      $scope.errorMessage = 'Unknown error';
                  }
                }

            });
        }
      };

    }
}());
