(function() {
  'use strict';

  angular
    .module('app')
    .factory('userRouteService', userRouteService, ['$q', '$rootScope', '$location', 'requestService',
  function($q, $rootScope, $location, requestService) {
    return {
      checkUser: function(option) {

        var deferred = $q.defer();
        requestService.get('/api/user/me')
          .then(function(data){
            if(!$rootScope.user){
               //console.log('rootscope null, saved to rootscope');
               $rootScope.user = data;
            }

            // check if user has changed
            if($rootScope.user._id != data._id){
              console.log('user changed');

              // rewrite with new user data
              $rootScope.user = data;
            }

            if(typeof option !== 'undefined' && option.success_location){
              console.log('redirected to '+ option.success_location);
              $location.path(option.success_location);
            }else{
              deferred.resolve();
            }

          })
          .catch(function(fallback){
            $rootScope.user = undefined;
            if(typeof option !== 'undefined' && option.error_location){
              console.log('redirected to '+ option.error_location);
              $location.path(option.error_location);
            }else{
              deferred.resolve();
            }
          });
          return deferred.promise;

      }
    };

  }]);

}());
