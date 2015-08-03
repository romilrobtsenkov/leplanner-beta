(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainController', MainController);

    MainController.$inject = ['$scope','$rootScope','$location','userService'];

    function MainController($scope,$rootScope,$location,userService) {

      $rootScope.title = 'Leplanner beta';

      //console.log($rootScope.user);
      $scope.logout = function(){
        userService.logoutUser()
          .then(function(data){
            console.log(data);
            $rootScope.user = undefined;
            $location.path('/');
          });
      };

      $scope.navigateToLogin = function($event){
        $event.preventDefault();
        if($location.path().toString() != '/'){
          $rootScope.navigatedToLoginFrom = $location.path();
          $location.path('/login');
        }else{
          // if from home page
          $location.path('/login');
        }

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
