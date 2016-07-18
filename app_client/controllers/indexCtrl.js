(function(){

	angular
		.module('mapaAssedioApp')
		.controller('indexCtrl', indexCtrl);

	indexCtrl.$inject = ['$scope', 'reportsService', 'usersService', '$uibModal', '$log'];
	function indexCtrl($scope, reportsService, usersService, $uibModal, $log ){

		//using ViewModel : angular instantiate this controller with new. I'm getting the object passed as this.
		//the this object is bound to $scope
		//so, i dont need $scope reference anymore
		var vm = this;

		vm.login = "login";
		vm.register = "cadastre-se";
		vm.logout = "sair";

		vm.openReportModal = function(size, pos){
			
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: '/views/reportModal/reportModal.html',
				controller:  'reportModalCtrl',
				controllerAs: 'reportModal',
				size: size,
				resolve: {
					pos: pos
	        		//user: usuarioLogado
	        	}
	        });

			modalInstance.result.then(function(msg){
				console.log("fechando: " + msg);
			}, function(){
				$log.info('Modal dismissed at: ' + new Date());
			});		

		}

		loadMap();


		function loadMap(){
			vm.harassmentMap = new HarassmentMap();

			var map = vm.harassmentMap.createMap("map");
			var infowindow = vm.harassmentMap.createInfoWindow();

			vm.harassmentMap.goToUserLocation(function(pos){
	      		//success callback
	      		infowindow.setPosition(pos);
	      		infowindow.setContent('Localização encontrada!');


	      	}, function(){
	      		//error callback
	      		infowindow.setPosition(map.getCenter());
	      		infowindow.setContent('A localização falhou!');
	      	});

			vm.harassmentMap.setClickEvent(function(e, hmap){

				$scope.$apply(function(){
					var pos = {lat: e.latLng.lat(), lng: e.latLng.lng()};
					vm.openReportModal('lg', pos);
				});

			});

		}


	

	}


})();


