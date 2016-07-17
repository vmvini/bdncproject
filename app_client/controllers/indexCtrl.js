
angular
	.module('mapaAssedioApp')
	.controller('indexCtrl', indexCtrl);

function indexCtrl(){

	//using ViewModel : angular instantiate this controller with new. I'm getting the object passed as this.
	//the this object is bound to $scope
	//so, i dont need $scope reference anymore
	var vm = this;

	vm.login = "login";
	vm.register = "cadastre-se";
	vm.logout = "sair";


}

