(function () {
'use strict';

angular
    .module('app')
     .controller('ScenarioController', ['$scope', '$rootScope', '$routeParams', '$location',
        '$timeout', 'requestService', '$translate', '$window',
          function ($scope, $rootScope, $routeParams, $location, $timeout, requestService,
              $translate, $window) {

            if (typeof $routeParams.id !== 'undefined') {
              $scope.scenario_id = $routeParams.id;
            } else {
              $location.path('/');
            }

            $scope.activity_list = [];
            $scope.materials = [];

            // single scenario details
            var params = {
                scenario: {
                    _id: $scope.scenario_id,
                  },
              };

            if (typeof $rootScope.user !== 'undefined') {
              params.user = {
                _id: $rootScope.user._id,
              };
            }

            // INIT
            requestService.post('/scenario/single-scenario', params)
            .then(function (data) {
                if (data.scenario) {

                    $rootScope.title = data.scenario.name + ' - ' + data.scenario.author.first_name + ' ' + data.scenario.author.last_name + ' | Leplanner beta';

                    /* ANALYTICS */
                    $window.ga('send', 'pageview', {
                    'page': $location.path(),
                    'title': $rootScope.title
                    });

                    $scope.scenario = data.scenario;
                    $scope.activity_list = data.scenario.activities;
                    $scope.is_favorite = data.is_favorite;
                    $scope.is_following = data.is_following;
                    $scope.scenario.child_scenarios = data.child_scenarios;
                    if(data.mother_scenario_author){
                      $scope.scenario.mother_scenario.author = data.mother_scenario_author;
                    }

                    //translating subjects
                    for(var a = 0; a < $scope.scenario.subjects.length; a++){
                        $scope.scenario.subjects[a].name = $scope.scenario.subjects[a]["name_"+$translate.use()];
                    }

                    //console.log($scope.scenario.mother_scenario);
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

                        //load translations
                        if($rootScope.translated && $rootScope.translated.organization){
                            for(var i = 0; i < $scope.activity_organization.length; i++){
                                $scope.activity_organization[i].name = $rootScope.translated.organization[i];
                            }
                        }
                        if($rootScope.translated && $rootScope.translated.co_authorship){
                            for(var j = 0; j < $scope.involvement_options.length; j++){
                                $scope.involvement_options[j].name = $rootScope.translated.co_authorship[j];
                            }
                        }
                        if($rootScope.translated && $rootScope.translated.displays){
                            for(var k = 0; k < $scope.displays_list.length; k++){
                                $scope.displays_list[k].name = $rootScope.translated.displays[k];
                            }
                        }

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

                requestService.get('/comments/scenario/'+$scope.scenario._id)
                .then(function(data) {
                    if(data.comments){
                        if(data.comments.length > 0){
                            $scope.comments = data.comments;
                            $scope.scenario.comments_count = data.comments.length;
                        }
                    }
                },function (error) { console.error(error); });
            }

            $scope.addFavorite = function(){

                var params = {
                    scenario_id: $scope.scenario._id
                };

                requestService.post('/favorites', params)
                .then(
                    function(data) {

                        console.log(data);

                        $scope.is_favorite = true;
                        $scope.scenario.favorites_count++;

                    },
                    function(err){
                        console.log(err);
                    });
            };

            $scope.removeFavorite = function(){

                requestService.post('/favorites/delete/'+$scope.scenario._id)
                .then(
                    function(data) {

                        console.log(data);

                        $scope.is_favorite = false;
                        $scope.scenario.favorites_count--;
                    },
                    function(err){
                        console.log(err);
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
                        if(data.success === 'unfollow'){
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

                if (typeof comment === 'undefined' || typeof comment.text === 'undefined') {

                    // Comment text cannot be empty
                    $translate('NOTICE.COMMENT_EMPTY').then(function (t) {
                        $scope.save_error = t;
                    });
                    $timeout(function() { $scope.save_error = null; }, 2000);

                    return;
                }

                $scope.adding_comment_in_progress = true;

                var params = {
                    comment: { text: comment.text },
                    scenario: { _id: $scope.scenario_id },
                    author: { _id: $scope.scenario.author._id }
                  };

                requestService.post('/comments', params)
                .then(function(data) {

                    $scope.adding_comment_in_progress = undefined;
                    comment.text = undefined;

                    // Comment posted successfully!
                    $translate('NOTICE.COMMENT_SUCCESS').then(function (t) {
                        $scope.save_success = t;
                    });
                    $timeout(function() { $scope.save_success = null; }, 2000);

                    getComments();

                },
                function (error) {

                    $scope.adding_comment_in_progress = undefined;

                    $translate('NOTICE.UNKNOWN').then(function (t) {
                        $scope.save_error = t + ': ' + error.data;
                    });
                    $timeout(function() { $scope.save_error = null; }, 2000);
                });

            };

            // disable delete button while deleting
            $scope.showDeleteText = function(comment_id){
                if($scope.is_deleting === comment_id){
                    return true;
                }else{
                    return false;
                }
            };

            $scope.deleteComment = function(comment_id, text){
                var del = window.confirm("Are you sure that you want to delete comment: "+text);
                if (!del) { return; }

                $scope.is_deleting = comment_id;

                //deleting...
                $translate('NOTICE.DELETING').then(function (t) {
                    $scope.comment_delete_text = t;
                });

                requestService.post('/comments/delete/'+comment_id, params)
                .then(function(data) {

                    // deleted
                    $translate('NOTICE.DELETED').then(function (t) {
                        $scope.comment_delete_text = t;
                    });

                    $timeout(function() {
                        $scope.is_deleting = undefined;
                        getComments();
                    }, 1500);

                },
                function (error) {
                    console.log(error);
                    switch (error.status) {
                        case 403:
                            // "error, no rights"
                            $translate('NOTICE.NO_RIGHTS').then(function (t) {
                                $scope.comment_delete_text = t;
                            });
                            $timeout(function() {
                                $scope.is_deleting = undefined;
                            }, 2000);

                            break;
                        default:
                            // "error, refresh the page"
                            $translate('NOTICE.RELOAD').then(function (t) {
                                $scope.comment_delete_text = t;
                            });
                            $timeout(function() {
                                $scope.is_deleting = undefined;
                            }, 2000);
                    }
                });

            };

            var updateActivityList = function(){
                // add material to relevant activities
                for(var i = 0; i < $scope.activity_list.length; i++){

                    // empty materials
                    $scope.activity_list[i].materials = undefined;

                    for(var j = 0; j < $scope.materials.length; j++){
                        if($scope.activity_list[i]._id === $scope.materials[j].activity_id){
                            if(typeof $scope.activity_list[i].materials === 'undefined'){
                                $scope.activity_list[i].materials = [];
                            }
                            $scope.activity_list[i].materials.push($scope.materials[j]);
                        }
                    }
                }

            };

            $scope.createCopy = function(){

                var p = window.confirm($rootScope.translated.copy_confirm);

                if(!p){ return; }

                requestService.get('/scenario/copy/'+$scope.scenario_id)
                .then(function(data) {

                    //console.log(data);

                    if(data.success){

                        //redirect user to edit page
                        $location.path('/edit-details/'+data.success._id);

                    }

                    if(data.error){
                        switch (data.error.id) {
                            case 100:
                            // user changed
                            $location.path('/');
                            break;
                            case 0:
                            //$scope.save_error = "Comment text cannot be empty";
                            console.log(data.error);
                            window.alert('something went wrong');
                            break;
                            default:
                            console.log(data.error);
                            window.alert('something went wrong');
                        }
                    }
                });
            };

            $scope.hasErasmusTag = function(tag){
                if(!$scope.scenario.tags){return false;}

                for(var i = 0; i < $scope.scenario.tags.length; i++){
                    if($scope.scenario.tags[i].text === tag){
                        return true;
                    }
                }

                return false;

            };

    }]); // ScenarioController end
}());
