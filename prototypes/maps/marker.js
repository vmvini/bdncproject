//ICONES PARA CADA TIPO DE DENUNCIA
var MARKER_ICON = (function() {

	var icon = "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|";

     var private = {
         'ASSEDIO': icon+"FFD50A",
         'VIOLENCIA': icon+"950770",
         'ESTUPRO': icon+"B91B0F"
     };

     return {
        get: function(name) { return private[name]; }
    };
})();


/*
		markProps
			map
			pos
			animation - null
			title
		
		markClick - callback for click event

	*/



function addMarker(markProps, markClick ){


    
	markProps.map.setCenter(markProps.pos);

	var marker = new google.maps.Marker({
		position: markProps.pos,
		map:markProps.map,
		animation: google.maps.Animation.DROP,
		icon: {
		    url :MARKER_ICON.get(markProps.label),
		    size : new google.maps.Size(21,34),
		    anchor : new google.maps.Point(10,34)
		}
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



function MarkProps(denuncia, map){

	this.map = map;
	this.pos = denuncia.pos;
	this.label = denuncia.crime;

	this.denuncia = denuncia;

}