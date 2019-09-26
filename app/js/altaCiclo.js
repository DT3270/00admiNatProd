
  function altaCiclo () {

    obtenerCiclos();

    document.getElementById('ciclo').addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        document.getElementById('fechaInicio').focus();
      }
    });

    document.getElementById('fechaInicio').addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        document.getElementById('fechaFin').focus();
      }
    });
  
    document.getElementById('fechaFin').addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        document.getElementById('estado').focus();
      }
    });
  
    document.getElementById('estado').addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        document.getElementById('observacion').focus();
      }
    });
  
    document.getElementById('observacion').addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        document.getElementById('ciclo').focus();
        guardarCiclo();
      }
    });
};


function obtenerCiclos() {
  // Create a request variable and assign a new XMLHttpRequest object to it.
  var request = new XMLHttpRequest();
  var apiUrl = "http://127.0.0.1:3000/ciclos";
  request.open("get", apiUrl, true);
  request.setRequestHeader("Content-Type", "application/json"); 
  request.send();
  request.onload = function () {
    
    var json = JSON.parse(request.response);
    var tabla = [];
    
    for (i=json.length-1;i>-1;i--){

      var linea = [];

      linea.push(json[i].ciclo);
      linea.push(json[i].fechaInicio);
      linea.push(json[i].fechaFin);
      linea.push(json[i].estado);
      linea.push(json[i].observacion);

      tabla.push(linea);

    };

    var tit = ["Ciclo", "Fecha de Inicio", "Fecha de Fin", "Estado", "Notas"];
    crearTabla(tit, tabla);

  };
};

  function guardarCiclo() {
    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest();
    var apiUrl = "http://127.0.0.1:3000/ciclos";
    var ciclo = document.getElementById('ciclo');
    var fechaInicio = document.getElementById('fechaInicio');
    var fechaFin = document.getElementById('fechaFin');
    var estado = document.getElementById('estado');
    var observacion = document.getElementById('observacion');

    var miCiclo = new Object(); 
    miCiclo.ciclo = ciclo.value;
    miCiclo.fechaInicio = fechaInicio.value;
    miCiclo.fechaFin = fechaFin.value;
    miCiclo.estado = estado.value;
    miCiclo.observacion = observacion.value;
    var miString = JSON.stringify(miCiclo);
    request.open("post", apiUrl, true);
    request.setRequestHeader("Content-Type", "application/json"); 
    request.send(miString);
    console.log("miString", miString);
    console.log("request", request);
    request.onload = function () {
      eliminarTabla();
      obtenerCiclos();
        }  
    };

