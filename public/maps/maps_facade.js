function HarassmentMap(){

	//properties
	this.mapmarks = [];
	this.mappoints = [];
	this.infoWindow;
	this.heatmap;
	this.lock = false;

	//methods
	this.createMap;
	this.toggleHeatmap;
	this.loadMarks;
	this.setClickEvent;	
	this.bindMark;
	this.createInfoWindow;
	this.searchAutoComplete;
	this.getPosition;
	this.goToUserLocation;
	this.getVisibleDistance;
	this.getCurrentPosition;
	this.clearMarks;
	this.findMarksByDate;
	this.findMarksByCrime;
	this.findMarksByTags;

}


HarassmentMap.prototype.createMap = function(divId){

	

	this.map = new google.maps.Map(document.getElementById(divId), {

		center: {lat: -34.397, lng: 150.644},
    	zoom: 15

	});

	return this.map;

};

HarassmentMap.prototype.clearMarks = function(){

	this.mapmarks = [];
	this.mappoints = [];	
};


HarassmentMap.prototype.getCurrentPosition = function(){
	var bounds = this.map.getBounds();

	var center = bounds.getCenter();

	return {
		lat: center.lat(),
		lng: center.lng()
	};
};

HarassmentMap.prototype.getVisibleDistance = function(){

	var bounds = this.map.getBounds();

	var center = bounds.getCenter();
	var ne = bounds.getNorthEast();

	// r = radius of the earth in statute miles
	var r = 3963.0;  

	// Convert lat or lng from decimal degrees into radians (divide by 57.2958)
	var lat1 = center.lat() / 57.2958; 
	var lon1 = center.lng() / 57.2958;
	var lat2 = ne.lat() / 57.2958;
	var lon2 = ne.lng() / 57.2958;

	// distance = circle radius from center to Northeast corner of bounds
	var dis = r * Math.acos(Math.sin(lat1) * Math.sin(lat2) + 
		Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1));

	return dis;

};


HarassmentMap.prototype.toggleHeatmap = function(){

	console.log("mappoints: " + this.mappoints.length);
	console.log("mapmarks: " + this.mapmarks.length);

	if(this.heatmap.getMap() == null){
		console.log("nao tem heatmap");
		console.log("ativando");
		this.heatmap.setMap(this.map);
		setMapMarksVisibility.call(this, false);
		return true;
	}
	else{
		console.log("tem heatmap");
		console.log("desativando");
		this.heatmap.setMap(null);
		setMapMarksVisibility.call(this, true);
		return false;
	}

	function setMapMarksVisibility(bol){
		
		if(this.lock){
			return;
		}


		var markslen = this.mapmarks.length;

		this.mapmarks.forEach((function(m){
			this.lock = true;
			m.setVisible(bol);

			if(--markslen == 0){
				this.lock = false;
			}
		
		}).bind(this));
	}

};

/*
	marks
		mark
			lat
			lng
			title
			label

	end: this callback runs when the iteration through the marks array is completed
*/
HarassmentMap.prototype.loadMarks = function(marks, end){

	var i = 0;
	var count = marks.length;
	var createHeatMap;
	var alreadyExists;

	alreadyExists = (function(id){
		var len = this.mapmarks.length;
		var c;
		for(c = 0; c < len; c++){
			if(this.mapmarks[c].markProps._id === id){
				
				return true;
			}
		}

		return false;

	}).bind(this);

	marks.forEach( (function(mark){

		setTimeout((function(){

			/*var m = addMarker({
				map: this.map,
				pos: { lat: mark.lat, lng: mark.lng },
				title: mark.title,
				label: mark.label
			});*/

			finishLoop();
			if(alreadyExists(mark._id)){
				return;
			}
			var m = addMarker( new MarkProps(mark, this.map) );

			this.bindMark(m);
			

		}).bind(this), ++i * 200);

	}).bind(this) );


	createHeatMap = ( function(){
		if(!this.heatmap){
			this.heatmap = new google.maps.visualization.HeatmapLayer({
				data: this.mappoints
			});
		}

	} ).bind(this);

	function finishLoop(){
		
		count--;
		if(count == 0 ){


			createHeatMap();
			end();
		
		}
	}



};

