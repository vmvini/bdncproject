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
			sex:""

		};

		vm.ok = function(){
			console.log("cadastrando");
			console.log(vm.user);
			console.log(vm.password);

			authService.register({ user:vm.user, password: vm.password })
				.success(function(){
					console.log("cadastrou com sucesso");
				});

			$uibModalInstance.close("modal close method");
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