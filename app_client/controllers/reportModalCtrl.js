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
			crime: "",
			anonymous: false,
			user:null, 
			date:null
		};
	
		vm.ok = function(){
			vm.denuncia.tags = getTagsArray(vm.tags);
			console.log(vm.denuncia);
			reportsService
				.newReport(vm.denuncia)
				.success(function(data){
					console.log("sucesso ao cadastrar denuncia");
					console.log(data);
					//$uibModalInstance.close("modal close method");
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


})();

