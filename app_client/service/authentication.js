(function(){

	angular
		.module('mapaAssedioApp')
		.service('authService', authService);

	authService.$inject = ['$window'];

	function authService($window){

		var decodePayload = function(token){
			return JSON.parse($window.atob(token.split('.')[1]));
		};

		var saveToken = function(token){
			$window.localStorage['harassment-map'] = token;
		};

		var getToken = function(){
			return $window.localStorage['harassment-map'];
		};

		var logout = function(){
			$window.localStorage.removeItem('harassment-map');
		};

		var login = function(data){
			return $http.post('/api/login', data).success(function(date){
				saveToken(date.token);
			});
		};

		var register = function(data){
			return $http.post('/api/register', data).success(function(date){
				saveToken(date.token);
			});
		};

		var isLoggedIn = function(){
			var token = getToken();
			var payload;
			if(token){
				payload = decodePayload(token);
				return payload.exp > Date.now() / 1000;
			}
			else{
				return false;
			}
		};

		var getLoggedUser = function(){
			if(isLoggedIn()){
				return decodePayload( getToken() );
			}
		};

		return {

			saveToken: saveToken,

			getToken: getToken,

			logout: logout,

			login: login,

			register: register,

			isLoggedIn: isLoggedIn, 

			getLoggedUser: getLoggedUser

		};

	}



})();



