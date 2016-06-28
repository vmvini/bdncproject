function HarassmentMap(){}


HarassmentMap.prototype.createMap = function(divId){

	this.map = new google.maps.Map(document.getElementById(divId), {

		center: {lat: -34.397, lng: 150.644},
    	zoom: 6

	});

	this.mapmarks = [];
	this.mappoints = [];

	return this.map;

}

HarassmentMap.prototype.toggleHeatmap = function(){

	if(this.heatmap.getMap() == null){
		this.heatmap.setMap(this.map);
		setMapMarksVisibility.call(this, false);

	}
	else{
		this.heatmap.setMap(null);
		setMapMarksVisibility.call(this, true);
	}

	function setMapMarksVisibility(bol){
		this.mapmarks.forEach(function(m){
			m.setVisible(bol);
		});
	}

}

/*
	marks
		mark
			lat
			lng
			title
			label
*/
HarassmentMap.prototype.loadMarks = function(marks, end){

	var map = this.map;
	var i = 0;
	var mapmarks = this.mapmarks;
	var mappoints = this.mappoints;
	var createHeatMap = this.createHeatMap;
	var that = this;

	var count = marks.length;

	marks.forEach(function(mark){

		setTimeout(function() {

			var m = addMarker({
	    			map: map,
					pos: { lat: mark.lat, lng: mark.lng },
					title: mark.title,
					label: mark.label
	    		});

    		mapmarks.push(m);

    		mappoints.push(m.getPosition());
    		finishLoop();

    	}, ++i * 200);

	});


	var createHeatMap = function(){
		that.heatmap = new google.maps.visualization.HeatmapLayer({
			data: mappoints
		});
	}

	function finishLoop(){
		count--;
		if(count == 0 ){

			createHeatMap();
			end();
			console.log("MAP MARCACOES :: ",mapmarks);

		}
	}

	

}

/*
	callback(event, HarassmentMap)
*/
HarassmentMap.prototype.setClickEvent = function(callback){
	
	var that = this;

	this.map.addListener('click', function(e){
		callback(e, that);
	});
}

/*
HarassmentMap.prototype.createMark = function(){

	var map = this.map;

	/*
	marcadores
		estupro, assedio, violencia
	

	this.map.addListener('click', function(e){
		
		console.log("lat: ", e.latLng.lat());
		console.log("lng: ", e.latLng.lng());
		var latlng = {lat: e.latLng.lat(), lng: e.latLng.lng()};
		
		var markProps = {
			map: map,
			pos: latlng,
			title: "title",
			label:"ASSEDIO"
		};

		var marker = addMarker(markProps);



	});

}

*/


HarassmentMap.prototype.createInfoWindow = function(){

	this.infoWindow = new google.maps.InfoWindow({map: this.map});
	return this.infoWindow;

}


HarassmentMap.prototype.searchAutoComplete = function(address, callback){

	var location = this.map.getCenter();

	var service = new google.maps.places.AutocompleteService();
	service.getQueryPredictions({ 
		input: address, 
		location: location,
		radius:0
	}, searchLocaleResponse(callback) );


	function searchLocaleResponse(callback){
		
		return function(results, status){
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				callback(results);
			}
			else{
				callback(['Não foi possível encontrar esse local.']);
			}
		};

	}

}

HarassmentMap.prototype.goToUserLocation = function(success, error){

	var map = this.map;
	var that = this;

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



