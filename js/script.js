// Comprueba si hay un almacenamiento local de "Variables", si está lo carga y si no está crea el objeto Variables con las variables necesarias y guarda el objeto en localStorage.
if (localStorage.getItem("Variables") === null) {
	var Variables = {

		// Variables relacionadas con el dinero
		precioBitcoinMin : 7662.55,
		precioBitcoinMax : 11840.21,
		bitcoinMinar : 0.0000052,
		bitcoinMax : 0.000015,
		bitcoinMin : 0.0000052,
		bitcoinFree : 0,
		bitcoin : 0,
		cartera: 0,
		tiempoRefresco : 10000,

		// Variable para las tarjetas gráficas
		tarjetasGraficas : 1,
		tarjetaGraficaRota : 0,
		precioGrafica : 450,

		// variable tiempo máximo y mínimo de actualizarInfo()
		tiempoMax : 10000,
		tiempoMin : 5000,

		// variable para controlar si el software está instalado
		instalado : 0,
		servicioMensual: " ",
		tiempoCobro : 1,

		// variable para el control del cafe
		tiempoEspera: 45,
	}

	// Se guarda en localStorage el objeto que se acaba de crear.
	localStorage.setItem("Variables", JSON.stringify(Variables))
}
else {
	// Parsea el objeto almacenado en localStorage y lo carga.
	Variables = JSON.parse(localStorage.Variables);
	localStorage.getItem("Variables");
}

// fin de la comprobación de carga localStorage.


//   Inicio de Variables necesarias para las funciones, no es necesario guardaras en localStorage

// comprarCafe()
var precioCafe = 2.10;
var maxActual;
var minActual;

// borrar()
var borrado = false;

// actualizarInfo()
var infoCartera = 0;
var infoBitcoin = 0;

// venderBitcoins()  ----  Variable para controlar el precio actual del bitcoin aleatoriamente.
var precioBitcoinAleatorio = 9521.26;
var precioBitcoinAleatorioAnterior;

// comprarSoftware()
var precioSoftware = 100;

//variables para la funcion comprarSoftware
var seg = 1; 									// controlar el progreso de la progressbar
var comprar = 0; 							// controlar la confirmacion por parte del usuario

// fin de variables.

function activarTrucos(){
	document.getElementById("cuerpo").addEventListener("keydown", function(event){
		if (event.keyCode == 73) {
			$("#activarTrucos").modal();
		}
	})
}
function masDinero(){
	Variables.cartera += parseFloat(document.getElementById('dinero').value);
	guardar();
	location.reload();
}

//Controlar la "trampa" de presionar Enter en lugar de hacer click
function trampa(){
	document.getElementById("minar").addEventListener("keydown", function(event){
		if (event.keyCode == 13 || event.keyCode == 32) {
			actualizarInfo();
			Variables.bitcoin = Variables.bitcoin / 2;
			Variables.cartera = Variables.cartera / 2;
		}
	} )
}

// funciones para guardar y/o borrar datos del localStorage
function guardar(){
	localStorage.setItem("Variables", JSON.stringify(Variables))
}

function borrar() {
	borrado = confirm('¿Seguro que quieres empezar una nueva partida?');
	if (borrado == true){
		while (localStorage.getItem("Variables") != null){
			localStorage.clear("Variables");
	}
		location.reload();
	}
}

