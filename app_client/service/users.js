angular
	.module('mapaAssedioApp')
	.service('usersService', usersService);

function usersService($http){


	return {

		newUser : function(user){
			return $http.post('/api/users', user);
		}

	};

}