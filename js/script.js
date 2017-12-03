// Variables:
var cartera = 0
var tiempoRefresco = 10000;

// Variable para las tarjetas gráficas
var tarjetasGraficas = 1;
var tarjetaGraficaRota = 0;
var precioGrafica = 450;

// Variables bitcoin
var bitcoinMinar = 0.0000052;
var bitcoinMax = 0.000015;
var bitcoinMin = 0.0000052;
var bitcoinFree;
var bitcoin = 0;

// variable tiempo máximo y mínimo de actualizar()
var tiempoMax = 10000;
var tiempoMin = 5000;

// Funcion para mostrar la informacion en pantalla. Se repite constantemente.
function mostrarInfo() {
	setInterval(function(){
		bitcoinFree = Math.random() * (0.000011 - 0.0000052) + 0.0000052;
		bitcoin = bitcoin + bitcoinFree;
		tiempoRefresco = Math.random() * (tiempoMax - tiempoMin) + tiempoMin;
		actualizar();
	}, tiempoRefresco);
}
mostrarInfo();

//Controlar la "trampa" de presionar Enter en lugar de hacer click
function trampa(){
	document.getElementById("minar").addEventListener("keydown", function(event){
		if (event.keyCode == 13 || event.keyCode == 32) {
			actualizar();
			bitcoin = bitcoin / 2;
			cartera = cartera / 2;
		}
	} )
}

// Funcion para "minar". Aumenta los bitcoins en 0.01015
function minar() {
	bitcoinMinar = Math.random() * (bitcoinMax - bitcoinMin) + bitcoinMin;
	bitcoin = bitcoin + bitcoinMinar;
	tarjetaGraficaRota = Math.floor(Math.random() * (2500 - 1 + 1)) + 1;
		if (tarjetaGraficaRota == 550 && tarjetasGraficas > 1) {
			alert ('Se te ha roto una tarjeta gráfica.')
			tarjetasGraficas--;
			bitcoinMinar = bitcoinMinar * 0.8;
		}
	actualizar();
}


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
	bitcoinMinar = bitcoinMinar * 1.75;
	document.getElementById('tarjetasGraficas').innerHTML = tarjetasGraficas;
	actualizar();
}

function venderBitcoins(cantidad){
if (bitcoin < 0.000001) {
	alert ('¡Error!. No tienes suficientes Bitcoins.');
}

else {
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
}

// funcion para comprar un "boost-pack". Se deshabilita por 30 segundos.
var precioCafe = 2.50;

// Variables para controlar el maximo y minimo actual.
var maxActual;
var minActual;

function comprarCafe(){
	if (tiempoEspera <= 30 && cartera > precioCafe) {
		cartera = cartera - precioCafe;
		maxActual = bitcoinMax;
		minActual = bitcoinMin;
		cuentaAtras();
	}
	else {
		alert ('No tienes dinero suficiente.');
	}
}

var tiempoEspera = 30; // variable para controlar el tiempo de espera.

function cuentaAtras() {
	document.getElementById('comprarCafe').setAttribute('disabled', true);
	tiempoEspera--;
	actualizar();
	setTimeout(function () {
			if ( tiempoEspera < 31 && tiempoEspera >= 25){

				if ( tiempoEspera <= 25 ){
					bitcoinMax = maxActual;
					bitcoinMin = minActual;
				}
				else {
					bitcoinMax = 0.00010;
					bitcoinMin = 0.00005;
				}
				//bitcoinMinar = bitcoinMinar + (bitcoinMinar / 50);
				document.getElementById('comprarCafe').innerHTML = "Comprar café (" + tiempoEspera + ")";
				cuentaAtras();

			}
			else if (tiempoEspera < 25 && tiempoEspera > 0 ){
				document.getElementById('comprarCafe').innerHTML = "Comprar café (" + tiempoEspera + ")";
				cuentaAtras();
			}

			else {
				bitcoinMax = maxActual;
				bitcoinMin = minActual;
				document.getElementById('comprarCafe').removeAttribute('disabled');
				document.getElementById('comprarCafe').innerHTML = "Comprar café";
				actualizar();
				tiempoEspera = 30;
			}
		}, 1000);
}

//variables para la funcion comprarSoftware
var x = 1; // controlar el progreso de la progressbar
var comprar = 0; // controlar la confirmacion por parte del usuario
var instalado = false; // controlar si el sofware está instalado

function comprarSoftware() {

	if (comprar == 0 && cartera >= 90){
		document.getElementById('comprarSoftware').setAttribute('disabled',true);
		comprar = confirm('¿Quieres comprar el sofware?');
			if (instalado == true){
				alert ('Ya tienes instalado este software');
			}
			else if (comprar == true){
				cartera = cartera - 90;
				actualizar();
				comprarSoftware();
			}
			else if (comprar == false){
				document.getElementById('comprarSoftware').removeAttribute('disabled');
				actualizar();
			}
		}
	else if (comprar > 0) {
		if (x < 101){
			document.getElementById("software").removeAttribute('hidden');
			setTimeout(function(){
			document.getElementById("softwareProgreso").setAttribute('style', 'width:' + x + '%');
			document.getElementById('softwareProgreso').innerHTML = x + '%';
			x++;
			comprarSoftware();
		}, Math.floor(Math.random() * (2000 - 200 + 1)) + 200);
		}
		else if (x > 100) {
			if (tiempoMax == 10000 && tiempoMin == 5000){
				tiempoMax = 3050;
				tiempoMin = 1700;
				tiempoRefresco = Math.random() * (tiempoMax - tiempoMin) + tiempoMin;
				mostrarInfo();
			}
			comprar = 0;
			x = 1;
			document.getElementById("software").setAttribute('hidden', true);
			document.getElementById("softwareProgreso").setAttribute('style', 'width:' + 0 + '%');
			document.getElementById('comprarSoftware').setAttribute('title','Ya está instalado');
			document.getElementById('comprarSoftware').setAttribute('class','btn btn-success');
			document.getElementById('comprarSoftware').innerHTML = "¡Software.exe instalado!";
			instalado = true;
		}
	}
	else {
		alert('No tienes dinero suficiente');
	}
}


//Ideas:
//producto CAFE, LIBRO, PELOTA ANTI ESTRES ...



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
