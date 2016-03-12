(function() {
  'use strict';

  angular
    .module('app')
    .controller('ScenarioController', ['$scope','$rootScope','$routeParams','$location','$timeout','requestService','$translate',
    function($scope,$rootScope,$routeParams,$location,$timeout,requestService,$translate) {

      if(typeof $routeParams.id !== 'undefined'){
        $scope.scenario_id = $routeParams.id;
      }else{
        $location.path('/');
      }

      $scope.activity_list = [];
      $scope.materials = [];

      // single scenario details
      var params = {
        scenario: {
          _id: $scope.scenario_id
        }
      };

      if(typeof $rootScope.user !== 'undefined'){
        params.user = {
          _id :$rootScope.user._id
        };
      }

      // INIT
      requestService.post('/scenario/single-scenario', params)
        .then(function(data) {
          if(data.scenario){

            $rootScope.title = data.scenario.name+' - '+data.scenario.author.first_name+' '+data.scenario.author.last_name+' | Leplanner beta';

            $scope.scenario = data.scenario;
            $scope.activity_list = data.scenario.activities;
            $scope.is_favorite = data.is_favorite;
            $scope.is_following = data.is_following;
            //console.log(data.scenario);
            if(typeof data.materials !== 'undefined'){
              $scope.materials = data.materials;

              updateActivityList();
              //console.log($scope.activity_list);
              //console.log('Loaded materials');
            }
            loadMetaData();
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

      function loadMetaData(){

        requestService.get('/meta/get-scenario-meta')
        .then(function(data) {

          if(data.subjects && data.activity_organization && data.involvement_options && data.displays){
            $scope.subjects = data.subjects;
            $scope.activity_organization = data.activity_organization;
            $scope.involvement_options = data.involvement_options;
            $scope.displays_list = data.displays;

            $scope.fully_loaded = true;

          }else{
            //$scope.errorMessage = 'Please try reloading the page';
            $translate('NOTICE.RELOAD').then(function (t) {
                $scope.errorMessage = t;
            });
          }

          if(data.error){
            console.log(data.error);
            //$scope.errorMessage = 'Please try reloading the page';
            $translate('NOTICE.RELOAD').then(function (t) {
                $scope.errorMessage = t;
            });
          }
        });

      }

      function getSidebarScenarios(){
        var q= {order: 'popular', limit: 3, exclude: $scope.scenario._id, author: $scope.scenario.author._id};
        requestService.post('/scenario/widget-list', q)
          .then(function(data) {
            if(data.scenarios){
              if(data.scenarios.length > 0){
                $scope.scenarios = data.scenarios;
              }else{
                $scope.no_popular_scenarios = true;
              }

            }
            if(data.error){
              console.log(data.error);
            }
        });
      }

      function getComments(){
        requestService.post('/scenario/comments', {scenario_id: $scope.scenario._id})
          .then(function(data) {
            //console.log(data);
            if(data.comments){
              //console.log(data.comments);
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

        requestService.post('/scenario/add-remove-favorite', params)
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

        requestService.post('/user/add-remove-follow', params)
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
          //$scope.save_error = "Comment text cannot be empty";
          $translate('NOTICE.COMMENT_EMPTY').then(function (t) {
              $scope.save_error = t;
          });
          $timeout(function() { $scope.save_error = null; }, 2000);
          return;
        }

        $scope.adding_comment_in_progress = true;

        var params = {
          comment: {
            text: comment.text
          },
          user: {
            _id: $rootScope.user._id
          },
          scenario: {
            _id: $scope.scenario_id
          },
          author: {
            _id: $scope.scenario.author._id
          }
        };

        requestService.post('/scenario/add-comment', params)
          .then(function(data) {

            $scope.adding_comment_in_progress = undefined;

            if(data.comments){
              $scope.comments = data.comments;
              $scope.scenario.comments_count = data.comments.length;
              comment.text = undefined;
              //$scope.save_success = "Comment posted successfully!";
              $translate('NOTICE.COMMENT_SUCCESS').then(function (t) {
                  $scope.save_success = t;
              });

              $timeout(function() { $scope.save_success = null; }, 2000);
            }

            if(data.error){
              switch (data.error.id) {
                case 100:
                  // user changed
                  $location.path('/');
                  break;
                case 0:
                  //$scope.save_error = "Comment text cannot be empty";
                  $translate('NOTICE.COMMENT_EMPTY').then(function (t) {
                      $scope.save_error = t;
                  });
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
          //$scope.comment_delete_text = "deleting...";
          $translate('NOTICE.DELETING').then(function (t) {
              $scope.comment_delete_text = t;
          });

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

          requestService.post('/scenario/delete-comment', params)
            .then(function(data) {
              if(data.comments){

                //$scope.comment_delete_text = "deleted";
                $translate('NOTICE.DELETED').then(function (t) {
                    $scope.comment_delete_text = t;
                });

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
                    //$scope.comment_delete_text = "error, no rights";
                    $translate('NOTICE.NO_RIGHTS').then(function (t) {
                        $scope.comment_delete_text = t;
                    });
                    console.log("No rights");
                    break;
                  default:
                    console.log(data.error);
                }

                //$scope.comment_delete_text = "error, refresh the page";
                $translate('NOTICE.RELOAD').then(function (t) {
                    $scope.comment_delete_text = t;
                });
                $timeout(function() {
                  $scope.is_deleting = undefined;
                }, 2000);

              }
          });

        }
      };

      var updateActivityList = function(){
        // add material to relevant activities
        for(var i = 0; i < $scope.activity_list.length; i++){

          // empty materials
          $scope.activity_list[i].materials = undefined;

          for(var j = 0; j < $scope.materials.length; j++){
            if($scope.activity_list[i]._id == $scope.materials[j].activity_id){
              if(typeof $scope.activity_list[i].materials == 'undefined'){
                $scope.activity_list[i].materials = [];
              }
              $scope.activity_list[i].materials.push($scope.materials[j]);
            }
          }
        }

      };


  }]); // ScenarioController end
}());
