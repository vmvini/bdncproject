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
			
			if(vm.occurrencyDate !== undefined){
				HarassmentMap.findMarksByDate(vm.occurrencyDate);
			}
		});

		//CRIME CHANGE LISTENER
		$scope.$watch('vm.crime', function(){
			
			if(vm.crime !== undefined){
				HarassmentMap.findMarksByCrime(vm.crime);
			}

		});


		//TAGS CHANGE LISTENER
		$scope.$watch('vm.tags', function(){
			
			if(vm.tags !== undefined){
				HarassmentMap.findMarksByTags(getTagsArray(vm.tags));
			}

		});

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

