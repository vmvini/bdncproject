(function(){

	angular
		.module('mapaAssedioApp')
		.controller('indexCtrl', indexCtrl);

	function routeListener($rootScope, callback){
		$rootScope.$on('$routeChangeStart', callback);
	}

	
	indexCtrl.$inject = ['$rootScope','$scope', 'reportsService', 'usersService', '$uibModal', '$log', 'authService', '$location'];
	function indexCtrl($rootScope, $scope, reportsService, usersService, $uibModal, $log, authService, $location ){

		//using ViewModel : angular instantiate this controller with new. I'm getting the object passed as this.
		//the this object is bound to $scope
		//so, i dont need use $scope reference for all situations
		var vm = this;

		vm.loggedUser;
		vm.isLoggedIn;

		var updateUser = function(erase){
			vm.loggedUser = authService.getLoggedUser();
			vm.isLoggedIn = authService.isLoggedIn();
		};

		updateUser();


		routeListener($rootScope, function(){
			updateUser();
		});
		

		$scope.$on('SUCCESS_LOGIN', function(event, msg) {
    		updateUser();
  		});

		vm.logout = function(){
			authService.logout();
			$location.path('/');
			updateUser();
		};

		//REGISTER USER MODAL 
		vm.openRegisterModal = function(){
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: '/views/userModal/userRegister.html',
				controller:  'userRegisterCtrl',
				controllerAs: 'vm',
				size: 'lg',
				resolve: {
					
	        	}
	        });

			modalInstance.result.then(function(msg){
				console.log("fechando: " + msg);
			}, function(){
				$log.info('Modal dismissed at: ' + new Date());
			});	
		};

		//LOGIN MODAL
		vm.openLoginModal = function(){
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: '/views/userModal/login.html',
				controller:  'loginCtrl',
				controllerAs: 'vm',
				size: 'lg',
				resolve: {
					
	        	}
	        });

			modalInstance.result.then(function(msg){
				console.log("fechando: " + msg);
			}, function(){
				$log.info('Modal dismissed at: ' + new Date());
			});	
		};


		//setting report modal angular ui
		vm.openReportModal = function(size, pos){
			
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: '/views/reportModal/reportModal.html',
				controller:  'reportModalCtrl',
				controllerAs: 'vm',
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


