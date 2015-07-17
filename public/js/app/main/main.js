(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainController', MainController);

    MainController.$inject = ['$scope','$rootScope','$location','userService',];

    function MainController($scope,$rootScope,$location,userService) {

      $scope.logout = function(){
        userService.logOutUser()
          .then(function(data){
            console.log(data);
            $scope.user = null;
            $rootScope.user = null;
            $location.path('/');
          });
      };

      $scope.searchFromTop = function($event){
        if($location.path() == '/search'){
          $rootScope.top_search_word = $scope.top_search_word;
          $scope.$broadcast ('triggerSearchForm');
        }else{
          if(typeof $event !== 'undefined'){
            $event.preventDefault();
          }
          $rootScope.top_search_word = $scope.top_search_word;
          $location.path('/search');
        }
      };

    } // MainController end
}());
