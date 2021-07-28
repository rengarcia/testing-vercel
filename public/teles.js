// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyDw8CHPqDy4N2R0irJILnZeVuw1zarzACA",
  authDomain: "rasp-iot-6980a.firebaseapp.com",
  databaseURL: "https://rasp-iot-6980a-default-rtdb.firebaseio.com",
  projectId: "rasp-iot-6980a",
  storageBucket: "rasp-iot-6980a.appspot.com",
  messagingSenderId: "79289728219",
  appId: "1:79289728219:web:d46ed8d5ea1f183d03a0fe",
  measurementId: "G-R7DDKNWHGG"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
coleccionProductos = db.ref().child('telescopio');
coleccionDatos = db.ref().child('telescopio');
bodyProductos = $('#bodyProductos').val();

$('form').submit(function(e){
  e.preventDefault();
  let id = $('#id').val();
  let eje_x = $('#eje_x').val();
  let eje_z = $('#eje_z').val();
  let idFirebase = id;
  if (idFirebase == ''){
    idFirebase = coleccionProductos.push().key;
  };
  data = {eje_x:eje_x, eje_z:eje_z};
  actualiacionData = {};
  actualiacionData[`/${idFirebase}`] = data;
  coleccionProductos.update(actualiacionData);
  id = '';
  $('form').trigger('reset');
  $('#modalAltaEdicion').modal('hide');
});
const iconoEditar = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>'
//MUESTRA LOS VALORES EN LA TABLA
function mostrarProductos({eje_x, eje_z}){
  return `
  <td>${eje_x}</td>
  <td>${eje_z}</td>
  <td><button class="btnEditar btn btn-secondary" data-toggle="tooltip" title="Editar">${iconoEditar}</button></td>
  `
};

//CHILD_ADDED
coleccionProductos.on('child_added', data =>{
  let tr = document.createElement('tr')
  tr.id = data.key
  tr.innerHTML = mostrarProductos(data.val())
  document.getElementById('bodyProductos').appendChild(tr)
});
//CHIL_CHANGED
coleccionProductos.on('child_changed', data =>{
  let nodoEditado = document.getElementById(data.key)
  nodoEditado.innerHTML  = mostrarProductos(data.val())
});

$('#tablaProductos').on('click', '.btnEditar', function(){
  let id = $(this).closest('tr').attr('id');
  let eje_x = $(this).closest('tr').find('td:eq(0)').text();
  let eje_z = $(this).closest('tr').find('td:eq(1)').text();
  $('#id').val(id);
  $('#eje_x').val(eje_x);
  $('#eje_z').val(eje_z);
  $('#modalAltaEdicion').modal('show');

});
(function(){
	var actualizarHora = function(){
		// Obtenemos la fecha actual, incluyendo las horas, minutos, segundos, dia de la semana, dia del mes, mes y año;
		var fecha = new Date(),
			horas = fecha.getHours(),
			ampm,
			minutos = fecha.getMinutes(),
			segundos = fecha.getSeconds(),
			diaSemana = fecha.getDay(),
			dia = fecha.getDate(),
			mes = fecha.getMonth(),
			year = fecha.getFullYear();

		// Accedemos a los elementos del DOM para agregar mas adelante sus correspondientes valores
		var pHoras = document.getElementById('horas'),
			pAMPM = document.getElementById('ampm'),
			pMinutos = document.getElementById('minutos'),
			pSegundos = document.getElementById('segundos'),
			pDiaSemana = document.getElementById('diaSemana'),
			pDia = document.getElementById('dia'),
			pMes = document.getElementById('mes'),
			pYear = document.getElementById('year');

		
		// Obtenemos el dia se la semana y lo mostramos
		var semana = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
		pDiaSemana.textContent = semana[diaSemana];

		// Obtenemos el dia del mes
		pDia.textContent = dia;

		// Obtenemos el Mes y año y lo mostramos
		var meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
		pMes.textContent = meses[mes];
		pYear.textContent = year;

		// Cambiamos las hora de 24 a 12 horas y establecemos si es AM o PM

		if (horas >= 12) {
			horas = horas - 12;
			ampm = 'PM';
		} else {
			ampm = 'AM';
		}

		// Detectamos cuando sean las 0 AM y transformamos a 12 AM
		if (horas == 0 ){
			horas = 12;
		}

		// Si queremos mostrar un cero antes de las horas ejecutamos este condicional
		// if (horas < 10){horas = '0' + horas;}
		pHoras.textContent = horas;
		pAMPM.textContent = ampm;

		// Minutos y Segundos
		if (minutos < 10){ minutos = "0" + minutos; }
		if (segundos < 10){ segundos = "0" + segundos; }

		pMinutos.textContent = minutos;
		pSegundos.textContent = segundos;
	};

	actualizarHora();
	var intervalo = setInterval(actualizarHora, 1000);
}())
//ENVIAR DATOS A LOS TACOMETROS
coleccionDatos.on('child_added', data1 =>{
  let tr = document.createElement('tr')
  tr.id = data1.key
  tr = drawChart1(data1.val())
});
coleccionDatos.on('child_changed', data1 =>{
  let nodo = document.getElementById(data1.key)
  nodo  = drawChart1(data1.val())
});

