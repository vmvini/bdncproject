(function(){

	angular.module('mapaAssedioApp', ['ngRoute', 'ngTagsInput', 'ngAnimate', 'ngTouch', 'ui.bootstrap', 'duScroll', 'ngMessages']);



	function config($routeProvider){
		$routeProvider
		.when('/', {

			templateUrl: 'views/index.html',
			controller: 'indexCtrl',
			controllerAs: 'index'

		})
		.otherwise({redirectTo: '/'});
	}

	angular
		.module('mapaAssedioApp')
		.config(['$routeProvider', config]);

})();


