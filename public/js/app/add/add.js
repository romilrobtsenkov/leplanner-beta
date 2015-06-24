(function() {
  'use strict';

  angular
    .module('app')
    .controller('AddController', AddController);

    AddController.$inject = ['api'];

    function AddController(api) {
      var vm = this;

      api.getUser()
        .then(function(data) {
          vm.user = data;
        });
    }
}());
