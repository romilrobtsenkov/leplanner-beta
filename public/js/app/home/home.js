(function() {
  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope','$rootScope','scenarioService', 'metaService'];

    function HomeController($scope,$rootScope,scenarioService,metaService) {

      //console.log($rootScope.active_tab);

      if(typeof $rootScope.active_tab === 'undefined'){
        $rootScope.active_tab = 'latest';
      }

      getScenarios();

      function getScenarios(){
        var q = {};
        q.limit = 4;

        if(typeof $rootScope.active_tab == 'undefined'){
          $rootScope.active_tab = 'latest';
        }else{
          switch ($rootScope.active_tab) {
            case 'latest':
                q.order = 'latest';
              break;
              case 'popular':
                  q.order = 'popular';
                break;
            default:
              q.order = 'latest';
          }
        }

        scenarioService.getScenarios(q)
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

      $scope.isActive = function(tab){
        if(tab == $rootScope.active_tab){ return true; }
        return false;
      };

       $scope.updateList = function(tab){
        if(tab == 'latest ' || tab == 'popular'){
          $rootScope.active_tab = tab;
          getScenarios();
        }else{
          $rootScope.active_tab = 'latest';
          getScenarios();
        }
      };

      $scope.subjects = metaService.getSubjectList();

    }
}());
