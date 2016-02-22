(function() {
  'use strict';

  angular
    .module('app')
    .controller('EditDetailsController', ['$scope','$rootScope','$timeout','$routeParams','$location','scenarioService','metaService',
    function($scope,$rootScope,$timeout,$routeParams,$location,scenarioService,metaService) {

      if(typeof $routeParams.id !== 'undefined'){
        $scope.scenario_id = $routeParams.id;
      }else{
        $location.path('/');
      }

      $scope.selected_subject = null;

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
              /*console.log(data.scenario.subject);
              if(data.scenario.subject){
                $scope.selected_subject = data.scenario.subject;
              }*/

              console.log('Loaded scenario');

              if(typeof data.scenario.outcomes !== 'undefined'){
                $scope.outcomes_list = data.scenario.outcomes;
                console.log('Loaded outcomes');
              }

              if(typeof data.scenario.activities !== 'undefined'){
                $scope.activity_list = data.scenario.activities;
                console.log('Loaded activities');
              }

              //console.log(data.scenario);

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

        if($scope.outcomes_list.length === 0){
          $scope.outcomes_list.push(createNewEmptyOutcome());
          console.log('added empty outcome init');
        }

        if($scope.activity_list.length === 0){
          $scope.activity_list.push(createNewEmptyActivity());
          console.log('added empty activity init');
        }

        //publish/draft dropdown
        $scope.publish_options = [{name: 'Draft', value: true},{name: 'Published', value: false}];

        metaService.getScenarioMeta()
        .then(function(data) {

          if(data.subjects && data.activity_organization){
            $scope.subjects = data.subjects;
            $scope.activity_organization = data.activity_organization;

            $scope.fully_loaded = true;

            createDropdowns();
            addWatchListeners();


          }else{
            $scope.errorMessage = 'Please try reloading the page';
          }

          if(data.error){
            console.log(data.error);
            $scope.errorMessage = 'Please try reloading the page';
          }
        });

      }

      function createDropdowns(){

        $scope.outcomesSettings = {
          scrollableHeight: '150px',
          scrollable: true,
          smartButtonMaxItems: 1,
          displayProp: 'name',
          //showCheckAll: false,
          //showUncheckAll: false,
          idProp: '_id',
          externalIdProp: '',
          buttonClasses: 'btn btn-default',
        };
        $scope.outcomesText = {buttonDefaultText: 'Learning outcomes'};

        $scope.activity_organizationSettings = {
          scrollableHeight: '200px',
          scrollable: false,
          selectionLimit: 1,
          smartButtonMaxItems: 1,
          displayProp: 'name_eng',
          showCheckAll: false,
          showUncheckAll: false,
          closeOnSelect: true,
          idProp: '_id',
          externalIdProp: '',
          buttonClasses: 'btn btn-default',
        };
        $scope.activity_organizationText = {buttonDefaultText: 'Organization'};

      }

      function addWatchListeners(){

        $scope.watch_init_event = true;

        $scope.$watch("scenario", function(v) {
          userChangedScenario();
        }, true);

        $scope.$watch("outcomes_list", function(v) {
          userChangedScenario();
        }, true);

        $scope.$watch("activity_list", function(v) {
          userChangedScenario();
        }, true);
      }

      $scope.saveScenario = function(scenario) {
        saveScenarioData({forward_to_edit_canvas: true});
      };

      $scope.addNewOutcomeItem = function(){
        var new_outcome = createNewEmptyOutcome();
        $scope.outcomes_list.push(new_outcome);
      };

      function createNewEmptyOutcome(){
        return {
          _id: guid(),
          name: ''
        };
      }

      $scope.removeOutcome = function($index){

        //also remove from activities selection
        for(var i = 0; i < $scope.activity_list.length; i++){
          for(var j = 0; j < $scope.activity_list[i].outcomes.length; j++){
            if($scope.activity_list[i].outcomes[j].id == $scope.outcomes_list[$index].id){
              $scope.activity_list[i].outcomes.splice(j, 1);
              j--;
            }
          }
        }

        $scope.outcomes_list.splice($index,1);

      };

      $scope.addNewActivityItem = function(){
        var new_activity = createNewEmptyActivity();
        $scope.activity_list.push(new_activity);
      };

      function createNewEmptyActivity(){
        return {
          _id: guid(), // fix for making empty list items different
          name: '',
          duration: '',
          in_class: true,
          activity_organization: {
            _id: 0
          },
          outcomes: []
        };
      }

      function getTotalActivirtyTime(){
        var time = 0;
        for(var i = 0; i < $scope.activity_list.length; i++){
          time += parseInt($scope.activity_list[i].duration);
        }
        return time;
      }

      $scope.removeActivity = function($index){
        $scope.activity_list.splice($index,1);
      };

      $scope.deleteScenario = function(){
        var del = confirm("Do you really want to delete scenario '"+$scope.scenario.name+"', there is no turning back!");
        if(del === true){

          var params = {
            user: {
              _id: $rootScope.user._id
            },
            scenario: {
              _id: $scope.scenario_id
            }
          };

          scenarioService.deleteScenario(params)
          .then(function(data) {

            if(data.success){
              console.log('deleted');
              $location.path('/dashboard');
            }

            if(data.error){
              console.log(data.error);
              $scope.errorMessage = 'Please try reloading the page';
            }
          });
        }
      };

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

      function saveScenarioData(forward) {

        $scope.saving_in_progress = true;

        $scope.scenario.outcomes = $scope.outcomes_list;
        $scope.scenario.activities = $scope.activity_list;

        // allow empty, grade, duration
        if(typeof $scope.scenario.grade == 'undefined'){ $scope.scenario.grade = null; }
        if(typeof $scope.scenario.duration == 'undefined'){ $scope.scenario.duration = null; }
        //console.log($scope.scenario.subject);
        //$scope.scenario.subject = $scope.selected_subject;
        //console.log($scope.scenario);

        var params = {
          user: {
            _id: $rootScope.user._id
          },
          scenario_data: $scope.scenario
        };

        $scope.saving = true;

        scenarioService.saveScenario(params)
          .then(function(data) {

            //enable save button
            $scope.saving_in_progress = undefined;

            if(data.scenario){
              console.log('saved scenario ');

              // user clicked save button
              if(forward){
                $location.path('/edit/'+data.scenario._id);
              }

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

  }]); //editDetailsController end
}());
