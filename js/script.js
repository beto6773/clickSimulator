// Comprueba si hay un almacenamiento local de "Variables", si está lo carga y si no está crea el objeto Variables con las variables necesarias y guarda el objeto en localStorage.
if (localStorage.getItem("Variables") === null) {
	var Variables = {

		//Dinero en la cartera y tiempo de refresco entre freebitcoins.
		cartera:0,
		tiempoRefresco : 10000,

		// Variable para las tarjetas gráficas
		tarjetasGraficas : 1,
		tarjetaGraficaRota : 0,
		precioGrafica : 450,

		// Variables bitcoin
		bitcoinMinar : 0.0000052,
		bitcoinMax : 0.000015,
		bitcoinMin : 0.0000052,
		bitcoinFree : 0,
		bitcoin : 0,

		// variable tiempo máximo y mínimo de actualizar()
		tiempoMax : 10000,
		tiempoMin : 5000,

		// variable para controlar si el software está instalado
		instalado : 0,

		// variable para el control del cafe
		tiempoEspera: 60,

	}
	// Se guarda en localStorage el objeto que se acaba de crear.
	localStorage.setItem("Variables", JSON.stringify(Variables))
}

else {

	// Parsea el objeto almacenado en localStorage y lo carga.
	Variables = JSON.parse(localStorage.Variables);
	localStorage.getItem("Variables");
}

// funciones para guardar y/o borrar datos del localStorage
function guardar(){
	localStorage.setItem("Variables", JSON.stringify(Variables))
}

var borrado = false;
function borrar() {
	borrado = confirm('¿Seguro que quieres reinciar los datos?');
	if (borrado == true){
		localStorage.clear("Variables");
		location.reload();
	}
}


// Funcion para mostrar la informacion en pantalla. Se repite constantemente.
function mostrarInfo() {
	setInterval(function(){
		Variables.bitcoinFree = Math.random() * (0.000011 - 0.0000052) + 0.0000052;
		Variables.bitcoin = Variables.bitcoin + Variables.bitcoinFree;
		Variables.tiempoRefresco = Math.random() * (Variables.tiempoMax - Variables.tiempoMin) + Variables.tiempoMin;
		guardar();
		actualizar();
	}, Variables.tiempoRefresco);
}
mostrarInfo();


//Controlar la "trampa" de presionar Enter en lugar de hacer click
function trampa(){
	document.getElementById("minar").addEventListener("keydown", function(event){
		if (event.keyCode == 13 || event.keyCode == 32) {
			actualizar();
			Variables.bitcoin = Variables.bitcoin / 2;
			Variables.cartera = Variables.cartera / 2;
		}
	} )
}

// Funcion para "minar". Aumenta los bitcoins en 0.01015
function minar() {
	Variables.bitcoinMinar = Math.random() * (Variables.bitcoinMax - Variables.bitcoinMin) + Variables.bitcoinMin;
	Variables.bitcoin = Variables.bitcoin + Variables.bitcoinMinar;
	Variables.tarjetaGraficaRota = Math.floor(Math.random() * (2500 - 1 + 1)) + 1;

		if (Variables.tarjetaGraficaRota == 550 && Variables.tarjetasGraficas > 1) {
			alert ('Se te ha roto una tarjeta gráfica.')
			Variables.tarjetasGraficas--;
			Variables.bitcoinMinar = Variables.bitcoinMinar * 0.8;
		}
	actualizar();
}

/* Actualiza la informacion de la pantalla, se ejecuta la funcion mostrarInfo() al cargar
la pagina y esta llama a actualizar() cada
*/
function actualizar() {
	guardar();
	if (Variables.cartera < Variables.precioGrafica) {
		document.getElementById('comprarGrafica').setAttribute('disabled', true);
	}
	else {
		document.getElementById('comprarGrafica').removeAttribute('disabled');
	}

	var infoCartera = Variables.cartera;
	var infoBitcoin = Variables.bitcoin;

	document.getElementById('infoCartera').innerHTML = infoCartera.toFixed(2) + ' €';
	document.getElementById('infoBitcoin').innerHTML = infoBitcoin.toFixed(6) + ' ฿ ';
	document.getElementById('tarjetasGraficas').innerHTML = Variables.tarjetasGraficas;

}

