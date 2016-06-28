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

	//markProps.map.setCenter(markProps.pos);

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


function getMarks(){

	//get from database

	return [{lat:-5.637852598770853 , lng: -38.56201171875 , title:"title", label:"ASSEDIO" },

     {lat: -6.599130675207247, lng:-40.23193359375, title:"title", label:"ESTUPRO" },
     
     {lat:-6.446317749457633, lng:-36.6064453125, title:"title", label:"VIOLENCIA" },

     {lat:-7.406047717076259, lng:-38.583984375, title:"title", label:"ASSEDIO" },

     {lat:-8.406047717076259, lng:-34.583984375, title:"title", label:"ASSEDIO" },
     {lat:-5.406047717076259, lng:-29.583984375, title:"title", label:"ASSEDIO" },
     {lat:-10.406047717076259, lng:-40.583984375, title:"title", label:"ASSEDIO" },
     {lat:-11.406047717076259, lng:-39.583984375, title:"title", label:"ASSEDIO" },
     {lat:-5.406047717076259, lng:-30.583984375, title:"title", label:"ASSEDIO" }

     ];
}

