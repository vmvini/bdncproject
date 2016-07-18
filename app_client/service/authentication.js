(function(){

	angular
		.module('mapaAssedioApp')
		.service('authService', authService);

	authService.$inject = ['$window'];

	function authService($window){

		var decodePayload = function(token){
			return JSON.parse($window.atob(token.split('.')[1]));
		};

		return {

			saveToken: function(token){
				$window.localStorage['harassment-map'] = token;
			},

			getToken: function(){
				return $window.localStorage['harassment-map'];
			},

			logout: function(){
				$window.localStorage.removeItem('harassment-map');
			},

			login: function(data){
				return $http.post('/api/login', data).success(function(date){
					saveToken(date.token);
				});
			},

			register: function(data){
				return $http.post('/api/register', data).success(function(date){
					saveToken(date.token);
				});
			},

			isLoggedIn: function(){
				var token = getToken();
				var payload;
				if(token){
					payload = decodePayload(token);
					return payload.exp > Date.now() / 1000;
				}
				else{
					return false;
				}
			}, 

			getLoggedUser: function(){
				if(isLoggedIn()){
					return decodePayload( getToken() );
				}
			}

		};

	}



})();



