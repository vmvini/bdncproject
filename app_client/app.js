angular.module('mapaAssedioApp', ['ngRoute', 'ngTagsInput', 'ngAnimate', 'ngTouch']);



function config($routeProvider){
	$routeProvider
		.when('/', {

			templateUrl: 'views/index.html',
			controller: 'indexCtrl',
			controllerAs: 'vm'

		})
		.otherwise({redirectTo: '/'});
}

angular
	.module('mapaAssedioApp')
	.config(['$routeProvider', config]);