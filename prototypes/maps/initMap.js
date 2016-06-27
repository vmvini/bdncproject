function initMap() {
    
     var harassmentMap = new HarassmentMap();

     var map = harassmentMap.createMap("map");
     var infowindow = harassmentMap.createInfoWindow();

     harassmentMap.goToUserLocation(function(pos){
      		//success callback
      		infowindow.setPosition(pos);
      		infowindow.setContent('Localização encontrada!');
                 
      	}, function(){
      		//error callback
      		infowindow.setPosition(map.getCenter());
             infowindow.setContent('A localização falhou!');
       });
     

     marks = [{lat:-5.637852598770853 , lng: -38.56201171875 , title:"title", label:"ASSEDIO" },

     {lat: -6.599130675207247, lng:-40.23193359375, title:"title", label:"ESTUPRO" },
     
     {lat:-6.446317749457633, lng:-36.6064453125, title:"title", label:"VIOLENCIA" },

     {lat:-7.406047717076259, lng:-38.583984375, title:"title", label:"ASSEDIO" }

     ];

     harassmentMap.loadMarks(marks);

     harassmentMap.setClickEvent(function(e, hmap){
        
        //EXIBIR MODAL
        $('#myModalHorizontal').modal('show');
        

        //SETAR EVENTO CONFIRMAÇÃO DE DENUNCIA
        $('#denunciaBtn').on('click', function(){

          $('#denunciaBtn').off('click');

          console.log("realizou denuncia");
          
          var denuncia = {

             pos: {lat: e.latLng.lat(), lng: e.latLng.lng()},
             tags: $("#myTags").tagit("assignedTags"),
             vitima: false,
             crime: "ASSEDIO",
             anonimo: false,
             usuario: undefined

          };

          console.log(denuncia);


          addMarker(new MarkProps(denuncia, hmap.map));

          //FECHAR MODAL
          $('#myModalHorizontal').modal('hide');

        });



     });


     
}