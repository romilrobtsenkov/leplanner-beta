(function() {
  'use strict';

  angular
    .module('app')
    .controller('CreateController', ['$scope','$rootScope','$timeout','$location','requestService','$translate','$window',
    function($scope,$rootScope,$timeout,$location,requestService, $translate, $window) {

      $translate('PAGE.CREATE').then(function (t) {
        $rootScope.title = t+' | Leplanner beta';

        /* ANALYTICS */
        $window.ga('send', 'pageview', {
          'page': $location.path(),
          'title': $rootScope.title
        });
      });

      $scope.createScenario = function(scenario){

        $scope.saving_in_progress = true;

        if(!scenario || typeof scenario.name == 'undefined' || scenario.name === '' || scenario.name.length <= 2){
          //$scope.errorMessage = 'Scenario name has to be atleast 3 chars long!';
          $translate('NOTICE.SCENARIO_NAME_LONG').then(function (t) {
              $scope.errorMessage = t;
          });
          $scope.saving_in_progress = undefined;
          $timeout(function() { $scope.errorMessage = null; }, 2000);
          return;
        }

        if(typeof scenario.description == 'undefined' || scenario.description === '' || scenario.description.length <= 2){
          //$scope.errorMessage = 'Scenario description has to be atleast 3 chars long!';
          $translate('NOTICE.SCENARIO_DESC_LONG').then(function (t) {
              $scope.errorMessage = t;
          });
          $scope.saving_in_progress = undefined;
          $timeout(function() { $scope.errorMessage = null; }, 2000);
          return;
        }

        // By default scenario language is the UI language
        if($translate.use()){
            scenario.language = $translate.use();
        }

        var params = {
          user: {
            _id: $rootScope.user._id
          },
          scenario: scenario
        };

        $scope.saving = true;

        requestService.post('/scenario/create', params)
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
                  //$scope.errorMessage = 'Scenario name has to be atlest 3 chars long';
                  $translate('NOTICE.SCENARIO_NAME_LONG').then(function (t) {
                      $scope.errorMessage = t;
                  });
                  break;
                case 1:
                  //$scope.errorMessage = 'Scenario description has to be atlest 3 chars long';
                  $translate('NOTICE.SCENARIO_DESC_LONG').then(function (t) {
                      $scope.errorMessage = t;
                  });
                  break;
                default:
                  //$scope.errorMessage = 'Unknown error';
                  $translate('NOTICE.UNKNOWN').then(function (t) {
                      $scope.errorMessage = t;
                  });
              }

              $timeout(function() { $scope.errorMessage = null; }, 2000);

            }

        });

      };

  }]); // CreateController
}());
