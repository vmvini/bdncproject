(function(){

	angular
		.module('mapaAssedioApp')
		.service('geoService', geoService );

	geoService.$inject = ['$http'];
	function geoService($http){

		return {

			getAddress: function(lat, lng){
				return $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&key=AIzaSyBUbBdeAH-ttHCGThjB0dIA1s3f3hnGwn8');
			}
		};


	}	

})();