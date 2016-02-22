(function() {
    'use strict';

    angular
    .module('app')
    .factory('requestService', ['$http', '/api', function($http, API_BASE) {
        return {
            get: function(request) {
                return $http.get(API_BASE + request)
                .then(function(response) {
                    return response.data;
                });
            },

            post: function(request, query) {
                return $http.post(API_BASE + request, query)
                .then(function(response) {
                    return response.data;
                });
            }
        };

    }]);

}());
