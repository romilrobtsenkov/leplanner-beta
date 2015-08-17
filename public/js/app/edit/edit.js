(function() {
  'use strict';

  angular
    .module('app')
    .controller('EditController', EditController);

    EditController.$inject = ['$scope','$rootScope','$timeout','$routeParams','$location','scenarioService','metaService'];

    function EditController($scope,$rootScope,$timeout,$routeParams,$location,scenarioService,metaService) {

      if(typeof $routeParams.id !== 'undefined'){
        $scope.scenario_id = $routeParams.id;
      }else{
        $location.path('/');
      }

      $scope.outcomes_list = [];
      $scope.activity_list = [];

      init();

      function init(){

          var params = {
            user: {
              _id: $rootScope.user._id
            },
            scenario: {
              _id: $scope.scenario_id
            }
          };

          scenarioService.getEditDataSingleScenario(params)
          .then(function(data) {

            if(data.scenario){
              //console.log(data.scenario);

              $scope.scenario = data.scenario;
              console.log('Loaded scenario');

              if(typeof data.scenario.outcomes !== 'undefined'){
                $scope.outcomes_list = data.scenario.outcomes;
                console.log('Loaded outcomes');
              }

              if(typeof data.scenario.activities !== 'undefined'){
                $scope.activity_list = data.scenario.activities;
                console.log('Loaded activities');
              }

              $rootScope.title = 'Edit scenario: '+$scope.scenario.name+' details | Leplanner beta';

              loadDropdownData();

            }

            if(data.error){
              if(typeof data.error.id !== 'undefined' && data.error.id === 0){
                $scope.errorMessage = 'No such scenario found, check URL!';
              }else if(typeof data.error.id !== 'undefined' && data.error.id === 3){
                //no rights
                $location.path('/');
              }else{
                $scope.errorMessage = 'No such scenario found, check URL!';
              }
              console.log(data.error);
            }
          });
      }

      function loadDropdownData(){


        metaService.getcreateScenarioMeta()
        .then(function(data) {

          if(data.subjects && data.activity_organization){
            $scope.subjects = data.subjects;
            $scope.activity_organization = data.activity_organization;

            $scope.fully_loaded = true;

          }else{
            $scope.errorMessage = 'Please try reloading the page';
          }

          if(data.error){
            console.log(data.error);
            $scope.errorMessage = 'Please try reloading the page';
          }
        });

      }

      function userChangedScenario(){

        // after typing init autosave

        var done_typing_interval = 3000;

        if($scope.timer){ $timeout.cancel($scope.timer); }

        $scope.timer = $timeout(function() {

          // fix for first loading listeners
          if(!$scope.watch_init_event){
            saveScenarioData();
          }else{
            $scope.watch_init_event = undefined;
          }
        }, done_typing_interval);

      }

      function saveScenarioData() {

        $scope.scenario.outcomes = $scope.outcomes_list;
        $scope.scenario.activities = $scope.activity_list;

        // allow empty, grade, duration
        if(typeof $scope.scenario.grade == 'undefined'){ $scope.scenario.grade = null; }
        if(typeof $scope.scenario.duration == 'undefined'){ $scope.scenario.duration = null; }

        var params = {
          user: {
            _id: $rootScope.user._id
          },
          scenario_data: $scope.scenario
        };

        $scope.saving = true;

        scenarioService.saveScenario(params)
          .then(function(data) {

            if(data.scenario){
              console.log('saved scenario ');

              $timeout(function() {
                $scope.saved = true;
                $scope.saving = undefined;
              }, 1000);

              $scope.errorMessage = null;
            }

            if(data.error){
              console.log(data.error);
              switch (data.error.id) {
                case 100:
                  // user changed
                  $location.path('/');
                  break;
                case 3:
                  $scope.errorMessage = 'no rights';
                  $location.path('/');
                  break;
                default:
                  $scope.errorMessage = 'Unknown error';
              }

              $timeout(function() { $scope.errorMessage = null; }, 2000);

            }

        });

      }

      // http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
      function guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4();
      }

      // fix destroing timeout after navigationg away
      $scope.$on("$destroy", function( event ) {
        if($scope.timer){ $timeout.cancel($scope.timer); }
      });

    } //EditController end
}());
