(function() {
    'use strict';

    angular
    .module('app')
    .controller('SearchController', ['$scope','$rootScope','requestService','$translate','$routeParams','$route','$window','$location',
    function($scope,$rootScope,requestService,$translate,$routeParams, $route, $window, $location) {

        $scope.loading_animation = true;
        $scope.search_page_nr = 1;
        $scope.total_count = 0;

        if($location.search().q){
            console.log('search ', $location.search().q);
            $scope.search_word = $location.search().q;
        }

        if($location.search().page){
            console.log('page ', $location.search().page);
            $scope.search_page_nr = $location.search().page;
        }

        if($location.search().subjects){
            console.log('subjects ', $location.search().subjects);
        }

        if($location.search().languages){
            console.log('languages ', $location.search().languages);
        }

        $translate('PAGE.SEARCH').then(function (t) {
            $rootScope.title = t+' | Leplanner beta';

            /* ANALYTICS */
            $window.ga('send', 'pageview', {
                'page': $location.path(),
                'title': $rootScope.title
            });
        });

        // INIT
        createDropDownMenusAndInitialSearch();

        function createDropDownMenusAndInitialSearch(){
            //  arrays to store selected multiple choices
            $scope.selected_subjects = [];

            $scope.subjectsSettings = {
                scrollableHeight: '400px',
                scrollable: true,
                enableSearch: true,
                smartButtonMaxItems: 3,
                displayProp: 'name',
                idProp: '_id',
                showCheckAll: false,
                //externalIdProp: '_id',
                externalIdProp: '',
                buttonClasses: 'btn btn-default btn-fixed-width',
            };

            //$scope.subjectsText = {buttonDefaultText: 'Filter subjects'};
            $scope.subjectsText = {
                buttonDefaultText: $rootScope.translated.dropdowns.subjects,
                uncheckAll: $rootScope.translated.dropdowns.uncheck_all,
                searchPlaceholder: $rootScope.translated.dropdowns.search
            };

            $scope.selected_languages = [];

            $scope.languagesSettings = {
                scrollableHeight: '400px',
                scrollable: false,
                enableSearch: false,
                smartButtonMaxItems: 3,
                displayProp: 'name',
                idProp: 'value',
                showCheckAll: false,
                showUncheckAll: false,
                //externalIdProp: '_id',
                externalIdProp: '',
                buttonClasses: 'btn btn-default btn-fixed-width',
            };

            //$scope.subjectsText = {buttonDefaultText: 'Filter subjects'};
            $scope.languagesText = {
                buttonDefaultText: $rootScope.translated.dropdowns.language,
                uncheckAll: $rootScope.translated.dropdowns.uncheck_all,
                searchPlaceholder: $rootScope.translated.dropdowns.search
            };

            $scope.language_options = [{name: $rootScope.translated.dropdowns.estonian, value: 'et'},{name: $rootScope.translated.dropdowns.english, value: 'en'}];

            requestService.get('/meta/subjects')
            .then(function(data) {
                if(data.subjects){
                    $scope.subjects = data.subjects;
                    for(var a = 0; a < $scope.subjects.length; a++){
                        $scope.subjects[a].name = $scope.subjects[a]["name_"+$translate.use()];
                    }

                    //Focus search
                    //angular.element('#search-word-input').trigger('focus');

                    // INITAL SEARCH
                    getSearchParamsAndSearch();
                }
                if(data.error){
                    console.log(data.error);
                }
            });
        }

        function getSearchParamsAndSearch(){

            $scope.loading_animation = true;

            //replace search word from top search
            if($rootScope.top_search_word){
                $scope.search_word = $rootScope.top_search_word;
                $rootScope.top_search_word = undefined;
                $scope.$parent.top_search_word = undefined;

                $location.search('q', $scope.search_word);
                return;
            }

            var subjects = [];
            var selected_subjects_labels = [];
            var selected_languages_labels = [];

            if($scope.selected_subjects.length === 0 && $location.search().subjects){
                var subject_array_from_url = $location.search().subjects.split(',');
                $scope.selected_subjects = [];
                for(var j = 0; j < $scope.subjects.length; j++){
                    for(var k = 0; k < subject_array_from_url.length; k++){
                        if($scope.subjects[j]._id === subject_array_from_url[k]){
                            $scope.selected_subjects.push($scope.subjects[j]);
                        }
                    }
                }
            }

            if($scope.selected_languages.length === 0 && $location.search().languages){
                var lang_array_from_url = $location.search().languages.split(',');
                $scope.selected_languages = [];
                for(var l = 0; l < $scope.language_options.length; l++){
                    for(var m = 0; m < lang_array_from_url.length; m++){
                        if($scope.language_options[l].value === lang_array_from_url[m]){
                            $scope.selected_languages.push($scope.language_options[l]);
                        }
                    }
                }
            }

            searchScenarios();
        }

        function searchScenarios(){

            var q = {
                q: $location.search().q,
                page: $location.search().page - 1,
                order: $location.search().sort || 'latest',
                subjects: $location.search().subjects,
                languages: $location.search().languages,
            };

            requestService.get('/scenarios/search/', q)
            .then(function(data) {

                /* ANALYTICS */
                if(q.q){
                    console.log('logged ANALYTICS');
                    $window.ga('send', 'event', 'Keyword', 'search', q.q);
                }

                if(data.scenarios){

                    $scope.total_count = data.count;

                    $scope.scenarios = data.scenarios;
                    if(typeof q !== 'undefined'){
                        $scope.search_word_end = q.q;
                    }else{
                        $scope.search_word_end = undefined;
                    }

                    for(var j = 0; j < $scope.scenarios.length; j++){
                        //translating subjects
                        for(var a = 0; a < $scope.scenarios[j].subjects.length; a++){
                            $scope.scenarios[j].subjects[a].name = $scope.scenarios[j].subjects[a]["name_"+$translate.use()];
                        }
                    }

                    $scope.loading_animation = false;
                }

                if(data.error){
                    console.log(data.error);
                }
            });

        }

        $scope.search = function() {

            var url_params = {};

            var selected_subjects_labels = [];
            var selected_languages_labels = [];

            // SORT
            if($location.search().sort){
                url_params.sort = $location.search().sort;
            }else{
                url_params.sort = 'latest';
            }

            // PAGE
            if($location.search().page){
                url_params.page = $location.search().page;

                //if new search word - start from 0
                if ($location.search().q !== $scope.search_word) {
                    url_params.page = 1;
                }
            }

            // SUBJECTS
            $scope.selected_subjects.forEach(function(element) {
                selected_subjects_labels.push(element._id);
            });
            if(selected_subjects_labels.length > 0){
                url_params.subjects = selected_subjects_labels.toString();
            }
            // LANGUAGES
            $scope.selected_languages.forEach(function(element) {
                selected_languages_labels.push(element.value);
            });
            if(selected_languages_labels.length  > 0){
                url_params.languages = selected_languages_labels.toString();
            }

            //SEARCH WORD
            url_params.q = $scope.search_word;

            $location.search(url_params);

        };

        $scope.pageChanged = function(new_page_nr) {
            $location.search('page', new_page_nr);
            getSearchParamsAndSearch();
            document.body.scrollTop = 0;
        };

        $scope.isSortActive = function(tab){
            if(!$location.search().sort && tab === 'latest'){ return true; }
            if(tab === $location.search().sort){ return true; }
            return false;
        };

        $scope.updateSortList = function(tab){
            if(tab === 'latest ' || tab === 'popular' || tab === 'favorited' || tab === 'commented'){
                if($location.search().sort !== tab){
                    $location.search('sort', tab);
                }
                getSearchParamsAndSearch();
            }else{
                $location.search('sort', 'latest');
                getSearchParamsAndSearch();
            }
        };

    }]); // SearchController end
}());
