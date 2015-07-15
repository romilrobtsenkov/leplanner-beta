(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainController', MainController);

    MainController.$inject = ['$scope','$rootScope','$location','userService',];

    function MainController($scope,$rootScope,$location,userService) {

      $scope.logout = function(){
        userService.logOutUser()
          .then(function(data){
            console.log(data);
            $scope.user = null;
            $rootScope.user = null;
            $location.path('/login');
          });
      };

      $scope.subject_list = ['Maths', 'History', 'English', 'Basic Education', 'Biology', 'Estonian (native language)', 'Estonian (foreign language)',
          'Speciality language', 'Special Education', 'Physics', 'Geography', 'Educational Technology', 'Informatics', 'Human Studies', 'Chemistry', 'Physical Education',
          'Literary', 'Home Economics', 'Arts', 'Crafts', 'Natural Science', 'Economics and Business', 'Media Studies', 'Music', 'French', 'Swedish', 'German', 'Finnish',
          'Handicraft and Home Economics', 'Russian (native language)', 'Russian (foreign language)', 'Social Education'];

    } // MainController end
}());
