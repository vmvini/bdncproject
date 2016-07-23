(function(){

	angular
		.module('mapaAssedioApp')
		.controller('indexCtrl', indexCtrl);

	function routeListener($rootScope, callback){
		$rootScope.$on('$routeChangeStart', callback);
	}

	function ctrlListener($scope, event, callback){
		$scope.$on(event, function(event, msg) {
    		callback();
  		});
	}


	function createModal($uibModal, template, controller){
		return function(resolve){
			var localResolve = {};
			if(resolve){
				localResolve = resolve;
			}
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: template,
				controller:  controller,
				controllerAs: 'vm',
				size: 'lg',
				resolve: localResolve
	        });

			modalInstance.result.then(function(msg){
				console.log("fechando: " + msg);
			}, function(){
				console.log('Modal dismissed at: ' + new Date());
			});		

		};
	}


	indexCtrl.$inject = [
		'$rootScope','$scope', 'reportsService', 
		'usersService', '$uibModal', '$log', 
		'authService', '$location', '$anchorScroll'
	];

	function indexCtrl(
		$rootScope, $scope, reportsService, 
		usersService, $uibModal, $log, 
		authService, $location, $anchorScroll ){

		//using ViewModel : angular instantiate this controller with new. I'm getting the object passed as this.
		//the this object is bound to $scope
		//so, i dont need use $scope reference for all situations
		var vm = this;
		vm.loggedUser;
		vm.isLoggedIn;

		var updateUser = function(){
			vm.loggedUser = authService.getLoggedUser();
			vm.isLoggedIn = authService.isLoggedIn();
		};

		updateUser();


		ctrlListener($scope, "SUCCESS_LOGIN", updateUser);

		routeListener($rootScope, function(){
			updateUser();
		});
		

		vm.openRegisterModal = createModal($uibModal, '/views/userModal/userRegister.html', 'userRegisterCtrl');
		vm.openLoginModal = createModal($uibModal, '/views/userModal/login.html', 'loginCtrl');
		vm.openReportModal = createModal($uibModal, '/views/reportModal/reportModal.html', 'reportModalCtrl' );

		vm.logout = function(){
			authService.logout();
			$location.path('/');
			updateUser();
		};

		loadMap(vm, $scope);

	}




	function loadMap(vm, $scope){
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
				vm.openReportModal({ pos: pos });
			});

		});

	}


})();


