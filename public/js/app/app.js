/*jslint node: true */
/*global angular */
'use strict';

angular
  .module('app', ['ngRoute','ngResource','angularjs-dropdown-multiselect','angularUtils.directives.dirPagination','ngFileUpload'])
  .config(['$routeProvider','$locationProvider', '$resourceProvider', function($routeProvider,$locationProvider,$resourceProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
  }]);
