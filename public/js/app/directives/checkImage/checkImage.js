(function() {
    'use strict';

    angular
    .module('app')
    .directive('checkImage', ['$http', function($http) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                attrs.$observe('ngSrc', function(ngSrc) {
                    if(!ngSrc) {return;}
                    $http.get(ngSrc).success(function(){
                    }).error(function(){
                        console.log('image not exist');
                        element.attr('src', './images/ring.gif'); // set default image
                    });
                });
            }
        };
    }]);
}());
