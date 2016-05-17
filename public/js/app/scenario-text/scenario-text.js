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
      requestService.post('/scenario/single-scenario', params)
        .then(function(data) {
          if(data.scenario){

            $rootScope.title = data.scenario.name+' - '+data.scenario.author.first_name+' '+data.scenario.author.last_name+' | Leplanner beta';

            /* ANALYTICS */
            $window.ga('send', 'pageview', {
              'page': $location.path(),
              'title': $rootScope.title
            });

            $scope.scenario = data.scenario;
            $scope.activity_list = data.scenario.activities;
            $scope.is_favorite = data.is_favorite;
            $scope.is_following = data.is_following;
            //console.log(data.scenario);
            if(typeof data.materials !== 'undefined'){
              $scope.materials = data.materials;

              updateActivityList();
              //console.log($scope.activity_list);
              //console.log('Loaded materials');
            }
            loadMetaData();
          }

          if(data.error){
            switch (data.error.id) {
              case 0:
                $scope.no_scenario = true;
                break;
              default:
                $scope.no_scenario = true;
                console.log(data.error);
            }
          }
      });

      function loadMetaData(){

        requestService.get('/meta/get-scenario-meta')
        .then(function(data) {

          if(data.subjects && data.activity_organization && data.involvement_options && data.displays){
            $scope.subjects = data.subjects;
            $scope.activity_organization = data.activity_organization;
            console.log($scope.activity_organization);
            $scope.activityImageNames = ['./images/one.png','./images/pair.png','./images/group.png','./images/group.png'];

            $scope.involvement_options = data.involvement_options;
            $scope.displays_list = data.displays;

            //load translations
            if($rootScope.translated && $rootScope.translated.organization){
                for(var i = 0; i < $scope.activity_organization.length; i++){
                    $scope.activity_organization[i].name = $rootScope.translated.organization[i];
                }
            }
            if($rootScope.translated && $rootScope.translated.co_authorship){
                for(var j = 0; j < $scope.involvement_options.length; j++){
                    $scope.involvement_options[j].name = $rootScope.translated.co_authorship[j];
                }
            }
            if($rootScope.translated && $rootScope.translated.displays){
                for(var k = 0; k < $scope.displays_list.length; k++){
                    $scope.displays_list[k].name = $rootScope.translated.displays[k];
                }
            }

            $scope.fully_loaded = true;

          }else{
            //$scope.errorMessage = 'Please try reloading the page';
            $translate('NOTICE.RELOAD').then(function (t) {
                $scope.errorMessage = t;
            });
          }

          if(data.error){
            console.log(data.error);
            //$scope.errorMessage = 'Please try reloading the page';
            $translate('NOTICE.RELOAD').then(function (t) {
                $scope.errorMessage = t;
            });
          }
        });

      }

      $scope.navigateToLogin = function($event){
        $event.preventDefault();
        $rootScope.navigatedToLoginFrom = $location.path();
        $location.path('/login');
      };

      var updateActivityList = function(){
        // add material to relevant activities
        for(var i = 0; i < $scope.activity_list.length; i++){

          // empty materials
          $scope.activity_list[i].materials = undefined;

          for(var j = 0; j < $scope.materials.length; j++){
            if($scope.activity_list[i]._id == $scope.materials[j].activity_id){
              if(typeof $scope.activity_list[i].materials == 'undefined'){
                $scope.activity_list[i].materials = [];
              }
              $scope.activity_list[i].materials.push($scope.materials[j]);
            }
          }
        }
        console.log($scope.activity_list);
      };


  }]); // ScenarioController end
}());
