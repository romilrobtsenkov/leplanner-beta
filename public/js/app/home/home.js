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

      function getScenarios(query){
        if(typeof query == 'undefined'){
          //
        }

        scenarioService.getScenarios(query)
          .then(function(data) {
            console.log(data);
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
        console.log(tab);
        if(tab == 'latest ' || tab == 'alphabetical' || tab == 'oldest'){
          $rootScope.active_tab = tab;
        }else{
          $rootScope.active_tab = 'latest';
        }
      };

      $scope.subjects = metaService.getSubjectList();

    }
}());
