(function(){

	angular
		.module('mapaAssedioApp')
		.service('authService', authService);

	authService.$inject = ['$window'];

	function authService($window){

		return {

			saveToken: function(token){
				$window.localStorage['harassment-map'] = token;
			},

			getToken: function(){
				return $window.localStorage['harassment-map'];
			}

		};

	}



})();



