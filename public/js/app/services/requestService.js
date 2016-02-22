(function() {
    'use strict';

    angular
    .module('app')
    .factory('requestService', ['$http', function($http) {
        var API_BASE = '/api';
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
