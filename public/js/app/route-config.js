(function() {
  'use strict';

  angular
    .module('app')
    .config(config)

  config.$inject = ['$routeProvider','$locationProvider','$resourceProvider'];

  function config($routeProvider,$locationProvider,$resourceProvider) {
    $routeProvider

      .when('/', {
        templateUrl: '/js/app/home/home.html',
        controller: 'HomeController',
        resolve: {
          data: function (userRouteService) {
            return userRouteService.checkUser();
          },
        }
      })
      .when('/search', {
        templateUrl: '/js/app/search/search.html',
        controller: 'SearchController',
        resolve: {
          data: function (userRouteService) {
            return userRouteService.checkUser();
          },
        }
      })
      .when('/scenario/:id', {
        templateUrl: '/js/app/scenario/scenario.html',
        controller: 'ScenarioController',
        resolve: {
          data: function (userRouteService) {
            return userRouteService.checkUser();
          },
        }
      })
      .when('/create', {
        templateUrl: '/js/app/create/create.html',
        controller: 'CreateController',
        resolve: {
          data: function (userRouteService) {
            return userRouteService.checkUser({ error_location: '/login'});
          }
        }
      })
      .when('/login', {
        templateUrl: '/js/app/login/login.html',
        controller: 'LoginController',
        resolve: {
          data: function (userRouteService) {
            return userRouteService.checkUser({ success_location: '/settings'});
          }
        }
      })
      .when('/settings', {
        templateUrl: '/js/app/settings/settings.html',
        controller: 'SettingsController',
        resolve: {
          data: function (userRouteService) {
            return userRouteService.checkUser({ error_location: '/login'});
          }
        }
      })
      .when('/reset/:token', {
        templateUrl: '/js/app/reset/reset.html',
        controller: 'ResetController',
        resolve: {
          data: function (userRouteService) {
            return userRouteService.checkUser();
          }
        }
      });
  }

}());
