(function() {
  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

    HomeController.$inject = ['api'];

    function HomeController(api) {
      var vm = this;

      api.getScenarios()
        .then(function(data) {
          vm.scenarios = data;
        });
    }
}());
