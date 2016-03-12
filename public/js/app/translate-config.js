(function() {
    'use strict';

    angular
    .module('app')
    .config(['$translateProvider', function ($translateProvider) {

        //disable flicker on load, by creating default values
        /*$translateProvider.translations('en', {
            'BUTTON_LANG': ''
        });*/

        $translateProvider.useStaticFilesLoader({
            'prefix': 'localization/locale-',
            'suffix': '.json'
        });
        $translateProvider.useSanitizeValueStrategy('escape');
        $translateProvider.registerAvailableLanguageKeys(['en', 'et'], {
            'en_*': 'en',
            'en-*': 'en',
            'et_*': 'et',
            'et-*': 'et',
        });

        $translateProvider.preferredLanguage('en');

        $translateProvider.uniformLanguageTag('bcp47').determinePreferredLanguage();
        //http://www.loc.gov/standards/iso639-2/php/code_list.php
        //https://msdn.microsoft.com/et-ee/library/ms533052.aspx
        // enable BCP-47, must be before determinePreferredLanguage!

        $translateProvider.fallbackLanguage('en');

    }]);
}());
