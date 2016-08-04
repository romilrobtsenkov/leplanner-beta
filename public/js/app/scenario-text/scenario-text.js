(function() {
  'use strict';

  angular
    .module('app')
    .controller('ScenarioTextController', ['$scope','$rootScope','$routeParams','$location','$timeout','requestService','$translate','$window',
    function($scope,$rootScope,$routeParams,$location,$timeout,requestService,$translate,$window) {

      if(typeof $routeParams.id !== 'undefined'){
        $scope.scenario_id = $routeParams.id;
      }else{
        $location.path('/');
      }

      $scope.activity_list = [];
      $scope.materials = [];

      // single scenario details
      var params = {
        scenario: {
          _id: $scope.scenario_id
        }
      };

      if(typeof $rootScope.user !== 'undefined'){
        params.user = {
          _id :$rootScope.user._id
        };
      }

      // INIT
      requestService.get('/scenarios/single/' + $scope.scenario_id)
      .then(function (data) {

          if (!data.scenario) { $scope.no_scenario = true; }

          $rootScope.title = data.scenario.name + ' - ' + data.scenario.author.first_name + ' ' + data.scenario.author.last_name + ' | Leplanner beta';

          /* ANALYTICS */
          $window.ga('send', 'pageview', {
              'page': $location.path(),
              'title': $rootScope.title
          });

          $scope.scenario = data.scenario;
          $scope.is_favorite = data.is_favorite;
          $scope.is_following = data.is_following;

          //translating subjects
          for(var a = 0; a < $scope.scenario.subjects.length; a++){
              $scope.scenario.subjects[a].name = $scope.scenario.subjects[a]["name_"+$translate.use()];
          }

          //translate activities and displays
          for (var i = 0; i < $scope.scenario.activities.length; i++) {
              //translate activity organization
              $scope.scenario.activities[i].activity_organization.name = $rootScope.translated.organization[$scope.scenario.activities[i].activity_organization._id];

              if(!$scope.scenario.activities[i].materials ) { continue; }
              for (var m = 0; m < $scope.scenario.activities[i].materials.length; m++) {
                  for (var d = 0; d < $scope.scenario.activities[i].materials[m].displays.length; d++) {
                      //translate display name
                      $scope.scenario.activities[i].materials[m].displays[d].name = $rootScope.translated.displays[$scope.scenario.activities[i].materials[m].displays[d]._id];

                      //involvement_level
                      $scope.scenario.activities[i].materials[m].involvement.name = $rootScope.translated.co_authorship[$scope.scenario.activities[i].materials[m].involvement._id];
                  }
              }
          }

          $scope.activityImageNames = ['./images/one.png','./images/pair.png','./images/group.png','./images/group.png'];

          $scope.fully_loaded = true;
      })
      .catch(function (error) {
          console.log(error);
          $scope.no_scenario = true;
      });

      $scope.navigateToLogin = function($event){
        $event.preventDefault();
        $rootScope.navigatedToLoginFrom = $location.path();
        $location.path('/login');
      };

  }]); // ScenarioController end
}());
