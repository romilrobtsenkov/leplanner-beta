'use strict';

angular
  .module('app', ['ngRoute','ngResource','angularjs-dropdown-multiselect'])
  .config(['$routeProvider','$locationProvider', '$resourceProvider', function($routeProvider,$locationProvider,$resourceProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
  }]);
