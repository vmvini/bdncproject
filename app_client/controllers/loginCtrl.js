(function(){
	
	angular
		.module('mapaAssedioApp')
		.controller('loginCtrl', loginCtrl);


	loginCtrl.$inject = ['$rootScope','$scope', '$uibModalInstance', 'authService'];
	function loginCtrl($rootScope, $scope, $uibModalInstance, authService){


		var vm = this;

		vm.user = {
			email: "",
			password: ""
		};
		
		vm.ok = function(){
			authService.login(vm.user)
				.success(function(resp){
					console.log("sucesso ao logar");
					$rootScope.$broadcast('SUCCESS_LOGIN', resp);
					$uibModalInstance.close("modal close method");
				})
				.error(function(err){
					console.log("erro ao logar");
					console.log(err);
				});


		};

		vm.cancel = function(){
			$uibModalInstance.dismiss('cancel');
			
			vm.user = {
				email: "",
				password: ""
			};
		};

	}

})();