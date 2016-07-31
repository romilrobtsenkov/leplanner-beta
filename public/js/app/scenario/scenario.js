(function () {
    'use strict';

    angular
    .module('app')
    .controller('ScenarioController', ['$scope', '$rootScope', '$routeParams', '$location', '$timeout', 'requestService', '$translate', '$window',
    function ($scope, $rootScope, $routeParams, $location, $timeout, requestService, $translate, $window) {

        if (typeof $routeParams.id !== 'undefined') {
            $scope.scenario_id = $routeParams.id;
        } else {
            $location.path('/');
        }

        // INIT
        /* FIXED */
        requestService.get('/scenarios/single/' + $scope.scenario_id)
        .then(function (data) {

            if (!data.scenario) { $scope.no_scenario = true; }

            $rootScope.title = data.scenario.name + ' - ' + data.scenario.author.first_name + ' ' + data.scenario.author.last_name + ' | Leplanner beta';

            /* ANALYTICS */
            $window.ga('send', 'pageview', {
                'page': $location.path(),
                'title': $rootScope.title
            });

            $scope.scenario = data.scenario;
            //$scope.activity_list = data.scenario.activities;
            $scope.is_favorite = data.is_favorite;
            $scope.is_following = data.is_following;

            //translating subjects
            for(var a = 0; a < $scope.scenario.subjects.length; a++){
                $scope.scenario.subjects[a].name = $scope.scenario.subjects[a]["name_"+$translate.use()];
            }

            //translate activities and displays
            for (var i = 0; i < $scope.scenario.activities.length; i++) {
                //translate activity organization
                $scope.scenario.activities[i].activity_organization.name = $rootScope.translated.organization[$scope.scenario.activities[i].activity_organization._id];

                if(!$scope.scenario.activities[i].materials ) { continue; }
                for (var m = 0; m < $scope.scenario.activities[i].materials.length; m++) {
                    for (var d = 0; d < $scope.scenario.activities[i].materials[m].displays.length; d++) {
                        //translate display name
                        $scope.scenario.activities[i].materials[m].displays[d].name = $rootScope.translated.displays[$scope.scenario.activities[i].materials[m].displays[d]._id];
                    }
                    //involvement_level
                    $scope.scenario.activities[i].materials[m].involvement.name = $rootScope.translated.co_authorship[$scope.scenario.activities[i].materials[m].involvement._id];
                }
            }

            $scope.fully_loaded = true;

            getSidebarScenarios();
            getComments();
        })
        .catch(function (error) {
            console.log(error);
            $scope.no_scenario = true;
        });

        /* FIXED */
        function getSidebarScenarios(){
            var q= {order: 'popular', limit: 3, exclude: $scope.scenario._id, author: $scope.scenario.author._id};
            requestService.get('/scenarios/widget/', q)
            .then(function(data) {
                if(data.scenarios){
                    if(data.scenarios.length > 0){
                        $scope.scenarios = data.scenarios;
                    }else{
                        $scope.no_popular_scenarios = true;
                    }
                }
            })
            .catch(function(error) {
                console.log(error);
            });
        }

        /* FIXED */
        function getComments(){

            requestService.get('/comments/scenario/'+$scope.scenario._id)
            .then(function(data) {
                if(data.comments){
                    if(data.comments.length > 0){
                        $scope.comments = data.comments;
                        $scope.scenario.comments_count = data.comments.length;
                    }
                }
            }).catch(function (error) { console.error(error); });
        }

        /* FIXED */
        $scope.addFavorite = function(){

            var params = {
                scenario_id: $scope.scenario._id
            };

            requestService.post('/favorites', params)
            .then(function(data) {
                console.log(data);

                $scope.is_favorite = true;
                $scope.scenario.favorites_count++;

            }).catch(function (err) {
                console.log(err);
            });
        };

        /* FIXED */
        $scope.removeFavorite = function(){

            requestService.post('/favorites/delete/' + $scope.scenario._id)
            .then(function(data) {

                console.log(data);

                $scope.is_favorite = false;
                $scope.scenario.favorites_count--;
            })
            .catch(function (err) {
                console.log(err);
            });

        };

        /* Fixed */
        $scope.addFollow = function(){

            requestService.post('/followers/' + $scope.scenario.author._id)
            .then(function(follower) {
                $scope.is_following = true;
            })
            .catch(function (error) {
                console.log(error);
            });
        };

        /* Fixed */
        $scope.removeFollow = function(){

            requestService.post('/followers/remove/' + $scope.scenario.author._id)
            .then(function(follower) {
                $scope.is_following = false;
            })
            .catch(function (error) {
                console.log(error);
            });
        };

        $scope.navigateToLogin = function($event){
            $event.preventDefault();
            $rootScope.navigatedToLoginFrom = $location.path();
            $location.path('/login');
        };

        /* FIXED */
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

            })
            .catch(function (error){

                $scope.adding_comment_in_progress = undefined;

                $translate('NOTICE.UNKNOWN').then(function (t) {
                    $scope.save_error = t + ': ' + error.data;
                });
                $timeout(function() { $scope.save_error = null; }, 2000);
            });

        };

        // disable delete button while deleting
        $scope.showDeleteText = function(comment_id){

            if($scope.is_deleting === comment_id){ return true; }
            return false;
        };

        /* FIXED */
        $scope.deleteComment = function(comment_id, text){
            var del = window.confirm("Are you sure that you want to delete comment: "+text);
            if (!del) { return; }

            $scope.is_deleting = comment_id;

            //deleting...
            $translate('NOTICE.DELETING').then(function (t) {
                $scope.comment_delete_text = t;
            });

            requestService.post('/comments/delete/' + comment_id)
            .then(function(data) {

                // deleted
                $translate('NOTICE.DELETED').then(function (t) {
                    $scope.comment_delete_text = t;
                });

                $timeout(function() {
                    $scope.is_deleting = undefined;
                    getComments();
                }, 1500);

            })
            .catch(function (error) {
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

        /* FIXED */
        $scope.createCopy = function(){

            var p = window.confirm($rootScope.translated.copy_confirm);

            if(!p){ return; }

            requestService.get('/scenarios/copy/'+$scope.scenario_id)
            .then(function(data) {
                console.log(data);
                if (!data._id) { window.alert('something went wrong'); }

                //redirect user to edit page
                $location.path('/edit/'+data._id);

            })
            .catch(function (error) {
                console.log(error);
                window.alert('something went wrong');
            });
        };

        $scope.hasErasmusTag = function(tag){

            if (!$scope.scenario.tags) { return false; }
            for(var i = 0; i < $scope.scenario.tags.length; i++){
                if ($scope.scenario.tags[i].text === tag) {
                    return true;
                }
            }

            return false;
        };

    }]); // ScenarioController end
}());
