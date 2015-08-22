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

      // 1 material only
      /*
        - name
        - url
        - involvment level

        0 - vaatamine (kuulamine, lugemine)
        1- märgendamine (annoteerimine, meeldimine)
        2 - interaktsioon (enesekontrolli test)
        3 - esitamine (ülesande esitamine)
        4 - laiendamine (materjali lisamine olemasolevale)
        5 - remiksimine (materjalile uue tähenduse andmine)
        6 - loomine (uue materjali loomine)

        - conveyor name
        - conveyor url -> used to create link and get favicon
        - display select menu nutitelefon / tahvelarvuti / arvuti / projektor / smartBoard / muu seade (lisa ise?)


      */



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

              loadMetaData();

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

      function loadMetaData(){


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

      $scope.openAddMaterialModal = function(activity_id, top){
        console.log(activity_id + ' ' + top);

        $('#myModal').modal();
      };

    } //EditController end
}());