/*  Funcion principal.
Actualiza la informacion de la pantalla, se ejecuta la funcion mostrarInfo() al cargar
la pagina y esta llama a actualizarInfo() cada
*/
function actualizarInfo() {
	guardar();

	if (Variables.cartera <= Variables.precioGrafica) {
		document.getElementById('comprarGrafica').setAttribute('disabled', true);
	}
	else {

		document.getElementById('comprarGrafica').removeAttribute('disabled');
	}

	infoCartera = Variables.cartera;
	infoBitcoin = Variables.bitcoin;

	document.getElementById('infoCartera').innerHTML = parseFloat(infoCartera).toFixed(2) + ' €';
	document.getElementById('infoBitcoin').innerHTML = parseFloat(infoBitcoin).toFixed(6) + ' ฿ ';
	document.getElementById('tarjetasGraficas').innerHTML = Variables.tarjetasGraficas;
	if (typeof precioBitcoinAleatorio === 'undefined') {
	document.getElementById('bitcoinActual').innerHTML = "Recopilando información...";
	}
	else if (precioBitcoinAleatorioAnterior < precioBitcoinAleatorio){
	document.getElementById('bitcoinActual').innerHTML = "  " + precioBitcoinAleatorio.toFixed(2);
	document.getElementById('bitcoinActual').setAttribute("class","glyphicon glyphicon-arrow-up")
	document.getElementById('bitcoinActual').setAttribute("style","color: #449D44; font-size: 18px")
	}
	else if (precioBitcoinAleatorioAnterior > precioBitcoinAleatorio){
	document.getElementById('bitcoinActual').innerHTML = "  " + precioBitcoinAleatorio.toFixed(2);
	document.getElementById('bitcoinActual').setAttribute("class","glyphicon glyphicon-arrow-down red")
	document.getElementById('bitcoinActual').setAttribute("style","color: red; font-size: 18px")
	}
	else if (precioBitcoinAleatorioAnterior == precioBitcoinAleatorio){
	document.getElementById('bitcoinActual').innerHTML = "  " + precioBitcoinAleatorio.toFixed(2);
	document.getElementById('bitcoinActual').setAttribute("class","glyphicon glyphicon-arrow-right grey")
	document.getElementById('bitcoinActual').setAttribute("style","color: grey; font-size: 18px")
	}
	else {
		document.getElementById('bitcoinActual').innerHTML = "  " + precioBitcoinAleatorio.toFixed(2);
	}


}

// Funcion para mostrar la informacion en pantalla. Se repite constantemente en función del tiempo de refresco actual..
function mostrarInfo() {
	setInterval(function(){
		precioBitcoinAleatorioAnterior = precioBitcoinAleatorio;
		precioBitcoinAleatorio =  Math.random() * (Variables.precioBitcoinMax - Variables.precioBitcoinMin) + Variables.precioBitcoinMin;
		Variables.bitcoinFree = Math.random() * (0.000011 - 0.0000052) + 0.0000052;
		Variables.bitcoin = Variables.bitcoin + Variables.bitcoinFree;
		Variables.tiempoRefresco = Math.random() * (Variables.tiempoMax - Variables.tiempoMin) + Variables.tiempoMin;
		comprobarServicio();
		actualizarInfo();
	}, Variables.tiempoRefresco);
}


// Funcion para "minar". Aumenta los bitcoins en 0.01015
function minar() {
	Variables.bitcoinMinar = Math.random() * (Variables.bitcoinMax - Variables.bitcoinMin) + Variables.bitcoinMin;
	Variables.bitcoin = Variables.bitcoin + Variables.bitcoinMinar;
	Variables.tarjetaGraficaRota = Math.floor(Math.random() * (2500 - 1 + 1)) + 1;

		if (Variables.tarjetaGraficaRota == 550 && Variables.tarjetasGraficas > 1) {
			alert ('Se te ha roto una tarjeta gráfica.')
			Variables.tarjetasGraficas--;
			variables.bitcoinMax = variables.bitcoinMax * 0.6;
			variables.bitcoinMin = variables.bitcoinMin * 0.6;
		}
	actualizarInfo();
}

// Funcion para comprobar si está seleccionada la opción de vender todos los bitcoins.
function comprobarCambio(){
		if (document.getElementById('venderTodo').checked == true){
			document.getElementById('venderBitcoins').setAttribute("class", "btn btn-danger");
			document.getElementById('venderBitcoins').innerHTML = "Vender TODOS";
		}
		else if (document.getElementById('venderTodo').checked == false){
			document.getElementById('venderBitcoins').setAttribute("class", "btn btn-warning");
			document.getElementById('venderBitcoins').innerHTML = "Vender cantidad";
		}
}