/*
	callback(event, HarassmentMap)
*/
HarassmentMap.prototype.setClickEvent = function(callback){
	
	var bondCallback = (function(e){
		callback(e, this);
	}).bind(this);

	this.map.addListener('click', bondCallback );
};


HarassmentMap.prototype.bindMark = function(mark){
	
	this.mapmarks.push(mark);
	this.mappoints.push(mark.getPosition());

};


HarassmentMap.prototype.createInfoWindow = function(){

	this.infoWindow = new google.maps.InfoWindow({map: this.map});
	return this.infoWindow;

};



/*
	callback (arrayResults<QueryAutocompletePrediction>, error)
*/
HarassmentMap.prototype.searchAutoComplete = function(address, callback){

	var location = this.map.getCenter();

	var service = new google.maps.places.AutocompleteService();
	service.getQueryPredictions({ 
		input: address, 
		location: location,
		radius:500
	}, searchLocaleResponse(callback) );


	function searchLocaleResponse(callback){
		
		return function(results, status){

			placesServiceResponseBehavior(status, function(){
				callback(results);
			
			}, function(err){
				callback(null, err);
			} );

		};

	}

};

function placesServiceResponseBehavior(status, successBehavior, errorBehavior ){
	
	if(status == google.maps.places.PlacesServiceStatus.OK)
		successBehavior();

	else if(status == google.maps.places.PlacesServiceStatus.INVALID_REQUEST)
		errorBehavior({msg: 'Requisição inválida'});

	else if(status == google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT)
		errorBehavior({msg: 'A aplicação chegou ao seu limite de requisições.'});
	
	else if(status == google.maps.places.PlacesServiceStatus.REQUEST_DENIED)
		errorBehavior({msg: 'A aplicação não possui permissão para usar o serviço PlacesService'});
	
	else if(status == google.maps.places.PlacesServiceStatus.UNKNOWN_ERROR)
		errorBehavior({msg: 'Desculpe, ocorreu um erro no servidor. Tente mais tarde.'});
	
	else if(status == google.maps.places.PlacesServiceStatus.ZERO_RESULTS)
		errorBehavior({msg: 'Não foi possível encontrar esse local.'});
	
}



/*
	callback (position, viewport, error)
*/
HarassmentMap.prototype.getPosition = function(queryAutocompletePrediction, callback){

	var placeId = queryAutocompletePrediction.place_id;

	var placesService = new google.maps.places.PlacesService(this.map);

	placesService.getDetails({placeId: placeId}, function(placeResult, placeServiceStatus){
		
		var ok = function(){
			var geom = placeResult.geometry;
			var position = { lat: geom.location.lat(), lng: geom.location.lng() };
			callback(position, geom.viewport);
		};

		var errorBehavior = function(err){
			callback(null, null, err);
		};
		
		placesServiceResponseBehavior(placeServiceStatus, ok, errorBehavior);

	});

};



HarassmentMap.prototype.goToUserLocation = function(success, error){

	var currentPosition = function(position){
		var pos = {
	        lat: position.coords.latitude,
	        lng: position.coords.longitude
	      };

	      this.map.setCenter(pos);
	      
	      success(pos);
	};

	var bondCurrentPos = currentPosition.bind(this);

	if (navigator.geolocation) {
    	navigator.geolocation.getCurrentPosition( bondCurrentPos , function() {
      		error();
    	});
  
  	} else {
	    // Browser doesn't support Geolocation
	    error();
  	}

};

function Removeds(mapmarks){

	this.removeds = [];
	this.remLen;

	this.add = function(i){
		this.removeds.push(i);
		this.remLen = this.removeds.length;
	};

	this.erase = function(){
		var i;
		for(i=0;i<this.remLen;i++){
			mapmarks[this.removeds[i]].setVisible(false);
			//mapmarks.splice(this.removeds[i], 1);
		}
	};


}

function Matchs(mapmarks){

	this.matchs = [];
	this.len = 0;

	this.add = function(i){
		this.matchs.push(i);
		this.len = this.matchs.length;
	};

	
}




