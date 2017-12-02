// Variables
var cartera = 0
var tiempoRefresco;

var tarjetasGraficas = 1;
var tarjetaGraficaRota = 0;
var precioGrafica = 450;

var bitcoinMinar = 0.0000042;
var bitcoinFree;
var bitcoin = 0;


// Funcion para "minar". Aumenta los bitcoins en 0.01015
function minar() {
	bitcoin = bitcoin + bitcoinMinar;
	tarjetaGraficaRota = Math.floor(Math.random() * (2000 - 1 + 1)) + 1;
		if (tarjetaGraficaRota === 552 && tarjetasGraficas > 1) {
			alert ('Se te ha roto una tarjeta gráfica.')
			tarjetasGraficas--;
			bitcoinMinar = bitcoinMinar * 0.93;
		}
	actualizar();
}

// Funcion para mostrar la informacion en pantalla.
function mostrarInfo() {
	setInterval(function(){
		bitcoinFree = Math.random() * (0.00012 - 0.000042) + 0.000042;
		tiempoRefresco = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
		bitcoin = bitcoin + bitcoinFree;
		actualizar();
	}, tiempoRefresco);
}
mostrarInfo();


/* Actualiza la informacion de la pantalla, se ejecuta la funcion mostrarInfo() al cargar
la pagina y esta llama a actualizar() cada
*/
function actualizar() {
	if (cartera < precioGrafica) {
		document.getElementById('comprarGrafica').setAttribute('disabled', true);
	}
	else {
		document.getElementById('comprarGrafica').removeAttribute('disabled');
	}

	var infoCartera = cartera;
	var infoBitcoin = bitcoin;

	document.getElementById('infoCartera').innerHTML = infoCartera.toFixed(2) + ' €';
	document.getElementById('infoBitcoin').innerHTML = infoBitcoin.toFixed(6) + ' ฿ ';
	document.getElementById('tarjetasGraficas').innerHTML = tarjetasGraficas;

}

/*		condicion que controla la funciona precioMejora()
if (dinero >= precioMejora ) {
document.getElementById('mejorarTiempoRefresco').removeAttribute('disabled');
}
*/

function comprarGrafica(x) {

	if (tarjetasGraficas > 9 && tarjetasGraficas < 11) {
		precioGrafica = precioGrafica + (precioGrafica / 3) * 2;
		alert ('¡El precio de las tarjetas gráficas ha subido!');
	}

	else if (tarjetasGraficas > 19 && tarjetasGraficas < 21) {
		precioGrafica = precioGrafica + (precioGrafica / 2) * 3;
		alert ('¡El precio de las tarjetas gráficas ha vuelto a subir!');
	}

	cartera = cartera - precioGrafica;
	tarjetasGraficas++
	bitcoinMinar = (bitcoinMinar / 2) + 0.0000061;
	document.getElementById('tarjetasGraficas').innerHTML = tarjetasGraficas;
	actualizar();
}

function venderBitcoins(cantidad){

	var cantidad = prompt('Cantidad a vender: ', bitcoin.toFixed(6) - 0.000001.toFixed(6));

	if (cantidad > bitcoin) {
		alert ('¡Error!. No tienes suficientes Bitcoins.');
	}

	else {
		bitcoin = bitcoin - cantidad;
		cartera = cartera + (cantidad * 9264.55);
	}
	actualizar();
}



/*		funcion de mejorar cooldown. Se puede aprovechar codigo.

 function mejorar(botonMejora) {
	botonMejora.setAttribute('title', precioMejora);
	precioMejora = precioMejora * 1.6;
	multTiempo = multTiempo - 0.2
	tiempoRefresco = tiempoRefresco / multTiempo;
	botonMejora.setAttribute('disabled', true);
	botonMejora.value = ('Mejorar tiempo: '+ precioMejora + ' â‚¬');
  botonMejora.setAttribute('disabled', false);
} */

/*		funcion de inverir. Se puede aprovechar codigo.

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
