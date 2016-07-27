(function() {
    'use strict';

    angular
    .module('app')
    .factory('queryService', function() {
        return {
            stringify: function(q) {
                var q_string = Object.keys(q)
                .filter(function (key) {
                    if(angular.isArray(q[key])){
                        return q[key].length > 0;
                    }
                    return q[key];
                })
                .map(function (key) {
                    var val = q[key];
                    if (angular.isArray(val)) {
                        val = val.join(',');
                    }
                    return key + '=' + val;
                }).join('&');
                return '?' + q_string;
            }
        };

    });

}());
