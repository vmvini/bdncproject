function HarassmentMap(){}

HarassmentMap.prototype.createMap = function(divId){

	this.map = new google.maps.Map(document.getElementById(divId), {

		center: {lat: -34.397, lng: 150.644},
    	zoom: 6

	});

	return this.map;

}


HarassmentMap.prototype.createInfoWindow = function(){

	this.infoWindow = new google.maps.InfoWindow({map: this.map});
	return this.infoWindow;

}



HarassmentMap.prototype.goToUserLocation = function(success, error){

	var map = this.map;

	if (navigator.geolocation) {
    	navigator.geolocation.getCurrentPosition(function(position) {
	      var pos = {
	        lat: position.coords.latitude,
	        lng: position.coords.longitude
	      };
	      
	      map.setCenter(pos);
	      
	      //execute user's success callback --> use  this to config infoWindow or graphical interactions...
	      success(pos);
		
		}, function() {
      		error();
    	});
  
  	} else {
	    // Browser doesn't support Geolocation
	    error();
  	}

}