google.charts.load('current', {'packages':['gauge']});
google.charts.setOnLoadCallback(drawChart1);
i=0;
j=0;

//TACÓMETROS
function drawChart1(a) {
  if (typeof a.eje_x == 'number') {
    datox=a.eje_x;
  }
  if (typeof a.eje_z == 'number') {
    datoz=a.eje_z;
  }
  var data1 = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['Eje X', i],
    ['Eje Z', j],
  ]);

  var options1 = {
    width: 300, height: 420,
    redFrom: 90, redTo: 100,
    yellowFrom:75, yellowTo: 90,
    minorTicks: 5
  };

  var chart1 = new google.visualization.Gauge(document.getElementById('chart_div'));

  chart1.draw(data1, options1);

  setInterval(function() {
    data1.setValue(0, 1, datox);
    chart1.draw(data1, options1);
  }, 400);
  setInterval(function() {
    data1.setValue(1, 1, datoz);
    chart1.draw(data1, options1);
  }, 400);
  i=datox;
  j=datoz;
}
//BOTON ABAJO
const database = firebase.database();
function on(){
  database.ref('/telescopio/manual/abajo').set({
      abajo: true
  })
}

function off(){
  database.ref('/telescopio/manual/abajo').set({
      abajo: false
  })
}

var checkbox = document.getElementById('checkbox');

checkbox.addEventListener("change", comprueba, false);

function comprueba(){
  if(checkbox.checked){
      on();
  }else{
      off();
  }
}
//BOTON ARRIBA
const database1 = firebase.database();
function on1(){
  database1.ref('/telescopio/manual/arriba').set({
      arriba: true
  })
}

function off1(){
  database1.ref('/telescopio/manual/arriba').set({
      arriba: false
  })
}

var checkbox1 = document.getElementById('checkbox1');

checkbox1.addEventListener("change", comprueba1, false);

function comprueba1(){
  if(checkbox1.checked){
      on1();
  }else{
      off1();
  }
}
//BOTON IZQUIERDA
const database2 = firebase.database();
function on2(){
  database2.ref('/telescopio/manual/izquierda').set({
    izquierda: true
  })
}

function off2(){
  database2.ref('/telescopio/manual/izquierda').set({
    izquierda: false
  })
}

var checkbox2 = document.getElementById('checkbox2');

checkbox2.addEventListener("change", comprueba2, false);

function comprueba2(){
  if(checkbox2.checked){
      on2();
  }else{
      off2();
  }
}
//BOTON DERECHA
const database3 = firebase.database();
function on3(){
  database3.ref('/telescopio/manual/derecha').set({
    derecha: true
  })
}

function off3(){
  database3.ref('/telescopio/manual/derecha').set({
    derecha: false
  })
}

var checkbox3 = document.getElementById('checkbox3');

checkbox3.addEventListener("change", comprueba3, false);

function comprueba3(){
  if(checkbox3.checked){
      on3();
  }else{
      off3();
  }
}
//BOTÓN DE PARE
const database4 = firebase.database();
function on4(){
  database4.ref('/telescopio/manual/pare').set({
    pare: true
  })
}

function off4(){
  database4.ref('/telescopio/manual/pare').set({
    pare: false
  })
}

var checkbox4 = document.getElementById('checkbox4');

checkbox4.addEventListener("change", comprueba4, false);

function comprueba4(){
  if(checkbox4.checked){
      on4();
  }else{
      off4();
  }
}