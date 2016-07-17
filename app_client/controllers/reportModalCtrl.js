angular
	.module('mapaAssedioApp')
	.controller('reportModalCtrl', reportModalCtrl );

function reportModalCtrl($scope, $uibModalInstance, pos){

	var vm = this;

	vm.denuncia = {
		pos: pos,
		tags: [],
		vitima: false,
		crime: "",
		anonimo: false,
		usuario:{}
	};
	

	vm.ok = function(){
		console.log(vm.denuncia);
		 $uibModalInstance.close("modal close method");
	};

	vm.cancel = function(){
		$uibModalInstance.dismiss('cancel');
	}



}