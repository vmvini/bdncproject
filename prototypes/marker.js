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
