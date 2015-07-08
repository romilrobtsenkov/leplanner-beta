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
            return userRouteService.getUser();
          },
        }
      })
      .when('/add', {
        templateUrl: '/js/app/add/add.html',
        controller: 'AddController',
        resolve: {
          checkUser: function($q, $rootScope, $location,$http){
            var deferred = $q.defer();
            $http({url: '/api/users/me', method: 'GET'})
            .success(function (data, status, headers, config) {
             if(!$rootScope.user){
                //console.log('rootscope null, saved to rootscope');
                $rootScope.user = data;
                deferred.resolve();
             }else{
               deferred.resolve();
             }
            })
            .error(function (data, status, headers, config) {
              $rootScope.user = null;
              $location.path('/login');
              deferred.resolve();
            });
            return deferred.promise;
          }
        }
      })
      .when('/login', {
        templateUrl: '/js/app/login/login.html',
        controller: 'LoginController',
        resolve: {
          checkUser: function($q, $rootScope, $location,$http){
            var deferred = $q.defer();
            $http({url: '/api/users/me', method: 'GET'})
            .success(function (data, status, headers, config) {
             if(!$rootScope.user){
                //console.log('rootscope null, saved to rootscope');
                $rootScope.user = data;
                $location.path('/');
                deferred.resolve();
             }else{
               $location.path('/');
               deferred.resolve();
             }
            })
            .error(function (data, status, headers, config) {
              $rootScope.user = null;
              deferred.resolve();
            });
            return deferred.promise;
          }
        }
      })
      .when('/settings', {
        templateUrl: '/js/app/settings/settings.html',
        controller: 'SettingsController',
        resolve: {
          checkUser: function($q, $rootScope, $location,$http){
            var deferred = $q.defer();
            $http({url: '/api/users/me', method: 'GET'})
            .success(function (data, status, headers, config) {
             if(!$rootScope.user){
                //console.log('rootscope null, saved to rootscope');
                $rootScope.user = data;
                deferred.resolve();
             }else{
               deferred.resolve();
             }
            })
            .error(function (data, status, headers, config) {
              $rootScope.user = null;
              $location.path('/login');
              deferred.resolve();
            });
            return deferred.promise;
          }
        }
      })
      .when('/recover/:token', {
        templateUrl: '/js/app/recover/recover.html',
        controller: 'RecoverController'
      });
  }

}());
