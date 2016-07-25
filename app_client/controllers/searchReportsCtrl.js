(function(){

	angular
		.module('mapaAssedioApp')
		.controller('searchReportsCtrl', searchReportsCtrl);



	searchReportsCtrl.$inject = ['$scope','HarassmentMap'];
	function searchReportsCtrl($scope, HarassmentMap){

		var vm = this;

		vm.address;

		//ADDRESS CHANGE LISTENER
		$scope.$watch('vm.address', function() { 

			if(vm.address !== undefined){
				HarassmentMap.searchAutoComplete(vm.address, function(res, err){
					if(err){
						console.log("erro ao procurar lugar");
						console.log(err.msg);
						return;
					}

					HarassmentMap.getPosition(res[0], function(pos, viewport, error){
						if(error){
							console.log("erro ao pegar posicao do lugar");
				       		console.log(error.msg);
				        	return;
				        }
				        HarassmentMap.map.setCenter(pos);
				        if(viewport){
			              HarassmentMap.map.fitBounds(viewport);
				        }
			            else{
			              console.log("viewport nao conhecido");
			            }

					});

				});
			}

		});

		//DATE CHANGE LISTENER
		$scope.$watch('vm.occurrencyDate', function(){
			fixTags(vm);
			fixCrime(vm);
			HarassmentMap.findMarksByFilter(vm.occurrencyDate, vm.crime, getTagsArray(vm.tags));
			
		});

		//CRIME CHANGE LISTENER
		$scope.$watch('vm.crime', function(){
			fixTags(vm);
			fixCrime(vm);
			HarassmentMap.findMarksByFilter(vm.occurrencyDate, vm.crime, getTagsArray(vm.tags));
		});


		//TAGS CHANGE LISTENER
		$scope.$watchCollection('vm.tags', function(){
				fixCrime(vm);
				fixTags(vm);
				HarassmentMap.findMarksByFilter(vm.occurrencyDate, vm.crime, getTagsArray(vm.tags));
			

		});

	}


	function getTagsArray(tags){
		
		var i;
		var myTags = [];
		if(tags === undefined){
			return tags;
		}
		for(i=0; i < tags.length; i++){
			myTags.push(tags[i].text);
			
		}
		return myTags;

	}

	function fixCrime(vm){
		if(vm.crime){
			if(vm.crime == "todos"){
				vm.crime = undefined;
			}
		}
	}

	function fixTags(vm){
		if(vm.tags){
			if(vm.tags.length === 0){
				vm.tags = undefined;
			}
		}
	}


})();

