(function() {
  'use strict';

  angular
    .module('app')
    .controller('CreateController', CreateController);

    CreateController.$inject = ['$scope','$rootScope','scenarioService','metaService'];

    function CreateController($scope,$rootScope,scenarioService,metaService) {

      $rootScope.title = 'Create scenario | Leplanner beta';

      load();

      function load(){

        $scope.before_activity_list = [];
        $scope.activity_list = [];
        $scope.after_activity_list = [];

        $scope.activity_list.push(createNewEmptyActivity());

        metaService.getSubjectList()
        .then(function(data) {

          if(data.subjects){
            $scope.subjects = data.subjects;
          }

          if(data.error){
            console.log(data.error);
          }
        });

      }


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

      $scope.addNewActivityItem = function(type){

        var new_activity = createNewEmptyActivity();

        switch (type) {
          case 'before':
            $scope.before_activity_list.push(new_activity);
            break;
          case 'lesson':
            $scope.activity_list.push(new_activity);
            break;
          case 'after':
            $scope.after_activity_list.push(new_activity);
            break;
          default:
          console.log('error');
        }

      };

      function createNewEmptyActivity(){
        return {
          random: Math.random(), // fix for making empty list items different
          name: '',
          duration: ''
        };
      }

      $scope.removeActivity = function(type, $index){
        switch (type) {
          case 'before':
            $scope.before_activity_list.splice($index,1);
            break;
          case 'lesson':
            $scope.activity_list.splice($index,1);
            break;
          case 'after':
            $scope.after_activity_list.splice($index,1);
            break;
          default:
          console.log('error');
        }
      };

    }
}());
