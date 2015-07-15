(function() {
  'use strict';

  angular
    .module('app')
    .controller('CreateController', CreateController);

    CreateController.$inject = ['userService'];

    function CreateController(userService) {

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
