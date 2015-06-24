(function() {

  angular
    .module('app')
    .config(config);

  config.$inject = ['$routeProvider'];

  function config($routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: '/js/app/home/home.html',
        controller: 'HomeController'
      });
  }
}());
