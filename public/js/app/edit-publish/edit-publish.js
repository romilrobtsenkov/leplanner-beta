(function() {
    'use strict';

    angular
    .module('app')
    .controller('EditPublishController', ['$scope','$rootScope','$timeout','$routeParams','$location','requestService','$translate','$window','Notification',
    function($scope,$rootScope,$timeout,$routeParams,$location,requestService, $translate,$window, Notification) {

        if(typeof $routeParams.id !== 'undefined'){
            $scope.scenario_id = $routeParams.id;
        }else{
            $location.path('/');
        }

        var prevData = null;

        init();

        function init(){

            requestService.post('/scenarios/single-edit/' + $scope.scenario_id)
            .then(function(data) {

                $scope.scenario = data.scenario;
                prevData = JSON.parse(JSON.stringify($scope.scenario));

                $translate('PAGE.EDIT').then(function (t) {
                    $rootScope.title = t+' '+$scope.scenario.name+' details | Leplanner beta';

                    /* ANALYTICS */
                    $window.ga('send', 'pageview', {
                        'page': $location.path(),
                        'title': $rootScope.title
                    });
                });

                loadDropdownData();

            })
            .catch(function (error) {
                console.log(error);

                $translate('NOTICE.NO_SCENARIO').then(function (t) {
                    $scope.errorMessage = t;
                });
            });
        }

        function loadDropdownData(){

            // PUBLISH / DRAFT dropdown
            //$scope.publish_options = [{name: 'Draft', value: true},{name: 'Published', value: false}];
            $scope.publish_options = [{name: $rootScope.translated.dropdowns.draft, value: true},{name: $rootScope.translated.dropdowns.published, value: false}];
            $scope.language_options = [{name: $rootScope.translated.dropdowns.estonian, value: 'et'},{name: $rootScope.translated.dropdowns.english, value: 'en'},{name: $rootScope.translated.dropdowns.croatian, value: 'hr'}];

            $scope.fully_loaded = true;

            addWatchListeners();

        }

        function addWatchListeners(){

            $scope.watch_init_event = true;

            $scope.$watch("scenario", function(v) {
                userChangedScenario();
            }, true);
        }

        $scope.deleteScenario = function(){

            var del = window.confirm($rootScope.translated.confirm);
            if(!del){ return; }

            requestService.post('/scenarios/delete/' + $scope.scenario._id)
            .then(function(data) {
                console.log('deleted');
                $location.path('/dashboard');
            })
            .catch(function (error) {
                console.log(error);
                //$scope.errorMessage = 'Please try reloading the page';
                $translate('NOTICE.RELOAD').then(function (t) {
                    $scope.errorMessage = t;
                });
            });
        };

        function userChangedScenario(){

            if(!angular.equals($scope.scenario, prevData)) {
                saveScenarioData();
            }
        }

        function saveScenarioData(nextUrl) {

            $scope.saving_in_progress = true;

            // Save on lang and draft
            var params = {
                scenario: {
                    _id: $scope.scenario._id,
                    author: $scope.scenario.author,
                    draft: $scope.scenario.draft,
                    language: $scope.scenario.language,
                },
                publish: true
            };

            requestService.post('/scenarios/save', params)
            .then(function(data) {

                console.log('saved scenario');

                // For future comparison
                prevData = JSON.parse(JSON.stringify($scope.scenario));

                if(nextUrl){
                    isLeaving = true; // inside saveScenario!
                    isSaved = true;
                    $location.path(nextUrl.substring($location.absUrl().length - $location.url().length));
                }

                $translate('NOTICE.ALL_SAVED').then(function (t) {
                     Notification.success({message: t, delay: 3000, positionY: 'bottom'});
                });

                $scope.saving_in_progress = undefined;
                $scope.errorMessage = null;

            })
            .catch(function (error) {
                console.log(error);

                $scope.saving_in_progress = undefined;

                $translate('NOTICE.UNKNOWN').then(function (t) {
                    $scope.errorMessage = t;
                });
                $timeout(function() { $scope.errorMessage = null; }, 2000);
            });
        }

        var isLeaving = false;
        var isSaved = false;
        $scope.$on('$locationChangeStart', function( event, nextUrl ) {

            // check if really changed
            if(!isLeaving && !isSaved && !angular.equals($scope.scenario, prevData)) {
                saveScenarioData(nextUrl);
            }else{
                isLeaving = true;
            }
            if (!isLeaving) {
                event.preventDefault();
            }

        });

        /* trigger save before closing tab or window */
        window.addEventListener("beforeunload", function (e) {
          var confirmationMessage = "\o/";

          if(!angular.equals($scope.scenario, prevData)) {
              saveScenarioData();
              (e || window.event).returnValue = confirmationMessage; //Gecko + IE
              return confirmationMessage;                            //Webkit, Safari, Chrome
          }
        });

    }]); //EditPublishController end
}());
