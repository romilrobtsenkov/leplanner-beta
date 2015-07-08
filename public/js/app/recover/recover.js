(function() {
  'use strict';

  angular
    .module('app')
    .controller('RecoverController', RecoverController);

    RecoverController.$inject = ['$scope','$location','api'];

    function RecoverController($scope,$location,api) {


      $scope.recover = function(user){

        // Save new password

        api.loginUser(user)
          .then(function(data) {

            if(data.user){
              //user id
              console.log(data.user.id);
            }

            if(data.error){
              switch (data.error.id) {
                case 10:
                  $scope.login_error = 'Wrong credentials';
                  break;
                default:
                  $scope.login_error = 'Unknown error';
              }
            }

        });
      };


    } // RecoverController end
}());
