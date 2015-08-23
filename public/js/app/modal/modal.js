(function() {
  'use strict';

  angular
    .module('app')
    .controller('ModalCtrl', ModalCtrl);

    ModalCtrl.$inject = ['$scope'];

    function ModalCtrl($scope) {
       this.setModel = function(data) {
          $scope.$apply( function() {
             $scope = data;
          });
       };
       $scope.setModel = this.setModel;

    } // ModalCtrl end
}());
