var app = {

	inicio: function(){
		FastClick.attach(document.body);
		navigator.geolocation.getCurrentPosition(app.mostrarMapa, app.errorVisualizacion);
	},

	mostrarMapa: function(position){
		mapboxgl.accessToken = 'pk.eyJ1IjoiaXJpZWwiLCJhIjoiY2s5d3dwNDB2MDVhODNlcWRrd3l1djR4aSJ9.AvRXaGoKZIzNNVpxRetaKA';
		var miMapa = new mapboxgl.Map({
				container: 'map', // container id
				style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
				center: [position.coords.longitude, position.coords.latitude], // starting position [lng, lat]
				zoom: 13 // starting zoom
			});
		
		miMapa.addControl(new mapboxgl.NavigationControl());
		app.pintaMarcador([position.coords.longitude, position.coords.latitude], '¡Estoy aquí!', miMapa);

		/*
		var miMapa = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);
*/
		miMapa.on('click', function(evento){
									var texto = 'Lat: ' + evento.lngLat.lat.toFixed(2) + ', Long: ' + evento.lngLat.lng.toFixed(2);
									app.pintaMarcador([evento.lngLat.lng, evento.lngLat.lat], texto, miMapa);
								});
								
	},

	pintaMarcador: function(lnglat, texto, mapa){
		var marker = new mapboxgl.Marker()
			.setLngLat(lnglat)
			.setPopup(new mapboxgl.Popup({ closeOnClick: true }).setHTML(texto)) // add popup
			.addTo(mapa);
		marker.togglePopup();
	},

	errorVisualizacion: function(error){
		console.log(error.code + ': ' + error.message);
	}
};

if ('addEventListener' in document) {
	//document.addEventListener('DOMContentLoaded', function() { app.iniciaFastClick(); }, false);
	document.addEventListener('deviceready', function() { app.inicio(); }, false);
}