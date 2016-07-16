window.onload = function(){

	function loadGoogleMap(src, callback){
		var script = document.createElement("script");
	    script.type = "text/javascript";
	    if(callback)script.onload=callback;
	    document.getElementsByTagName("head")[0].appendChild(script);
	    script.src = src;
	}

	loadGoogleMap("https://maps.googleapis.com/maps/api/js?v=3.24&key=AIzaSyDWD7AiYy5CKsYA0kJlPIVmy9aYEAKD240&libraries=places,visualization", initMap);
	
};