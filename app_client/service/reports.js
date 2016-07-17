angular
	.module('mapaAssedioApp')
	.service('reportsService', reportsService);

function reportsService($http){

	return {

		getReports : function(lat, lng, maxDistance){
			return $http.get('/api/reports/lat/' + lat + '/lng/' + lng + '/distance/' + maxDistance);
		},

		newReport : function(report){
			return $http.post('/api/reports', report);
		}
	};

}