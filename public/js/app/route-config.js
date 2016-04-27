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
        data: ['userAuthService', function(userAuthService) {
          return userAuthService.checkUser();
        }]
      }
    })
    .when('/create', {
      templateUrl: '/js/app/create/create.html',
      controller: 'CreateController',
      resolve: {
        data: ['userAuthService', function(userAuthService) {
          return userAuthService.checkUser({ error_location: '/login'});
        }]
      }
    })
    .when('/dashboard', {
      templateUrl: '/js/app/dashboard/dashboard.html',
      controller: 'DashboardController',
      resolve: {
        data: ['userAuthService', function(userAuthService) {
          return userAuthService.checkUser({ error_location: '/login'});
        }]
      }
    })
    .when('/edit/:id', {
      templateUrl: '/js/app/edit/edit.html',
      controller: 'EditController',
      resolve: {
        data: ['userAuthService', function(userAuthService) {
          return userAuthService.checkUser({ error_location: '/login'});
        }]
      }
    })
    .when('/edit-details/:id', {
      templateUrl: '/js/app/edit-details/edit-details.html',
      controller: 'EditDetailsController',
      resolve: {
        data: ['userAuthService', function(userAuthService) {
          return userAuthService.checkUser({ error_location: '/login'});
        }]
      }
    })
    .when('/login', {
      templateUrl: '/js/app/login/login.html',
      controller: 'LoginController',
      resolve: {
        data: ['userAuthService', function(userAuthService) {
          return userAuthService.checkUser({ success_location: '/dashboard'});
        }]
      }
    })
    .when('/reset/:token', {
      templateUrl: '/js/app/reset/reset.html',
      controller: 'ResetController',
      resolve: {
        data: ['userAuthService', function(userAuthService) {
          return userAuthService.checkUser();
        }]
      }
    })
    .when('/signup', {
      templateUrl: '/js/app/signup/signup.html',
      controller: 'SignUpController',
      resolve: {
        data: ['userAuthService', function(userAuthService) {
          return userAuthService.checkUser({ success_location: '/dashboard'});
        }]
      }
    })
    .when('/scenario/:id', {
      templateUrl: '/js/app/scenario/scenario.html',
      controller: 'ScenarioController',
      resolve: {
        data: ['userAuthService', function(userAuthService) {
          return userAuthService.checkUser();
        }]
      }
    })
    .when('/scenario-text/:id', {
      templateUrl: '/js/app/scenario-text/scenario-text.html',
      controller: 'ScenarioTextController',
      resolve: {
        data: ['userAuthService', function(userAuthService) {
          return userAuthService.checkUser();
        }]
      }
    })
    .when('/search/:key?', {
      templateUrl: '/js/app/search/search.html',
      controller: 'SearchController',
      resolve: {
        data: ['userAuthService', function(userAuthService) {
          return userAuthService.checkUser();
        }]
      }
    })
    .when('/settings', {
      templateUrl: '/js/app/settings/settings.html',
      controller: 'SettingsController',
      resolve: {
        data: ['userAuthService', function(userAuthService) {
          return userAuthService.checkUser({ error_location: '/login'});
        }]
      }
    })
    .when('/tags/:tag', {
      templateUrl: '/js/app/tags/tags.html',
      controller: 'TagsController',
      resolve: {
        data: ['userAuthService', function(userAuthService) {
          return userAuthService.checkUser();
        }]
      }
    })
    .when('/user/:id', {
      templateUrl: '/js/app/user/user.html',
      controller: 'UserController',
      resolve: {
        data: ['userAuthService', function(userAuthService) {
          return userAuthService.checkUser();
        }]
      }
    });

  }]);
}());
