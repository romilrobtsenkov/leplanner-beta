'use strict';

angular
  .module('app', ['ngRoute','ngResource'])
  .config(['$routeProvider','$locationProvider', '$resourceProvider', function($routeProvider,$locationProvider,$resourceProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
  }]);
