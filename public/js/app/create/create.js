(function() {
  'use strict';

  angular
    .module('app')
    .controller('CreateController', CreateController);

    CreateController.$inject = ['$scope','$rootScope','$timeout','scenarioService','metaService'];

    function CreateController($scope,$rootScope,$timeout,scenarioService,metaService) {

      $rootScope.title = 'Create scenario | Leplanner beta';

      init();

      function init(){

        $scope.scenario = {};

        $scope.outcomes_list = [];
        $scope.outcomes_list.push(createNewEmptyOutcome());

        $scope.activity_list = [];
        $scope.activity_list.push(createNewEmptyActivity());

        metaService.getcreateScenarioMeta()
        .then(function(data) {

          if(data.subjects){
            $scope.subjects = data.subjects;
          }

          if(data.activity_organization){
            $scope.activity_organization = data.activity_organization;
          }

          if(data.error){
            console.log(data.error);
          }
        });

        $scope.outcomesSettings = {
          scrollableHeight: '120px',
          scrollable: true,
          smartButtonMaxItems: 1,
          displayProp: 'name',
          showCheckAll: false,
          showUncheckAll: false,
          idProp: '_id',
          externalIdProp: '',
          buttonClasses: 'btn btn-default',
        };
        $scope.outcomesText = {buttonDefaultText: 'Learning outcomes'};

        $scope.activity_organizationSettings = {
          scrollableHeight: '120px',
          scrollable: false,
          selectionLimit: 1,
          smartButtonMaxItems: 1,
          displayProp: 'name',
          showCheckAll: false,
          showUncheckAll: false,
          idProp: '_id',
          externalIdProp: '_id',
          buttonClasses: 'btn btn-default',
        };
        $scope.activity_organizationText = {buttonDefaultText: 'Organization'};

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

        console.log('save');

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
          activity_organization: {},
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

      function userChangedScenario(){
        //save
        var done_typing_interval = 3000;

        if($scope.timer){ $timeout.cancel($scope.timer); }

        $scope.timer = $timeout(function() {
          saveScenarioData();
        }, done_typing_interval);

      }

      function saveScenarioData() {

        // change smth to init first save
        var nothing_to_save = false;
        if(typeof $scope.saved == 'undefined'){
           nothing_to_save = true;
        }
        if(typeof $scope.scenario.name != 'undefined' || typeof $scope.scenario.description != 'undefined'|| typeof $scope.scenario.subject != 'undefined'|| typeof $scope.scenario.grade != 'undefined' || typeof $scope.scenario.duration != 'undefined'){
          nothing_to_save = false;
        }
        //check outcome list before first save
        if(typeof $scope.saved == 'undefined' &&
            typeof $scope.outcomes_list !== 'undefined' &&
            $scope.outcomes_list.length > 0 &&
            $scope.outcomes_list[0].name !== ""
          ){
          nothing_to_save = false;
        }
        if(nothing_to_save){
          console.log('nothing to save - edit smth');
          return;
        }

        $scope.scenario.outcomes = $scope.outcomes_list;
        $scope.scenario.author = $rootScope.user._id;
        $scope.scenario.activities = $scope.activity_list;

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

              $scope.scenario._id = data.scenario._id;

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
                case 0:
                  $scope.errorMessage = 'Title empty';
                  break;
                default:
                  $scope.errorMessage = 'Unknown error';
              }
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

    }
}());
