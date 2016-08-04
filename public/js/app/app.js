/*jslint node: true */
/*global angular */
'use strict';

angular
.module('app', ['ngRoute','ngResource', 'ngSanitize','angularjs-dropdown-multiselect','angularUtils.directives.dirPagination','ngFileUpload','ui.sortable', 'pascalprecht.translate','ngTagsInput','ui-notification'])
.config(['$routeProvider','$locationProvider', '$resourceProvider', function($routeProvider,$locationProvider,$resourceProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
}]);
