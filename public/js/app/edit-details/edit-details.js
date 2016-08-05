(function() {
    'use strict';

    angular
    .module('app')
    .controller('EditDetailsController', ['$scope','$rootScope','$timeout','$routeParams','$location','requestService','$translate','$window','Notification',
    function($scope,$rootScope,$timeout,$routeParams,$location,requestService, $translate,$window, Notification) {

        if(typeof $routeParams.id !== 'undefined'){
            $scope.scenario_id = $routeParams.id;
        }else{
            $location.path('/');
        }

        $scope.subjects_list = [];

        var prevData = null;

        init();

        function init(){

            requestService.post('/scenarios/single-edit/' + $scope.scenario_id)
            .then(function(data) {

                $scope.scenario = data.scenario;
                prevData = JSON.parse(JSON.stringify($scope.scenario));

                if($scope.scenario.outcomes.length === 0){
                    $scope.scenario.outcomes.push(createNewEmptyOutcome());
                    console.log('added empty outcome init');
                }

                if($scope.scenario.activities.length === 0){
                    $scope.scenario.activities.push(createNewEmptyActivity());
                    console.log('added empty activity init');
                }

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

            requestService.get('/meta/scenario')
            .then(function(data) {

                $scope.subjects_list = data.subjects;
                $scope.activity_organization = data.activity_organization;

                //translate
                for(var a = 0; a < $scope.subjects_list.length; a++){
                    $scope.subjects_list[a].name = $scope.subjects_list[a]["name_"+$translate.use()];
                }

                if($rootScope.translated && $rootScope.translated.organization){
                    for(var i = 0; i < $scope.activity_organization.length; i++){
                        $scope.activity_organization[i].name = $rootScope.translated.organization[i];
                    }
                }

                $scope.fully_loaded = true;

                createDropdowns();
                addWatchListeners();

            })
            .catch(function (error) {
                console.log(error);
                $translate('NOTICE.RELOAD').then(function (t) {
                    $scope.errorMessage = t;
                });
            });

        }

        function createDropdowns(){

            $scope.subjectsSettings = {
                scrollableHeight: '250px',
                scrollable: true,
                smartButtonMaxItems: 1,
                displayProp: 'name',
                showCheckAll: false,
                enableSearch: true,
                //showUncheckAll: false,
                idProp: '_id',
                externalIdProp: '',
                buttonClasses: 'btn btn-default',
            };
            //$scope.subjectsText = {buttonDefaultText: 'Subjects'};
            $scope.subjectsText = {
                buttonDefaultText: $rootScope.translated.dropdowns.subjects,
                uncheckAll: $rootScope.translated.dropdowns.uncheck_all,
                searchPlaceholder: $rootScope.translated.dropdowns.search
            };

            $scope.outcomesSettings = {
                scrollableHeight: '200px',
                scrollable: true,
                smartButtonMaxItems: 1,
                displayProp: 'name',
                showCheckAll: false,
                showUncheckAll: false,
                idProp: '_id',
                externalIdProp: '',
                buttonClasses: 'btn btn-default',
            };
            //$scope.outcomesText = {buttonDefaultText: 'Learning outcomes'};
            $scope.outcomesText = {buttonDefaultText: $rootScope.translated.dropdowns.learning_outcomes};

            $scope.activity_organizationSettings = {
                scrollableHeight: '200px',
                scrollable: false,
                selectionLimit: 1,
                smartButtonMaxItems: 1,
                displayProp: 'name',
                showCheckAll: false,
                showUncheckAll: false,
                closeOnSelect: true,
                idProp: '_id',
                externalIdProp: '',
                buttonClasses: 'btn btn-default',
            };
            $scope.activity_organizationText = {buttonDefaultText: 'Organization'}; // it is not used, first selection marked as default

        }

        function addWatchListeners(){

            $scope.$watch("scenario", function(v) {
                userChangedScenario();
            }, true);

            //resize textare on change
            $scope.$watch("scenario.description", function(v) {
                $scope.resizeTextarea();
            }, true);
        }

        $scope.resizeTextarea = function(){
            var el = angular.element("#description")[0];
            var heightLimit = 400;
            el.style.height = ""; /* Reset the height*/
            el.style.height = Math.min(el.scrollHeight, heightLimit) + "px";
        };

        $scope.addNewOutcomeItem = function(){
            var new_outcome = createNewEmptyOutcome();
            $scope.scenario.outcomes.push(new_outcome);
        };

        function createNewEmptyOutcome(){
            return {
                _id: guid(),
                name: ''
            };
        }

        $scope.removeOutcome = function($index){

            //also remove from activities selection
            for(var i = 0; i < $scope.scenario.activities.length; i++){
                for(var j = 0; j < $scope.scenario.activities[i].outcomes.length; j++){
                    if($scope.scenario.activities[i].outcomes[j]._id === $scope.scenario.outcomes[$index]._id){
                        $scope.scenario.activities[i].outcomes.splice(j, 1);
                        j--;
                    }
                }
            }

            $scope.scenario.outcomes.splice($index,1);
        };

        $scope.addNewActivityItem = function(){
            var new_activity = createNewEmptyActivity();
            $scope.scenario.activities.push(new_activity);
        };

        function createNewEmptyActivity(){
            return {
                _id: guid(), // fix for making empty list items different
                name: '',
                duration: '',
                in_class: true,
                activity_organization: {
                    _id: 0
                },
                outcomes: []
            };
        }

        function getTotalActivityTime(){
            var time = 0;
            for(var i = 0; i < $scope.scenario.activities.length; i++){
                time += parseInt($scope.scenario.activities[i].duration);
            }
            return time;
        }

        $scope.removeActivity = function($index){
            $scope.scenario.activities.splice($index,1);
        };

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

            // after typing init autosave
            var done_typing_interval = 2500;

            if($scope.timer){ $timeout.cancel($scope.timer); }

            $scope.timer = $timeout(function() {

                // check if really changed
                if(!angular.equals($scope.scenario, prevData)) {
                    saveScenarioData();
                }
            }, done_typing_interval);
        }

        function saveScenarioData(nextUrl) {

            $scope.saving_in_progress = true;

            // allow empty grade, duration
            if(!$scope.scenario.grade){ $scope.scenario.grade = null; }
            if(!$scope.scenario.duration){ $scope.scenario.duration = null; }

            var params = {
                scenario: $scope.scenario
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

        // http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
        }

        // Destroing timeout after navigationg away
        $scope.$on("$destroy", function( event ) {
            if($scope.timer){ $timeout.cancel($scope.timer); }
        });

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

    }]); //editDetailsController end
}());