function comprarGrafica(x) {

	if (Variables.tarjetasGraficas > 9 && Variables.tarjetasGraficas < 11) {
		Variables.precioGrafica = Variables.precioGrafica + (Variables.precioGrafica / 3) * 2;
		alert ('¡El precio de las tarjetas gráficas ha subido!');
	}

	else if (Variables.tarjetasGraficas > 19 && Variables.tarjetasGraficas < 21) {
		Variables.precioGrafica = Variables.precioGrafica + (Variables.precioGrafica / 2) * 3;
		alert ('¡El precio de las tarjetas gráficas ha vuelto a subir!');
	}

	Variables.cartera = Variables.cartera - Variables.precioGrafica;
	Variables.tarjetasGraficas++
	Variables.bitcoinMinar = Variables.bitcoinMinar * 1.75;
	document.getElementById('tarjetasGraficas').innerHTML = Variables.tarjetasGraficas;
	actualizar();
}

function venderBitcoins(cantidad){
if (Variables.bitcoin.toFixed(6) < 0.000001) {
	alert ('¡Error!. No tienes suficientes Bitcoins.');
}

else {
	var cantidad = prompt('Cantidad a vender: ', Variables.bitcoin - 0.000001);

	if (cantidad > Variables.bitcoin) {
		alert ('¡Error!. No tienes suficientes Bitcoins.');
	}
	else {
		Variables.bitcoin = Variables.bitcoin - cantidad;
		Variables.cartera = Variables.cartera + (cantidad * 9264.55);
		localStorage.setItem("Variables", JSON.stringify(Variables));
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

	if (Variables.tiempoEspera < 60) {
		cuentaAtras();
	}

	else if (Variables.tiempoEspera <= 60 && Variables.cartera > precioCafe) {
		Variables.cartera = Variables.cartera - precioCafe;
		maxActual = Variables.bitcoinMax;
		minActual = Variables.bitcoinMin;
		cuentaAtras();
	}
	else {
		alert ('No tienes dinero suficiente.');
	}
}

function cuentaAtras() {
	document.getElementById('comprarCafe').setAttribute('disabled', true);
	Variables.tiempoEspera--;
	guardar();
	setTimeout(function () {
			if ( Variables.tiempoEspera < 61 && Variables.tiempoEspera >= 55){

				if ( Variables.tiempoEspera <= 55 ){
					Variables.bitcoinMax = maxActual;
					Variables.bitcoinMin = minActual;
				}
				else {
					Variables.bitcoinMax = 0.00010;
					Variables.bitcoinMin = 0.00005;
				}
				//bitcoinMinar = bitcoinMinar + (bitcoinMinar / 50);
				document.getElementById('comprarCafe').innerHTML = "Comprar café (" + Variables.tiempoEspera + ")";
				cuentaAtras();

			}
			else if (Variables.tiempoEspera < 55 && Variables.tiempoEspera > 0 ){
				document.getElementById('comprarCafe').innerHTML = "Comprar café (" + Variables.tiempoEspera + ")";
				cuentaAtras();
			}

			else {
				Variables.bitcoinMax = maxActual;
				Variables.bitcoinMin = minActual;
				document.getElementById('comprarCafe').removeAttribute('disabled');
				document.getElementById('comprarCafe').innerHTML = "Comprar café";
				Variables.tiempoEspera = 60;
				guardar();
			}
		}, 1000);
}

//variables para la funcion comprarSoftware
var x = 1; // controlar el progreso de la progressbar
var comprar = 0; // controlar la confirmacion por parte del usuario

function comprarSoftware() {
	if (comprar == 0 && Variables.cartera >= 90){
		document.getElementById('comprarSoftware').setAttribute('disabled',true);
		comprar = confirm('¿Quieres comprar el sofware?');
			if (Variables.instalado == 1){
				alert ('Ya tienes instalado este software');
				document.getElementById('comprarSoftware').setAttribute('title','Ya está instalado');
				document.getElementById('comprarSoftware').setAttribute('class','btn btn-success');
				document.getElementById('comprarSoftware').innerHTML = "¡Software.exe instalado!";
			}
			else if (comprar == true){
				Variables.cartera = Variables.cartera - 90;
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
		},Math.floor(Math.random() * (2000 - 200 + 1)) + 200);
		}
		else if (x > 100) {
			if (Variables.tiempoMax == 10000 && Variables.tiempoMin == 5000){
				Variables.tiempoMax = 3050;
				Variables.tiempoMin = 1700;
				Variables.tiempoRefresco = Math.random() * (Variables.tiempoMax - Variables.tiempoMin) + Variables.tiempoMin;
				mostrarInfo();
			}
			comprar = 0;
			x = 1;
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
