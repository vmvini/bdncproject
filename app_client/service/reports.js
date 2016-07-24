(function(){

	angular
		.module('mapaAssedioApp')
		.service('reportsService', reportsService);

	reportsService.$inject = ['$http', 'authService'];
	function reportsService($http, authService){

		return {

			getReports : function(lat, lng, maxDistance){

				return $http.post('/api/getreports', {lat: lat, lng: lng, maxDistance: maxDistance});
			},

			newReport : function(report){
				return $http.post('/api/reports', report, {
					headers: {
						Authorization: 'Bearer ' + authService.getToken()
					}
				});
			}
		};

	}

})();