// Funcion vender bitcoins
function venderBitcoins(cantidad){
if (document.getElementById('venderTodo').checked == true){
	Variables.cartera = Variables.cartera + (Variables.bitcoin * precioBitcoinAleatorio);
	Variables.bitcoin = Variables.bitcoin - Variables.bitcoin;
	localStorage.setItem("Variables", JSON.stringify(Variables))
	actualizarInfo();
}

else if (Variables.bitcoin.toFixed(6) < 0.000001) {
	alert ('¡Error!. No tienes suficientes Bitcoins.');
}

else {
	var cantidad = prompt('Cantidad a vender: ', Variables.bitcoin - 0.000001);

	if (cantidad > Variables.bitcoin) {
		alert ('¡Error!. No tienes suficientes Bitcoins.');
	}
	else {
		Variables.bitcoin = Variables.bitcoin - cantidad;
		precioBitcoinAleatorio =  Math.random() * (Variables.precioBitcoinMax - Variables.precioBitcoinMin) + Variables.precioBitcoinMin;
		Variables.cartera = Variables.cartera + (cantidad * precioBitcoinAleatorio);
		localStorage.setItem("Variables", JSON.stringify(Variables))
	}
	actualizarInfo();
	}
}

// función para comprar tarjeta gráfica.
function comprarGrafica() {

	if (Variables.cartera < Variables.precioGrafica){
		alert ('¡No tienes dinero suficiente!')
	}

	else if (Variables.tarjetasGraficas > 9 && Variables.tarjetasGraficas < 11) {
		Variables.precioGrafica = Variables.precioGrafica + (Variables.precioGrafica / 3) * 2;
		alert ('¡El precio de las tarjetas gráficas ha subido!');
	}

	else if (Variables.tarjetasGraficas > 19 && Variables.tarjetasGraficas < 21) {
		Variables.precioGrafica = Variables.precioGrafica + (Variables.precioGrafica / 2) * 3;
		alert ('¡El precio de las tarjetas gráicas ha vuelto a subir!');
	}

	else {
		Variables.cartera = Variables.cartera - Variables.precioGrafica;
		Variables.tarjetasGraficas++
		Variables.bitcoinMax = Variables.bitcoinMax * 1.56;
		Variables.bitcoinMin = Variables.bitcoinMin * 1.41;
		document.getElementById('tarjetasGraficas').innerHTML = Variables.tarjetasGraficas;
		actualizarInfo();
	}
}

// funcion para comprar un "boost-pack". Se deshabilita por 45 segundos.
function comprarCafe(){

	if (Variables.tiempoEspera < 45) {
		cuentaAtras();
	}

	else if (Variables.tiempoEspera <= 45 && Variables.cartera > precioCafe) {
		Variables.cartera = Variables.cartera - precioCafe;
		maxActual = Variables.bitcoinMax;
		minActual = Variables.bitcoinMin;
		cuentaAtras();
	}
	else {
		alert ('No tienes dinero suficiente.');
	}
}

// función para controlar la cuenta atrás de comprarCafe()
function cuentaAtras() {
	document.getElementById('comprarCafe').setAttribute('disabled', true);
	Variables.tiempoEspera--;
	guardar();
	setTimeout(function () {
			if ( Variables.tiempoEspera < 46 && Variables.tiempoEspera >= 42){

				if ( Variables.tiempoEspera <= 42 ){
					Variables.bitcoinMax = maxActual;
					Variables.bitcoinMin = minActual;
				}

				else if (Variables.tiempoEspera > 42 && Variables.tarjetasGraficas > 4) {
					Variables.bitcoinMax = Variables.bitcoinMax * 1.22;
					Variables.bitcoinMin = Variables.bitcoinMax * 1.23;
				}
				else if (Variables.tiempoEspera > 42) {
					Variables.bitcoinMax = Variables.bitcoinMax * 1.8;
					Variables.bitcoinMin = Variables.bitcoinMax * 2.1;
				}

				document.getElementById('comprarCafe').innerHTML = "Comprar café (" + Variables.tiempoEspera + ")";
				cuentaAtras();

			}
			else if (Variables.tiempoEspera < 42 && Variables.tiempoEspera > 0 ){
				document.getElementById('comprarCafe').innerHTML = "Comprar café (" + Variables.tiempoEspera + ")";
				cuentaAtras();
			}

			else {
				Variables.bitcoinMax = maxActual;
				Variables.bitcoinMin = minActual;
				document.getElementById('comprarCafe').removeAttribute('disabled');
				document.getElementById('comprarCafe').innerHTML = "Comprar café";
				Variables.tiempoEspera = 45;
				guardar();
			}
		}, 1000);
}

