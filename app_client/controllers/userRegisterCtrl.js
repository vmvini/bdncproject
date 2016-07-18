(function(){

	angular
		.module('mapaAssedioApp')
		.controller('userRegisterCtrl', userRegister);

	userRegister.$inject = ['$scope', '$uibModalInstance'];
	function userRegister($scope, $uibModalInstance){

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