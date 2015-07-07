'use strict';

angular
  .module('app', ['ngRoute'])
  .config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
  }]);
