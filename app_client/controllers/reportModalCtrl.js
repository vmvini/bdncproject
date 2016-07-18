(function(){

	angular
		.module('mapaAssedioApp')
		.controller('reportModalCtrl', reportModalCtrl );

	reportModalCtrl.$inject = ['$scope', '$uibModalInstance', 'pos'];
	function reportModalCtrl($scope, $uibModalInstance, pos){

		var vm = this;

		vm.denuncia = {
			pos: pos,
			tags: [],
			victim: false,
			crime: "",
			anonymous: false,
			user:{}, 
			date:{}
		};

		vm.ok = function(){
			console.log(vm.denuncia);
			 $uibModalInstance.close("modal close method");
		};

		vm.cancel = function(){
			$uibModalInstance.dismiss('cancel');
		}
	}

})();

