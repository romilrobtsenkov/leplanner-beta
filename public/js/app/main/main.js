(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainController', MainController);

    MainController.$inject = ['$scope','$rootScope','$location','userService'];

    function MainController($scope,$rootScope,$location,userService) {

      /*Auth = function($q, $rootScope, $location,$http) {
        // move to main controller
        var deferred = $q.defer();
        $http({url: '/userService/users/me', method: 'GET'})
        .success(function (data, status, headers, config) {
         if(!$rootScope.user){
            console.log('rootscope null, saved to rootscope');
            $rootScope.user = data;
            deferred.resolve();
         }
          //console.log('routechange still logged in');
          //console.log($rootScope.user);


        })
        .error(function (data, status, headers, config) {
          $rootScope.user = null;
          deferred.resolve();

        });

        return deferred.promise;

      }

      Auth = function($q, $rootScope, $location) {
        var deferred = $q.defer();
        userService.getUser()
          .then(function(data){
            if(!$rootScope.user){
               console.log('rootscope null, saved to rootscope');
               $rootScope.user = data;
               deferred.resolve();
            }
          })
          .catch(function(fallback){
            console.log('user not logged in');
            $rootScope.user = null;
            deferred.resolve();
          });
        return deferred.promise;
      };*/

    } // MainController end
}());
