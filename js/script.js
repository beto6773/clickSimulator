// Variables
var tarjetasGraficas = 1;
var precioGrafica = 450;
var bitcoinMinar = 0.0000002;

var bitcoin = 0;
var dinero = 0
var tiempoRefresco = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;

// Funcion para "minar". Aumenta los bitcoins en 0.01015
function minar() {
	bitcoin = bitcoin + bitcoinMinar;
	dinero = bitcoin * 9264.53;
	actualizar();

	document.getElementById('infoDinero').innerHTML = dinero.toFixed(5) + ' €';
	document.getElementById('infoBitcoin').innerHTML = bitcoin.toFixed(5) + ' Ƀ ';
	document.getElementById('tarjetasGraficas').innerHTML = tarjetasGraficas;
}

// Funcion para mostrar la información en pantalla.
function mostrarInfo() {
	setInterval(function(){
		var bitcoinFree = bitcoin + Math.random() * (0.0000017 - 0.0000007) + 0.0000007;
		bitcoin = bitcoin + bitcoinFree;
		actualizar();
	}, tiempoRefresco);
}


/* Actualiza la información de la pantalla, se ejecuta la funcion mostrarInfo() al cargar
la página y ésta llama a actualizar() cada
*/
function actualizar() {

	if (dinero < precioGrafica) {
		document.getElementById('comprarGrafica').setAttribute('disabled', true);
	}
	else {
		document.getElementById('comprarGrafica').removeAttribute('disabled');
	}


	document.getElementById('infoDinero').innerHTML = dinero.toFixed(5) + ' €';
	document.getElementById('infoBitcoin').innerHTML = bitcoin.toFixed(5) + ' Ƀ ';


	/*		condición que controla la funciona precioMejora()
	if (dinero >= precioMejora ) {
		document.getElementById('mejorarTiempoRefresco').removeAttribute('disabled');
	}
	*/
}

function comprarGrafica(x) {

	if (tarjetasGraficas > 9 && tarjetasGraficas < 11) {
		precioGrafica = precioGrafica * 2;
		alert ('¡El precio de las tarjetas gráficas ha subido!');
	}

	else if (tarjetasGraficas > 19 && tarjetasGraficas < 21) {
		precioGrafica = precioGrafica * 3;
		alert ('¡El precio de las tarjetas gráficas ha vuelto a subir!');
	}


	dinero = dinero - precioGrafica;
	bitcoin = dinero / 9264.55;
	tarjetasGraficas++
	bitcoinMinar = bitcoinMinar + Math.random() * (0.0000012 - 0.0000002) + 0.0000002;
	document.getElementById('tarjetasGraficas').innerHTML = tarjetasGraficas;
	actualizar();
}





/*		funcion de mejorar cooldown. Se puede aprovechar código.

 function mejorar(botonMejora) {
	botonMejora.setAttribute('title', precioMejora);
	precioMejora = precioMejora * 1.6;
	multTiempo = multTiempo - 0.2
	tiempoRefresco = tiempoRefresco / multTiempo;
	botonMejora.setAttribute('disabled', true);
	botonMejora.value = ('Mejorar tiempo: '+ precioMejora + ' €');
  botonMejora.setAttribute('disabled', false);
} */

/*		funcion de inverir. Se puede aprovechar código.

function invertir(boton) {
	dinero = dinero + inversionDinero;
	actualizar();
	boton.setAttribute('disabled', true);
	setTimeout(function(){
		tiempoRefresco = tiempoRefresco * multTiempo;
        boton.value = ('Invertir');
        boton.removeAttribute('disabled');
    }, tiempoRefresco)
} */


/*     Variables para las funciones deshabilitadas

var inversionDinero = 100;
var multTiempo = 1.5;
var precioMejora = 1000;
var produccionSegundos = 2000;

*/