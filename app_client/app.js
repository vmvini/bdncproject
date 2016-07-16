angular.module('mapaAssedioApp', ['ngRoute']);



function config($routeProvider){
	$routeProvider
		.when('/', {

			templateUrl: 'views/index.html',
			controller: 'indexCtrl'

		})
		.otherwise({redirectTo: '/'});
}

angular
	.module('mapaAssedioApp')
	.config(['$routeProvider', config]);