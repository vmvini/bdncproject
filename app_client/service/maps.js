(function(){

	angular
		.module('mapaAssedioApp')
		.service('HarassmentMap', map);




	function map(){

		var harassmentMap = new HarassmentMap();

		return harassmentMap;

	}

})();