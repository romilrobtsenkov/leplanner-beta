(function(){
  angular
    .module('app')
    .controller('HomeController', HomeController);

    HomeController.$inject = ['api'];

    function HomeController(api) {
      console.log('hello');
    }
}());
