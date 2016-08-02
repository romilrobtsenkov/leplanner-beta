(function() {
    'use strict';

    angular
    .module('app')
    .controller('MainController', ['$scope','$route','$rootScope','$location','requestService', '$translate',
    function($scope,$route,$rootScope,$location,requestService,$translate) {

        $rootScope.title = 'Leplanner beta';

        //console.log($rootScope.user);
        $scope.logout = function(){

            requestService.post('/users/logout')
            .then(function(data){
                $rootScope.user = undefined;
                $location.path('/');
            })
            .catch(function(error) {
                console.log(error);
                window.alert('unable to logout, refresh the page');
            });
        };

        $scope.navigateToLogin = function($event){
            $event.preventDefault();
            if($location.path().toString() !== '/'){
                $rootScope.navigatedToLoginFrom = $location.path();
                $location.path('/login');
            }else{
                // if from home page
                $location.path('/login');
            }

        };

        $scope.searchFromTop = function($event){
            if($location.path() === '/search'){
                $rootScope.top_search_word = $scope.top_search_word;
                $scope.$broadcast ('triggerSearchForm');
            }else{
                if($event){
                    $event.preventDefault();
                }
                $rootScope.top_search_word = $scope.top_search_word;
                $location.path('/search');
            }
        };

        //var currentLang = $translate.proposedLanguage() || $translate.use();
        //console.log('language ' + currentLang);

        $scope.changeLanguage = function (langKey) {
            $translate.use(langKey).then(function(data){
                //if user - save preferred language
                if($rootScope.user){
                    $scope.setLanguage();
                }else{
                    //trigger on language change, change important defaults
                    $scope.translateDefaults();
                    $route.reload();
                }
            });
        };

        $scope.setLanguage = function(){

            console.log('saving');

            var currentLang = $translate.proposedLanguage() || $translate.use();
            requestService.post('/users/language', { lang: currentLang })
            .then(function(data) {

                $rootScope.user.lang = currentLang;
                $scope.translateDefaults();
                $route.reload();
            })
            .catch(function (error) {
                console.log(error);
            });
        };

        $rootScope.translateDefaults = function(){
            //translate and store in rootScope
            //translate organization / CO_AUTHORSHIP and DISPLAYS
            //translate dropdown buttons texts
            //translate for confirm dialoge
            $translate([
                'ORGANIZATION.0','ORGANIZATION.1','ORGANIZATION.2','ORGANIZATION.3',
                'CO_AUTHORSHIP.0','CO_AUTHORSHIP.1','CO_AUTHORSHIP.2','CO_AUTHORSHIP.3','CO_AUTHORSHIP.4','CO_AUTHORSHIP.5','CO_AUTHORSHIP.6',
                'DISPLAYS.0','DISPLAYS.1','DISPLAYS.2','DISPLAYS.3','DISPLAYS.4','DISPLAYS.5',

                'INPUT.SUBJECTS', 'INPUT.UNCHECK_ALL', 'INPUT.SEARCH', 'INPUT.LEARNING_OUTCOMES', 'BUTTON.PUBLISHED', 'BUTTON.DRAFT',

                'NOTICE.DELETE_CONFIRM',

                'INPUT.LANGUAGE', 'BUTTON_LANG_LONG_ET', 'BUTTON_LANG_LONG_EN',

                'NOTICE.COPY_CONFIRM'
            ]).then(function (t) {

                $rootScope.translated = {
                    lang: $translate.use(),
                    organization: [t['ORGANIZATION.0'],t['ORGANIZATION.1'],t['ORGANIZATION.2'],t['ORGANIZATION.3']],
                    co_authorship: [t['CO_AUTHORSHIP.0'],t['CO_AUTHORSHIP.1'],t['CO_AUTHORSHIP.2'],t['CO_AUTHORSHIP.3'],t['CO_AUTHORSHIP.4'],t['CO_AUTHORSHIP.5'],t['CO_AUTHORSHIP.6']],
                    displays: [t['DISPLAYS.0'],t['DISPLAYS.1'],t['DISPLAYS.2'],t['DISPLAYS.3'],t['DISPLAYS.4'], t['DISPLAYS.5']],
                    dropdowns: {
                        subjects: t['INPUT.SUBJECTS'],
                        uncheck_all: t['INPUT.UNCHECK_ALL'],
                        search: t['INPUT.SEARCH'],
                        learning_outcomes: t['INPUT.LEARNING_OUTCOMES'],
                        published: t['BUTTON.PUBLISHED'],
                        draft: t['BUTTON.DRAFT'],
                        language: t['INPUT.LANGUAGE'],
                        estonian: t.BUTTON_LANG_LONG_ET,
                        english: t.BUTTON_LANG_LONG_EN,
                    },
                    confirm: t['NOTICE.DELETE_CONFIRM'],
                    copy_confirm: t['NOTICE.COPY_CONFIRM']
                };
                //console.log($rootScope.translated);

            });
        };

        //trigger on main load
        $scope.translateDefaults();

    }]); // MainController end
}());
