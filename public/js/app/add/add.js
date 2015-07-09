(function() {
  'use strict';

  angular
    .module('app')
    .controller('AddController', AddController);

    AddController.$inject = ['userService'];

    function AddController(userService) {

      // rootscope user!
      /*userService.getUser()
        .then(function(data) {
          console.log(data);
        }).catch(function(fallback) {
          //401
          console.log(fallback.status);
        });*/
    }
}());
