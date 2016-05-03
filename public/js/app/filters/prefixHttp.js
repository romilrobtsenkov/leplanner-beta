(function() {
    'use strict';

    angular
    .module('app')
    .filter("prefixHttp", function () {

        var startWith = function (url, prefix) {
            return url.indexOf(prefix) === 0;
        };

        return function (link) {
            var result;
            var startingUrl = "http://";
            var httpsStartingUrl = "https://";
            if(startWith(link, startingUrl)||startWith(link, httpsStartingUrl)){
                result = link;
            } else {
                result = startingUrl + link;
            }
            return result;
        };

    });

}());
