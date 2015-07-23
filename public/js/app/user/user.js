(function() {
  'use strict';

  angular
    .module('app')
    .controller('UserController', UserController);

    UserController.$inject = ['$scope','$rootScope','$routeParams','userService','scenarioService'];

    function UserController($scope,$rootScope,$routeParams,userService,scenarioService) {

      if(typeof $routeParams.id !== 'undefined'){
        $scope.get_profile_id = $routeParams.id;
      }else{
        $location.path('/');
      }

      if(typeof $rootScope.sort_tab === 'undefined'){
        $rootScope.sort_tab = {};
      }else if(typeof $rootScope.sort_tab.profile === 'undefined') {
        $rootScope.sort_tab.profile = 'latest';
      }

      //getSingleUserScenarios();
      getUserFollowing();

      function getUserFollowing(){

        var request = {
          user: {
            _id: $scope.get_profile_id
          }
        };

        userService.getFollowing(request)
          .then(function(data) {

            if(data.profile){
              console.log(data.profile);
              $scope.user = true;
            }

            if(data.error){
              switch (data.error.id) {
                case 0:
                  $scope.no_user = true;
                  break;
                default:
                  $scope.no_user = true;
                  console.log(data.error);
              }
            }

        });
      }

      function getSingleUserScenarios(){

        $scope.loading_animation = true;
        $scope.no_scenarios = false;
        $scope.scenarios = [];

        var q = {};

        q.user = {_id: $rootScope.user._id};

        if(typeof $rootScope.sort_tab.profile == 'undefined'){
          $rootScope.sort_tab.profile = 'latest';
        }else{
          switch ($rootScope.sort_tab.profile) {
            case 'latest':
                q.order = 'latest';
              break;
              case 'popular':
                  q.order = 'popular';
                break;
              case 'favorited':
                  q.order = 'favorited';
                break;
              case 'commented':
                  q.order = 'commented';
                break;
            default:
              q.order = 'latest';
          }
        }

        scenarioService.getUserScenarios(q)
          .then(function(data) {
            console.log(data);
            if(data.scenarios){
              if(data.scenarios.length === 0){
                  $scope.no_scenarios = true;
              }
              $scope.scenarios = data.scenarios;

              $scope.loading_animation = false;
            }

            if(data.error){
              console.log(data.error);
            }
        });


      }

      $scope.isSortActive = function(tab){
        if(tab == $rootScope.sort_tab.profile){ return true; }
        return false;
      };

      $scope.updateSortList = function(tab){
        if(tab == 'latest ' || tab == 'popular' || tab == 'favorited' || tab == 'commented'){
          $rootScope.sort_tab.profile = tab;
          getSingleUserScenarios();
        }else{
          $rootScope.sort_tab.profile = 'latest';
          getSingleUserScenarios();
        }
      };

    }
}());
