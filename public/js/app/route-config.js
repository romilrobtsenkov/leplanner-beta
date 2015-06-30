(function() {
  'use strict';

  angular
    .module('app')
    .config(config)

  config.$inject = ['$routeProvider'];

  function config($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/js/app/home/home.html',
        controller: 'HomeController',
        controllerAs: 'vm'
      })
      .when('/add', {
        templateUrl: '/js/app/add/add.html',
        controller: 'AddController',
        controllerAs: 'vm'
      })
      .when('/login', {
        templateUrl: '/js/app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      });
  }
}());
