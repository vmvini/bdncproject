(function(){

	angular
		.module('mapaAssedioApp')
		.controller('userRegisterCtrl', userRegister);

	userRegister.$inject = ['$scope', '$uibModalInstance', 'authService'];
	function userRegister($scope, $uibModalInstance, authService){

		var vm = this;

		vm.password = "";

		vm.user = {

			name: "",
			birthDate: new Date().now,
			email:"",
			sex:"feminino"

		};

		vm.loginResp = "";

		vm.success = false;

		vm.ok = function(){
			console.log("cadastrando");
			console.log(vm.user);
			console.log(vm.password);

			authService.register({ user:vm.user, password: vm.password })
				.success(function(){
					console.log("cadastrou com sucesso")
					vm.loginResp = "Cadastro realizado com sucesso";
					vm.success = true;
				})
				.error(function(){
					vm.loginResp = vm.user.email + " já usado por outro usuário";
				});

			//$uibModalInstance.close("modal close method");
		};

		vm.cancel = function(){
			console.log("cancelar");
			vm.user = {
				name: "",
				birthDate: {},
				email:"",
				sex:""
			};

			vm.password = "";

			$uibModalInstance.dismiss('cancel');

		};

	}

})();