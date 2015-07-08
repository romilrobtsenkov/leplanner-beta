(function() {
  'use strict';

  angular
    .module('app')
    .controller('AddController', AddController);

    AddController.$inject = ['api'];

    function AddController(api) {

      // rootscope user!
      /*api.getUser()
        .then(function(data) {
          console.log(data);
        }).catch(function(fallback) {
          //401
          console.log(fallback.status);
        });*/
    }
}());