// Comprar software. Reduce el tiempo entre un bitcoinFree y otro.
function comprarSoftware() {
	if (comprar == 0 && Variables.cartera >= precioSoftware){
		document.getElementById('comprarSoftware').setAttribute('disabled',true);
		comprar = confirm('¿Quieres comprar la licencia del sofware? Te costará 100€');
			if (Variables.instalado == 1){
				alert ('Ya tienes instalado este software');
				document.getElementById('comprarSoftware').setAttribute('title','Ya está instalado');
				document.getElementById('comprarSoftware').setAttribute('class','btn btn-success');
				document.getElementById('comprarSoftware').innerHTML = "¡Software.exe instalado!";
			}
			else if (comprar == true){
				Variables.cartera = Variables.cartera - precioSoftware;
				actualizarInfo();
				comprarSoftware();
			}
			else if (comprar == false){
				document.getElementById('comprarSoftware').removeAttribute('disabled');
				actualizarInfo();
			}
		}
	else if (comprar > 0) {
		if (seg < 101){
			document.getElementById("software").removeAttribute('hidden');
			setTimeout(function(){
			document.getElementById("softwareProgreso").setAttribute('style', 'width:' + seg + '%');
			document.getElementById('softwareProgreso').innerHTML = seg + '%';
			seg++;
			comprarSoftware();
		},Math.floor(Math.random() * (2000 - 200 + 1)) + 200);
		}
		else if (seg > 100) {
			if (Variables.tiempoMax == 10000 && Variables.tiempoMin == 5000){
				Variables.tiempoMax = 3050;
				Variables.tiempoMin = 1700;
				Variables.tiempoRefresco = Math.random() * (Variables.tiempoMax - Variables.tiempoMin) + Variables.tiempoMin;
				mostrarInfo();
			}
			comprar = 0;
			seg = 1;
			document.getElementById("software").setAttribute('hidden', true);
			document.getElementById("softwareProgreso").setAttribute('style', 'width:' + 0 + '%');
			document.getElementById('comprarSoftware').setAttribute('title','Ya está instalado');
			document.getElementById('comprarSoftware').setAttribute('class','btn btn-success');
			document.getElementById('comprarSoftware').innerHTML = "¡Software.exe instalado!";
			Variables.instalado = 1;
		}
	}
	else {
		alert('No tienes dinero suficiente');
	}
}

var seleccion;
var precioSpookyFly = 9.95;
function tienda(seleccion){
	if (seleccion == 'SpookyFly'){
		if (Variables.cartera >= precioSpookyFly){
			Variables.servicioMensual = "SpookyFly";
			Variables.tiempoCobro = 60;
			comprobarServicio();
		}
		else {
			alert ('No tienes dinero suficiente!');
		}
}
}

function comprobarServicio(){

if (Variables.servicioMensual != " ") {
	if (Variables.servicioMensual == "SpookyFly"){
		if (Variables.tiempoCobro < 1){
			var s = confirm('El mes de '+ Variables.servicioMensual + ' ha finalizado. ¿Quieres continuar con el servicio?');
				if(s == true && Variables.cartera >= precioSpookyFly){
					Variables.cartera = Variables.cartera - precioSpookyFly;
					alert ('Gracias por continuar con nosotros!');
					document.getElementById('SpookyFly').addAttribute('disabled', true);
					Variables.tiempoCobro = 60;
				}
				else if (s == true && Variales.cartera < precioSpookyFly){
					alert ('No tienes dinero suficiente!')
					Variables.tiempoCobro = 1;
					Variables.servicioMensual = " ";
					document.getElementById('SpookyFly').removeAttribute('disabled');
				}
				else{
					Variables.tiempoCobro = 1;
					Variables.servicioMensual = " ";
					document.getElementById('SpookyFly').removeAttribute('disabled');
				}
		}
		else if (Variables.tiempoCobro > 0  && Variables.tiempoCobro == 60){
			var c = confirm('¿ Quieres contratar '+Variables.servicioMensual+" ? \n\nSe te cobrará una cuota de 9,95 €.");
			if (c == true){
				alert ('Gracias por suscribirte a nuestro servicio!')
				Variables.cartera = Variables.cartera - precioSpookyFly;
				document.getElementById('SpookyFly').setAttribute('disabled', true);
				Variables.tiempoCobro--;
			}
			else {
				Variables.servicioMensual = " ";
			}
		}
		else if (Variables.tiempoCobro < 60) {
			Variables.tiempoCobro--;
		}
	}
}
}
