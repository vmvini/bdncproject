function HarassmentMap(){}

HarassmentMap.prototype.createMap = function(divId){

	this.map = new google.maps.Map(document.getElementById(divId), {

		center: {lat: -34.397, lng: 150.644},
    	zoom: 6

	});

	return this.map;

}


/*
	marks
		mark
			lat
			lng
			title
*/
HarassmentMap.prototype.loadMarks = function(marks){

	var map = this.map;
	console.log("vetor marks: " + marks.length);
	console.log(marks[0]);

	var i = 0;

	marks.forEach(function(mark){

		setTimeout(function() {

    		addMarker({
    			map: map,
				pos: { lat: mark.lat, lng: mark.lng },
				title: mark.title
    		});

    	}, ++i * 200);

	});


}





HarassmentMap.prototype.createMark = function(){

	var map = this.map;

	/*
	marcadores
		estupro, assedio, violencia
	*/

	this.map.addListener('click', function(e){
		
		console.log("lat: ", e.latLng.lat());
		console.log("lng: ", e.latLng.lng());
		var latlng = {lat: e.latLng.lat(), lng: e.latLng.lng()};
		
		var markProps = {
			map: map,
			pos: latlng,
			title: "title"
		};

		var marker = addMarker(markProps);



	});

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



/*
		markProps
			map
			pos
			animation - null
			title
		
		markClick - callback for click event

	*/
function addMarker(markProps, markClick ){

	var marker = new google.maps.Marker({
		position: markProps.pos,
		map:markProps.map,
		animation: google.maps.Animation.DROP,
		title:markProps.title
	});

	marker.addListener('click', function(){
		if (marker.getAnimation() !== null) {
			marker.setAnimation(null);
		} else {
			marker.setAnimation(google.maps.Animation.BOUNCE);
		}
		
		if(markClick)
			markClick();
	});

	return marker;

}