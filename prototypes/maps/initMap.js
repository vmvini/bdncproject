function initMap() {
    
     var harassmentMap = new HarassmentMap();

     var map = harassmentMap.createMap("map");
     var infowindow = harassmentMap.createInfoWindow();

     harassmentMap.goToUserLocation(function(pos){
      		//success callback
      		infowindow.setPosition(pos);
      		infowindow.setContent('Localização encontrada!');
          loadNearMap();

                 
      	}, function(){
      		//error callback
      		infowindow.setPosition(map.getCenter());
             infowindow.setContent('A localização falhou!');
       });
     
function loadNearMap(){

     harassmentMap.loadMarks(getMarks(), function(){
      harassmentMap.toggleHeatmap();
     });

     

     harassmentMap.setClickEvent(function(e, hmap){
        
        //EXIBIR MODAL
        $('#myModalHorizontal').modal('show');
        
        //SETAR EVENTO DE BOTAO CANCELAR DENUNCIA
        $('#cancelarBtn').on('click', function(){
           $('#myModalHorizontal').modal('hide');
            $('#denunciaBtn').off('click');
            $('#cancelarBtn').off('click');
        });

        //SETAR EVENTO CONFIRMAÇÃO DE DENUNCIA
        $('#denunciaBtn').on('click', function(){

            $('#denunciaBtn').off('click');
            $('#cancelarBtn').off('click');

            console.log("realizou denuncia");
            
            //CRIAR OBJETO DENUNCIA Q SERÁ PERSISTIDO
            var denuncia = {

               pos: {lat: e.latLng.lat(), lng: e.latLng.lng()},
               tags: $("#myTags").tagit("assignedTags"),
               vitima: false,
               crime: "ASSEDIO",
               anonimo: false,
               usuario: undefined

            };

            console.log(denuncia);

            //ADICIONAR MARCAÇÃO DA DENUNCIA NO MAPA
            addMarker(new MarkProps(denuncia, hmap.map));

            //FECHAR MODAL
            $('#myModalHorizontal').modal('hide');

        });



     });

}
     


     
}