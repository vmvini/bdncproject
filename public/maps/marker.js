//ICONES PARA CADA TIPO DE DENUNCIA
var MARKER_ICON = (function() {

	var icon = "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|";

     var private = {
         'Assédio': icon+"FFD50A",
         'Violência': icon+"950770",
         'Estupro': icon+"B91B0F"
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



function getMarkInfoWindow(markProps){

	function createRow(key, value){
		return "<h3>"+ key + "</h3>" + "<p>" + value + "</p>";
	}

	function getTags(tags){
		var len = tags.length;
		var i;
		var tagstring = "";
		for(i =0;  i < len; i++){
			tagstring += tags[i] + ",";
		}

		return tagstring;
	}

	function convertBool(b){
		if(b){
			return "sim";
		}
		return "não";
	}

	function getUser(anonymous){
		if(!anonymous){
			return createRow("Usuário(a)",markProps.username ) +
				createRow("Email", markProps.useremail);
		}
		else{
			return "";
		}
	}


	var result = createRow("Tipo",markProps.crime ) +
				createRow("Vítima", convertBool(markProps.victim)) + 
				getUser(markProps.anonymous) + 
				createRow("Idade", markProps.userage) 	+
				createRow("Sexo", markProps.usersex) +
				createRow("Local da ocorrência", markProps.address) +
				createRow("Data da ocorrência", markProps.date.toLocaleDateString()) +
				createRow("Tags", getTags(markProps.tags));

	return result;	


}


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

	var infowindow = new google.maps.InfoWindow({
    	content: getMarkInfoWindow(markProps)
  	});



	marker.addListener('click', function(){
		if (marker.getAnimation() !== null) {
			marker.setAnimation(null);
		} else {
			marker.setAnimation(google.maps.Animation.BOUNCE);
		}

		infowindow.open(markProps.map, marker);
		
		if(markClick)
			markClick();
	});

	return marker;

}


function getAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function MarkProps(denuncia, map){
	console.log("criando markprops", denuncia);
	this.map = map;
	this.pos = denuncia.pos;
	this.label = denuncia.crime;
	this.crime = denuncia.crime;
	this.date = new Date(denuncia.date);
	this.tags = denuncia.tags;
	this.username = denuncia.user.name;
	this.useremail = denuncia.user.email;
	this.userage = getAge(new Date( denuncia.user.birthDate ) );
	this.usersex = denuncia.user.sex;
	this.address = denuncia.address;
	this.denuncia = denuncia;
	this.anonymous = denuncia.anonymous;
	this.victim = denuncia.victim;

}




function getMarks(){

	//get from database

	return [{lat:-5.637852598770853 , lng: -38.56201171875 , title:"title", label:"ASSEDIO" },

     {lat: -6.599130675207247, lng:-40.23193359375, title:"title", label:"ESTUPRO" },
     
     {lat:-6.446317749457633, lng:-36.6064453125, title:"title", label:"VIOLENCIA" },

     {lat:-7.406047717076259, lng:-38.583984375, title:"title", label:"ASSEDIO" }
     ];
}

