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

     harassmentMap.loadMarks(getMarks(), function(){});

     harassmentMap.searchAutoComplete("Rua Serafim Bernardo", function(res, err){
        if(err){
          console.log(err.msg);
          return;
        }

        harassmentMap.getPosition(res[0], function(pos, viewport, error){
          if(error){
            console.log(error.msg);
            return;
          }
          console.log("POSIÇÃO DO LOCAL PESQUISADO: ", pos);
          //REALIZAR MARCAÇAO

          var denuncia = {

               pos: pos,
               tags: ['um', 'dois','tres'],
               vitima: false,
               crime: "ASSEDIO",
               anonimo: false,
               usuario: undefined

            };
            if(viewport)
              harassmentMap.map.fitBounds(viewport);
            else
              console.log("viewport nao conhecido");

            addMarker(new MarkProps(denuncia, harassmentMap.map));



        });
     });

     

     harassmentMap.setClickEvent(function(e, hmap){
        
        //EXIBIR MODAL
        $('#myModalHorizontal').modal('show');

        //SETAR EVENTO PARA QUANDO MODAL É FECHADO
        $('#myModalHorizontal').on('hidden.bs.modal', function () {
            $('#denunciaBtn').off('click');
            $('#myModalHorizontal').on('hidden.bs.modal');
        });

        //SETAR EVENTO CONFIRMAÇÃO DE DENUNCIA
        $('#denunciaBtn').on('click', function(){

            $('#denunciaBtn').off('click');
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