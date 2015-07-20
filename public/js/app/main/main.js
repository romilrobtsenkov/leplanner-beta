(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainController', MainController);

    MainController.$inject = ['$scope','$rootScope','$location','userService',];

    function MainController($scope,$rootScope,$location,userService) {
      //console.log($rootScope.user);
      $scope.logout = function(){
        userService.logOutUser()
          .then(function(data){
            console.log(data);
            $rootScope.user = undefined;
            $location.path('/');
          });
      };

      $scope.navigateToLogin = function($event){
        $event.preventDefault();
        $rootScope.navigatedToLoginFrom = $location.path();
        $location.path('/login');
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
