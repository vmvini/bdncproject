(function(){

	angular
		.module('mapaAssedioApp')
		.controller('reportModalCtrl', reportModalCtrl );

	reportModalCtrl.$inject = ['$scope', '$uibModalInstance', 'pos', 'reportsService', 'HarassmentMap', 'geoService'];
	function reportModalCtrl($scope, $uibModalInstance, pos, reportsService, HarassmentMap, geoService){

		var vm = this;

		vm.errorMessage = "";

		vm.success = false;
		vm.error = false;

		vm.tags = [];

		vm.denuncia = {
			pos: pos,
			tags: [],
			victim: "true",
			user: null,
			crime: "Assédio",
			anonymous: false,
			date:new Date(),
			address:""
		};	

		setAddress(geoService, vm.denuncia, function(address){
			vm.denuncia.address = address;


		} );
	
		vm.ok = function(){
			vm.denuncia.tags = getTagsArray(vm.tags);
			convertStringToBool(vm.denuncia);
			reportsService
				.newReport( { report: vm.denuncia } )
				.success(function(data){
					console.log("sucesso ao cadastrar denuncia");
					$uibModalInstance.close("modal close method");
					
					var markprops = new MarkProps(data, HarassmentMap.map);
					vm.success = true;
					//HarassmentMap.marksIds.push(data._id);
			        HarassmentMap.bindMark(
			        	addMarker(markprops)
			        );
				})
				.error(function(data){
					console.log("erro ao cadastrar denuncia");
					console.log(data);
					vm.errorMessage = "Erro ao realizar denúncia";
					vm.error = true;
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


	function setAddress(geoService, denuncia, callback){
		geoService.getAddress(denuncia.pos.lat, denuncia.pos.lng)
			.success(function(data){
				callback(data.results[0].formatted_address);
			})
			.error(function(data){
				console.log("erro ao pegar endereço");
				console.log(data);
			});
	}


})();

