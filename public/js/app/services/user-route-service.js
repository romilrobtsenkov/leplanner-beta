(function() {
  'use strict';

  angular
    .module('app')
    .factory('userRouteService', userRouteService);

  userRouteService.$inject = ['$q', '$rootScope', '$location', 'api'];

  function userRouteService($q, $rootScope, $location, api) {
    return {
      getUser: function() {
        var deferred = $q.defer();
        api.getUser()
          .then(function(data){
            if(!$rootScope.user){
               console.log('rootscope null, saved to rootscope');
               $rootScope.user = data;
               deferred.resolve();
            }else{
              deferred.resolve();
            }
          })
          .catch(function(fallback){
            console.log('user not logged in');
            $rootScope.user = null;
            deferred.resolve();
          });
        return deferred.promise;
      }
    };
  }

}());
