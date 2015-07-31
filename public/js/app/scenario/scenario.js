(function() {
  'use strict';

  angular
    .module('app')
    .controller('ScenarioController', ScenarioController);

    ScenarioController.$inject = ['$scope','$rootScope','$routeParams','$location','$timeout','scenarioService', 'userService'];

    function ScenarioController($scope,$rootScope,$routeParams,$location,$timeout,scenarioService,userService) {

      if(typeof $routeParams.id !== 'undefined'){
        $scope.scenario_id = $routeParams.id;
      }else{
        $location.path('/');
      }

      // single scenario details
      var params = {};
      params.scenario_id = $scope.scenario_id;
      if(typeof $rootScope.user !== 'undefined'){
        params.user_id = $rootScope.user._id;
      }
      scenarioService.getSingleScenario(params)
        .then(function(data) {
          //console.log(data);
          if(data.scenario){
            $scope.scenario = data.scenario;
            $scope.is_favorite = data.is_favorite;
            $scope.is_following = data.is_following;
            //console.log(data.scenario);
            getSidebarScenarios();
            getComments();
          }

          if(data.error){
            switch (data.error.id) {
              case 0:
                $scope.no_scenario = true;
                break;
              default:
                $scope.no_scenario = true;
                console.log(data.error);
            }
          }
      });

      function getSidebarScenarios(){
        var q= {order: 'popular', limit: 3, exclude: $scope.scenario._id};
        scenarioService.getWidgetScenarios(q)
          .then(function(data) {
            if(data.scenarios){
              $scope.scenarios = data.scenarios;
            }
            if(data.error){
              console.log(data.error);
            }
        });
      }

      function getComments(){
        scenarioService.getComments({scenario_id: $scope.scenario._id})
          .then(function(data) {
            //console.log(data);
            if(data.comments){
              console.log(data.comments);
              if(data.comments.length > 0){
                $scope.comments = data.comments;
              }
            }
            if(data.error){
              console.log(data.error);
            }
        });
      }

      $scope.addRemoveFavorite = function(remove){

        var params = {
          user: {
            _id: $rootScope.user._id
          },
          scenario_id: $scope.scenario._id
        };

        if(typeof remove !== 'undefined'){
          params.remove = true;
        }

        scenarioService.addRemoveFavorite(params)
          .then(function(data) {

            if(data.success){

              if(data.success == 'remove'){
                $scope.is_favorite = false;
                $scope.scenario.favorites_count--;
              }else{
                $scope.is_favorite = true;
                $scope.scenario.favorites_count++;
              }
            }

            if(data.error){
              switch (data.error.id) {
                case 100:
                  // user changed
                  $location.path('/');
                  break;
                default:
                  console.log(data.error);

              }
            }
        });
      };

      $scope.addRemoveFollow = function(remove_follow){

        var params = {
          user: {
            _id: $rootScope.user._id
          },
          following: {
            _id: $scope.scenario.author._id
          }
        };

        if(typeof remove_follow !== 'undefined'){
          params.remove_follow = true;
        }

        userService.addRemoveFollow(params)
          .then(function(data) {

            if(data.success){
              //console.log(data.success);
              if(data.success == 'unfollow'){
                $scope.is_following = false;
              }else{
                $scope.is_following = true;
              }
            }

            if(data.error){
              switch (data.error.id) {
                case 100:
                  // user changed
                  $location.path('/');
                  break;
                default:
                  console.log(data.error);

              }
            }
        });
      };

      $scope.navigateToLogin = function($event){
        $event.preventDefault();
        $rootScope.navigatedToLoginFrom = $location.path();
        $location.path('/login');
      };

      $scope.addComment = function(comment){
        if(typeof comment === 'undefined' || typeof comment.text == 'undefined' ){
          $scope.save_error = "Comment text cannot be empty";
          $timeout(function() { $scope.save_error = null; }, 2000);
          return;
        }

        var params = {
          comment: {
            text: comment.text
          },
          user: {
            _id: $rootScope.user._id
          },
          scenario: {
            _id: $scope.scenario_id
          }
        };

        scenarioService.addComment(params)
          .then(function(data) {
            if(data.comments){
              $scope.comments = data.comments;
              $scope.scenario.comments_count = data.comments.length;
              comment.text = undefined;
              $scope.save_success = "Comment posted successfully!";
              $timeout(function() { $scope.save_success = null; }, 2000);
            }

            if(data.error){
              switch (data.error.id) {
                case 100:
                  // user changed
                  $location.path('/');
                  break;
                case 0:
                  $scope.save_error = "Comment text cannot be empty";
                  $timeout(function() { $scope.save_error = null; }, 2000);
                  break;
                default:
                  console.log(data.error);
              }
            }
        });

      };

      // disable delete button while deleting
      $scope.showDeleteText = function(comment_id){
        if($scope.is_deleting == comment_id){
          return true;
        }else{
          return false;
        }
      };

      $scope.deleteComment = function(comment_id, text){
        var del = confirm("Are you sure that you want to delete comment: "+text);
        if (del === true) {

          $scope.is_deleting = comment_id;
          $scope.comment_delete_text = "deleting...";

          var params = {
            user: {
              _id: $rootScope.user._id
            },
            scenario: {
              _id: $scope.scenario_id
            },
            comment: {
              _id: comment_id
            }
          };

          scenarioService.deleteComment(params)
            .then(function(data) {
              if(data.comments){

                $scope.comment_delete_text = "deleted";

                $timeout(function() {
                  $scope.is_deleting = undefined;
                  $scope.comments = data.comments;
                  $scope.scenario.comments_count = data.comments.length;

                }, 1500);

              }

              if(data.error){
                switch (data.error.id) {
                  case 100:
                    // user changed
                    $location.path('/');
                    break;
                  case 3:
                    $scope.comment_delete_text = "error, no rights";
                    console.log("No rights");
                    break;
                  default:
                    console.log(data.error);
                }

                $scope.comment_delete_text = "error, refresh the page";
                $timeout(function() {
                  $scope.is_deleting = undefined;
                }, 2000);

              }
          });

        }
      };

    }
}());
