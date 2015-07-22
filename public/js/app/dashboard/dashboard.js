(function() {
  'use strict';

  angular
    .module('app')
    .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$scope','$rootScope','scenarioService', 'metaService'];

    function DashboardController($scope,$rootScope,scenarioService,metaService) {

      if(typeof $rootScope.dash_active_tab === 'undefined'){
        $rootScope.dash_active_tab = 'drafts';
      }


      //$rootScope.user;

      // when saving scenario -oon save save as draft
      // get all created
      // get all favorite scenarios
      // enable following users and enable find followers? search for new users by 3 letters and then open up show user followers

      getDashboardScenarios();

      function getDashboardScenarios(){
        var q = {
          order : 'latest',
          user: {
            _id: $rootScope.user._id
          }
        };

        if(typeof $rootScope.dash_active_tab == 'undefined'){
          q.filter = 'drafts';
        }else{
          switch ($rootScope.dash_active_tab) {
            case 'published':
                q.filter = 'published';
              break;
              case 'favorites':
                  q.filter = 'favorites';
                break;
              case 'following':
                  q.filter = 'following';
                break;
            default:
              q.filter = 'drafts';
          }
        }

        scenarioService.getDashScenarios(q)
          .then(function(data) {
            //console.log(data);
            if(data.scenarios){

              switch (q.filter) {
                case 'drafts':
                  $scope.drafts_count = data.scenarios.length;
                  
                  $scope.no_drafts = undefined;
                  $scope.no_published = undefined;
                  $scope.no_favorites = undefined;
                  $scope.no_following = undefined;

                  if(data.scenarios.length === 0){
                    $scope.no_drafts = true;

                    $scope.scenarios = [];
                  }else{
                    $scope.scenarios = data.scenarios;
                  }
                  break;
                case 'published':

                  $scope.no_drafts = undefined;
                  $scope.no_published = undefined;
                  $scope.no_favorites = undefined;
                  $scope.no_following = undefined;

                  if(data.scenarios.length === 0){
                    $scope.no_published = true;

                    $scope.scenarios = [];
                  }else{
                    $scope.scenarios = data.scenarios;
                  }

                  break;
                case 'favorites':

                  $scope.no_drafts = undefined;
                  $scope.no_published = undefined;
                  $scope.no_favorites = undefined;
                  $scope.no_following = undefined;

                  if(data.scenarios.length === 0){
                    $scope.no_favorites = true;

                    $scope.scenarios = [];
                  }else{
                    $scope.scenarios = data.scenarios;
                  }

                  break;
                case 'following':

                  $scope.no_drafts = undefined;
                  $scope.no_published = undefined;
                  $scope.no_favorites = undefined;
                  $scope.no_following = undefined;

                  if(data.scenarios.length === 0){
                    $scope.no_following = true;

                    $scope.scenarios = [];
                  }else{
                    $scope.scenarios = data.scenarios;
                  }

                  break;
              }


              $scope.scenarios = data.scenarios;

            }


            if(data.error){
              switch(data.error.id) {
                case 100:
                  // user changed
                  $location.path('/');
                  break;
                default:
                  console.log(data.error);
              }
            }
        });

      }

      $scope.isActiveDash = function(tab){
        if(tab == $rootScope.dash_active_tab){ return true; }
        return false;
      };

       $scope.updateDashList = function(tab){
        if(tab == 'drafts ' || tab == 'published' || tab == 'favorites' || tab == 'following'){
          $rootScope.dash_active_tab = tab;
          getDashboardScenarios();
        }else{
          $rootScope.dash_active_tab = 'drafts';
          getDashboardScenarios();
        }
      };

    } // DashboardController end
}());
