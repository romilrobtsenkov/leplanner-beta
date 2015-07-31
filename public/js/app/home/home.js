(function() {
  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope','$rootScope','scenarioService', 'metaService'];

    function HomeController($scope,$rootScope,scenarioService,metaService) {

      $rootScope.title = 'Leplanner beta';

      if(typeof $rootScope.home_active_sort_tab === 'undefined'){
        $rootScope.home_active_sort_tab = 'latest';
      }

      getScenarios();

      function getScenarios(){
        var q = {};
        q.limit = 4;

        if(typeof $rootScope.home_active_sort_tab == 'undefined'){
          $rootScope.home_active_sort_tab = 'latest';
        }else{
          switch ($rootScope.home_active_sort_tab) {
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

        scenarioService.getWidgetScenarios(q)
          .then(function(data) {
            //console.log(data);
            if(data.scenarios){
              $scope.scenarios = data.scenarios;
            }

            if(data.error){
              console.log(data.error);
            }
        });

      }

      $scope.isSortActive = function(tab){
        if(tab == $rootScope.home_active_sort_tab){ return true; }
        return false;
      };

       $scope.updateSortList = function(tab){
        if(tab == 'latest ' || tab == 'popular' || tab == 'favorited' || tab == 'commented'){
          $rootScope.home_active_sort_tab = tab;
          getScenarios();
        }else{
          $rootScope.home_active_sort_tab = 'latest';
          getScenarios();
        }
      };

      $scope.subjects = metaService.getSubjectList();

    }
}());
