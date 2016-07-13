function HeatMapControl(harassmentMap){

	var controlDiv = document.createElement('div');

	// Set CSS for the control border.
	var controlUI = document.createElement('div');
	controlUI.style.backgroundColor = '#fff';
	controlUI.style.border = '2px solid #fff';
	controlUI.style.borderRadius = '3px';
	controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
	controlUI.style.cursor = 'pointer';
	controlUI.style.marginBottom = '22px';
	controlUI.style.textAlign = 'center';
	controlUI.title = 'Clique para ver mapa de calor';
	controlDiv.appendChild(controlUI);

	// Set CSS for the control interior.
	var controlText = document.createElement('div');
	controlText.style.color = 'rgb(25,25,25)';
	controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
	controlText.style.fontSize = '16px';
	controlText.style.lineHeight = '38px';
	controlText.style.paddingLeft = '5px';
	controlText.style.paddingRight = '5px';
	controlText.innerHTML = 'Mapa de Calor';
	controlUI.appendChild(controlText);

	// Setup the click event listeners: simply set the map to Chicago.
	controlUI.addEventListener('click', function() {
		var heatMapOn = harassmentMap.toggleHeatmap();

		if(heatMapOn)
			controlUI.title = 'Clique para desativar mapa de calor';
		else
			controlUI.title = 'Clique para ver mapa de calor';


	});


	controlDiv.index = 1;
	harassmentMap.map.controls[google.maps.ControlPosition.TOP_CENTER].push(controlDiv);


}