var dinero = 0
var produccionSegundos = 2000;
var inversionDinero = 100;
var tiempoRefresco = 2000;
var multTiempo = 1.5;
var precioMejora = 1000;
var bitcoin = 0;


function minar() {
	
	dinero = dinero + 1;

}

function actualizar() {
	
	
	document.getElementById('infoDinero').innerHTML = "Euros: " + dinero + ' €';
	bitcoin = dinero * 0.00015;
	document.getElementById('infoBitcoin').innerHTML = "Bitcoins: " + bitcoin.toFixed(5) + ' Ƀ ';
	
	if (dinero >= precioMejora ) {
		
		document.getElementById('mejorarTiempoRefresco').removeAttribute('disabled');
	}
	
}

function mostrarInfo() {
	
	setInterval(function(){ 
	
		actualizar();
		dinero++;
		
		}, produccionSegundos);
			
}

function invertir(boton) {
	
	dinero = dinero + inversionDinero;
	actualizar();
		
	boton.setAttribute('disabled', true);
	setTimeout(function(){
		tiempoRefresco = tiempoRefresco * multTiempo;
        boton.value = ('Invertir');
        boton.removeAttribute('disabled');
    }, tiempoRefresco)
	
	
}

function mejorar(botonMejora) {
	
	botonMejora.setAttribute('title', precioMejora);
	precioMejora = precioMejora * 1.6;
	multTiempo = multTiempo - 0.2
	tiempoRefresco = tiempoRefresco / multTiempo;
	botonMejora.setAttribute('disabled', true);
	botonMejora.value = ('Mejorar tiempo: '+ precioMejora + ' €');
    botonMejora.setAttribute('disabled', false);
	
}
