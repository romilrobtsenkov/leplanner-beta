(function() {
  'use strict';

  angular
    .module('app')
    .controller('ModalCtrl', ['$scope',
    function($scope) {
       this.setModel = function(data) {
          $scope.$apply( function() {
             $scope = data;
          });
       };
       $scope.setModel = this.setModel;

   }]); // ModalCtrl end
}());
