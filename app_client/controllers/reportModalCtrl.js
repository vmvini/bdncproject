(function(){

	angular
		.module('mapaAssedioApp')
		.controller('reportModalCtrl', reportModalCtrl );

	reportModalCtrl.$inject = ['$scope', '$uibModalInstance', 'pos', 'reportsService'];
	function reportModalCtrl($scope, $uibModalInstance, pos, reportsService){

		var vm = this;

		vm.tags = [];

		vm.denuncia = {
			pos: pos,
			tags: [],
			victim: false,
			user: null,
			crime: "",
			anonymous: false,
			date:null
		};
	
		vm.ok = function(){
			vm.denuncia.tags = getTagsArray(vm.tags);
			convertStringToBool(vm.denuncia);
			console.log(vm.denuncia);
			reportsService
				.newReport( { report: vm.denuncia } )
				.success(function(data){
					console.log("sucesso ao cadastrar denuncia");
					console.log(data);
					$uibModalInstance.close("modal close method");
				})
				.error(function(data){
					console.log("erro ao cadastrar denuncia");
					console.log(data);
				});


			
		};

		vm.cancel = function(){
			$uibModalInstance.dismiss('cancel');
		};
	}


	function getTagsArray(tags){
		var i;
		var myTags = [];
		for(i=0; i < tags.length; i++){
			myTags.push(tags[i].text);
			
		}
		return myTags;

	}

	function convertStringToBool(denuncia){
		if (denuncia.victim === 'true')
			denuncia.victim = true;
		else
			denuncia.victim = false;
	}


})();

