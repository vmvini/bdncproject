(function(){

	angular
		.module('mapaAssedioApp')
		.controller('indexCtrl', indexCtrl);

	function routeListener($rootScope, callback){
		$rootScope.$on('$routeChangeStart', callback);
	}

	function ctrlListener($scope, event, callback){
		$scope.$on(event, function(event, msg) {
    		callback(msg);
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

			modalInstance.result.then(function(data){
				console.log("fechando");
				
			}, function(){
				console.log('Modal dismissed at: ' + new Date());
			});		

		};
	}


	indexCtrl.$inject = [
		'$rootScope','$scope', 'reportsService', 
		'usersService', '$uibModal', '$log', 
		'authService', '$location', '$anchorScroll', 
		'HarassmentMap'
	];

	function indexCtrl(
		$rootScope, $scope, reportsService, 
		usersService, $uibModal, $log, 
		authService, $location, $anchorScroll, HarassmentMap ){

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

		ctrlListener($scope, "login", function(){
			vm.openLoginModal();
		});

		ctrlListener($scope, "register", function(){
			vm.openRegisterModal();
		});

		routeListener($rootScope, function(){
			updateUser();
		});
		

		vm.openRegisterModal = createModal($uibModal, '/views/userModal/userRegister.html', 'userRegisterCtrl');
		vm.openLoginModal = createModal($uibModal, '/views/userModal/login.html', 'loginCtrl');
		vm.openReportModal = createModal($uibModal, '/views/reportModal/reportModal.html', 'reportModalCtrl' );
		vm.openAuthModal = createModal($uibModal, 'views/userModal/authUser.html', 'authUserCtrl');

		vm.logout = function(){
			authService.logout();
			$location.path('/');
			updateUser();
		};

		loadMap(vm, $scope, HarassmentMap, reportsService );

	}




	function loadMap(vm, $scope, harassmentMap, reportsService){
		var map = harassmentMap.createMap("map");
		var infowindow = harassmentMap.createInfoWindow();

		harassmentMap.goToUserLocation(function(pos){
	      		//success callback
	      		infowindow.setPosition(pos);
	      		infowindow.setContent('Localização encontrada!');
	      		reportsService.getReports(pos.lat, pos.lng, 2500)
	      			.success(function(data){
	      				console.log("sucesso ao pegar marcações");
	      				console.log(data);
	      			})
	      			.error(function(data){
	      				console.log("erro");
	      				console.log(data);
	      			});
	      		//harassmentMap.loadMarks();
	      		


	      	}, function(){
	      		//error callback
	      		infowindow.setPosition(map.getCenter());
	      		infowindow.setContent('A localização falhou!');
	      	});

		harassmentMap.setClickEvent(function(e, hmap){
			
			$scope.$apply(function(){
				var pos = {lat: e.latLng.lat(), lng: e.latLng.lng()};
				
				if(vm.isLoggedIn){
					vm.openReportModal({ pos: pos });
					
				}
				else{
					vm.openAuthModal();
				}
				
			});

		});

	}

	/* cqso queira abrir denuncia automaticamente depois de ter logado ou cadastrado
	function configureReportModal(vm, pos){
		
		return function(){
			if(vm.lastPos){
				vm.openReportModal({pos: vm.lastPos});
				vm.lastPos = null;
			}
			else{
				vm.openReportModal({pos: pos});
			}
		};	
	}*/


})();


