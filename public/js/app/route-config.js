(function() {
  'use strict';

  angular
    .module('app')
    .config(['$routeProvider','$locationProvider','$resourceProvider',
  function($routeProvider,$locationProvider,$resourceProvider) {

    $routeProvider
    .when('/', {
      templateUrl: '/js/app/home/home.html',
      controller: 'HomeController',
      resolve: {
        data: ['userRouteService', function(userRouteService) {
          return userRouteService.checkUser();
        }]
      }
    })
    .when('/create', {
      templateUrl: '/js/app/create/create.html',
      controller: 'CreateController',
      resolve: {
        data: ['userRouteService', function(userRouteService) {
          return userRouteService.checkUser({ error_location: '/login'});
        }]
      }
    })
    .when('/dashboard', {
      templateUrl: '/js/app/dashboard/dashboard.html',
      controller: 'DashboardController',
      resolve: {
        data: ['userRouteService', function(userRouteService) {
          return userRouteService.checkUser({ error_location: '/login'});
        }]
      }
    })
    .when('/edit/:id', {
      templateUrl: '/js/app/edit/edit.html',
      controller: 'EditController',
      resolve: {
        data: ['userRouteService', function(userRouteService) {
          return userRouteService.checkUser({ error_location: '/login'});
        }]
      }
    })
    .when('/edit-details/:id', {
      templateUrl: '/js/app/edit-details/edit-details.html',
      controller: 'EditDetailsController',
      resolve: {
        data: ['userRouteService', function(userRouteService) {
          return userRouteService.checkUser({ error_location: '/login'});
        }]
      }
    })
    .when('/login', {
      templateUrl: '/js/app/login/login.html',
      controller: 'LoginController',
      resolve: {
        data: ['userRouteService', function(userRouteService) {
          return userRouteService.checkUser({ success_location: '/dashboard'});
        }]
      }
    })
    .when('/reset/:token', {
      templateUrl: '/js/app/reset/reset.html',
      controller: 'ResetController',
      resolve: {
        data: ['userRouteService', function(userRouteService) {
          return userRouteService.checkUser();
        }]
      }
    })
    .when('/scenario/:id', {
      templateUrl: '/js/app/scenario/scenario.html',
      controller: 'ScenarioController',
      resolve: {
        data: ['userRouteService', function(userRouteService) {
          return userRouteService.checkUser();
        }]
      }
    })
    .when('/search', {
      templateUrl: '/js/app/search/search.html',
      controller: 'SearchController',
      resolve: {
        data: ['userRouteService', function(userRouteService) {
          return userRouteService.checkUser();
        }]
      }
    })
    .when('/settings', {
      templateUrl: '/js/app/settings/settings.html',
      controller: 'SettingsController',
      resolve: {
        data: ['userRouteService', function(userRouteService) {
          return userRouteService.checkUser({ error_location: '/login'});
        }]
      }
    })
    .when('/user/:id', {
      templateUrl: '/js/app/user/user.html',
      controller: 'UserController',
      resolve: {
        data: ['userRouteService', function(userRouteService) {
          return userRouteService.checkUser();
        }]
      }
    });

  }]);
}());