HarassmentMap.prototype.findMarksByFilter = function(data, crime, tags){

	//retorna os objetos que satisfazem a condição de data
	var createDateTest = (function(){

		var len = this.mapmarks.length;
		var i;
		var d1, d2;
		var matchs = new Matchs(this.mapmarks);

		for(i=0;i<len;i++){
			d1 = new Date(this.mapmarks[i].markProps.date );
			d2 = new Date(data);
			if( d1.getTime() === d2.getTime() ){
				matchs.add(i);
			}
		}

		return matchs;

	}).bind(this);


	//retorna os objetos que satisfazem a condião de tipo de crime
	var createCrimeTest = (function(){

		var len = this.mapmarks.length;
		var i;
		var matchs = new Matchs(this.mapmarks);

		for(i=0;i<len;i++){
			if(this.mapmarks[i].markProps.crime == crime ){
				matchs.add(i);
			}
			
		}
		return matchs;

	}).bind(this);


	//retorna os objetos que satisfazem a condição de tags
	var createTagsTest = (function(){
		var len = this.mapmarks.length;
		var i;
		var matchs = new Matchs(this.mapmarks);

		for(i=0;i<len;i++){
			if(hasAny( this.mapmarks[i].markProps.tags, tags ) ){
				matchs.add(i);
			}
		}

		return matchs;

		//arr1 contains any elements of arr2?
		function hasAny(array1, array2){
			return array1.some(function(v) { return array2.indexOf(v) != -1; });
		}
	}).bind(this);

	function mockAllMapMarksIndexes(mapmarks){
		var mock = new Matchs();	
		var len = mapmarks.length;
		var i;
		for (i = 0; i < len; i++){
			mock.add(i);
		}
		return mock;
		
	}

	var mock = mockAllMapMarksIndexes(this.mapmarks);



	var testDate = mock; 
	var testCrime = mock;
	var testTags = mock;

	if(data){
		console.log("recebeu data");
		testDate = createDateTest();
	}
	if(crime){
		console.log("recebeu crime");
		testCrime = createCrimeTest();
	}
	if(tags){
		console.log("recebeu tags");
		testTags = createTagsTest();
	}

	console.log("testDate",testDate);
	console.log("testCrime", testCrime);
	console.log("testTags", testTags);

	//fazer intersecção dos matchs
	//seta-los como visiveis
	//setar o resto como invisivel
	var matchAllConditions = _.intersection(testDate.matchs, testCrime.matchs, testTags.matchs);

	var drawResults = (function(){

		var mapMarksLen = this.mapmarks.length;	
		var i;
		for(i = 0; i < mapMarksLen; i++){
			if( _.contains(matchAllConditions, i) ){
				this.mapmarks[i].setVisible(true);
			}
			else{
				this.mapmarks[i].setVisible(false);
			}
		}

	}).bind(this);

	drawResults();
	


};




HarassmentMap.prototype.findMarksByDate = function(date){

	//this.mapmarks
	var len = this.mapmarks.length;
	var i;
	var d1, d2;
	var removeds = new Removeds(this.mapmarks);

	for(i=0;i<len;i++){
		d1 = new Date(this.mapmarks[i].markProps.date );
		d2 = new Date(date);
		if( d1.getTime() === d2.getTime() ){
			console.log("data igual");
			console.log(this.mapmarks[i].markProps.address);
			this.mapmarks[i].setVisible(true);
		}
		else{
			removeds.add(i);
			
		}
	}
	removeds.erase();
};

HarassmentMap.prototype.findMarksByCrime = function(crime){

	var len = this.mapmarks.length;
	var i;
	var removeds = new Removeds(this.mapmarks);

	for(i=0;i<len;i++){
		if(this.mapmarks[i].markProps.crime == crime ){
			console.log("crime igual");
			console.log(this.mapmarks[i].markProps.address);
			this.mapmarks[i].setVisible(true);
		}
		else{
			removeds.add(i);
		}
	}

	removeds.erase();

};

HarassmentMap.prototype.findMarksByTags = function(tags){

	var len = this.mapmarks.length;
	var i;
	var removeds = new Removeds(this.mapmarks);

	for(i=0;i<len;i++){
		if(hasAny( this.mapmarks[i].markProps.tags, tags ) ){
			console.log("contem a tag");
			console.log(this.mapmarks[i].markProps.address);
			this.mapmarks[i].setVisible(true);
		}
		else{
			removeds.add(i);
		}
	}

	removeds.erase();

	//arr1 contains any elements of arr2?
	function hasAny(array1, array2){
		return array1.some(function(v) { return array2.indexOf(v) != -1; });
	}

};
