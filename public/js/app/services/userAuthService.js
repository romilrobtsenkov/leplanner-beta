(function() {
    'use strict';

    angular
    .module('app')
    .factory('userAuthService', ['$q', '$rootScope', '$location', 'requestService','$translate',
    function($q, $rootScope, $location, requestService, $translate) {
        return {
            checkUser: function(option) {

                var deferred = $q.defer();

                requestService.get('/users/me')
                .then(function(data){

                    //rootscope null, saved to rootscope
                    if(!$rootScope.user){ $rootScope.user = data; }

                    // user has changed
                    if($rootScope.user._id !== data._id){ $rootScope.user = data; }

                    //check and fix language
                    var currentLang = $translate.proposedLanguage() || $translate.use();
                    if(data.lang && currentLang !== data.lang){
                        $translate.use(data.lang).then(function(data){
                            $rootScope.translateDefaults();
                        });
                    }

                    if(typeof option !== 'undefined' && option.success_location){
                        console.log('redirected to '+ option.success_location);
                        $location.path(option.success_location);
                    }else{
                        deferred.resolve();
                    }

                })
                .catch(function(error){
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
