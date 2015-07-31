(function() {
  'use strict';

  angular
    .module('app')
    .controller('ResetController', ResetController);

    ResetController.$inject = ['$scope','$location','$routeParams','userService'];

    function ResetController($scope,$location,$routeParams,userService) {

      $rootScope.title = 'Password reset | Leplanner beta';

      $scope.reset = function(user){

        if(
           typeof user.new_password != 'undefined' &&
           typeof user.new_password_twice != 'undefined'
          ){
            if(user.new_password == user.new_password_twice){

                // Save new password
                user.token = $routeParams.token;

                userService.resetPassword(user)
                  .then(function(data) {
                    console.log(data);
                    if(data.user){
                      //user id
                      console.log(data.user.id);
                      $scope.reset_error = 'successfully changed';
                      $location.path('/login');
                    }

                    if(data.error){
                      switch(data.error.id) {
                        case 5:
                          $scope.reset_error = 'Password has to be min 8 chars long';
                          break;
                        case 7:
                          $scope.reset_error = 'Please enter all fields';
                          break;
                        case 9:
                          $scope.reset_error = 'New passwords dont match';
                          break;
                        case 10:
                          $scope.reset_error = 'Request new token';
                          break;
                        case 11:
                          $scope.reset_error = 'Token expired';
                          break;
                        default:
                          $scope.reset_error = 'Unknown error';
                      }
                    }

                });

            }else{
              $scope.updatePassword_error = 'New passwords dont match';
            }

        }else{
          $scope.updatePassword_error = 'All fields are required';
        }

      };

    } // ResetController end
}());
