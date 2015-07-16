(function() {
  'use strict';

  angular
    .module('app')
    .controller('CreateController', CreateController);

    CreateController.$inject = ['$scope','$rootScope','scenarioService','metaService'];

    function CreateController($scope,$rootScope,scenarioService,metaService) {

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

            scenarioService.createScenario(new_scenario)
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
                    case 0:
                      $scope.errorMessage = 'Title empty';
                      break;
                    default:
                      $scope.errorMessage = 'Unknown error';
                  }
                }

            });


            //  sends the scenario object to server side - index.js
            /*$http.post('/api/savescenario', scenario) //  sends object to /api/savescenario (index.js)
            .success(function(data, status, headers, config) {
              console.log('saved');
              $scope.successMessage = "Scenario has been submitted successfully";
              $scope.errorMessage = null;
              //  resets the selected criterions
              $scope.name = null;
              $scope.subject = null;
              $scope.language = null;
              $scope.license = null;
              $scope.materialType = null;
              $scope.method = null;
              $scope.stage = null;
              $scope.description = null;
            }).
            error(function(data, status, headers, config) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
              $scope.errorMessage = "There was an error while submitting scenario";
              $scope.successMessage = null;
            });*/
        }
      };

    }
}());
