/*jslint node: true */
/*global angular */
'use strict';

angular
  .module('app', ['ngRoute','ngResource', 'ngSanitize','angularjs-dropdown-multiselect','angularUtils.directives.dirPagination','ngFileUpload','ui.sortable'])
  .config(['$routeProvider','$locationProvider', '$resourceProvider', function($routeProvider,$locationProvider,$resourceProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
  }]);
