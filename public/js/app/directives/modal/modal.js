(function() {
  'use strict';

  angular
    .module('app')
    .directive('editcanvasmodal', ['$timeout',
    function($timeout) {
      return {
  			restrict: 'E',
        templateUrl: 'js/app/directives/modal/modal.html',
  			link: function postLink($scope, element, attrs) {

          var manageModal = function(show_or_hide){
            // fix digest issue
            $timeout(function() {
              var element = angular.element('#myModal');
              var ctrl = element.controller();
              ctrl.setModel($scope);
              element.modal(show_or_hide);
            }, 0);
          };

          $scope.setManageFunction({theDirFn: manageModal});
        },

      };
  }]);

}());
