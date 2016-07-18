(function(){

	angular
		.module('mapaAssedioApp')
		.service('usersService', usersService);

	usersService.$inject = ['$http'];
	function usersService($http){


		return {

			newUser : function(user){
				return $http.post('/api/users', user);
			}

		};

	}

})();

