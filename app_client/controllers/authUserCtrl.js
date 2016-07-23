(function(){

	angular
		.module('mapaAssedioApp')
		.controller('authUserCtrl', authUserCtrl);

	authUserCtrl.$inject = ['$scope', '$uibModalInstance','$rootScope'];
	function authUserCtrl($scope, $uibModalInstance, $rootScope){

		var vm = this;

		vm.login = function(){
			console.log("logar");
			$uibModalInstance.close("modal close method");
			$rootScope.$broadcast('login');
			angular.element('body').css('padding-right', '0px');
			
		};

		vm.register = function(){
			console.log("regiter");
			$uibModalInstance.close("modal close method");
			$rootScope.$broadcast('register');
			angular.element('body').css('padding-right', '0px');
			
		};


	}


})();