
  function altaCliente () {

    obtenerClientes();
    var tit = ["Nombre", "Mail", "Telefono 1", "Telefono 2", "Dirección"];
    crearTabla(tit, tabla);

    document.getElementById('nombre').addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        document.getElementById('mail').focus();
      }
    });

    document.getElementById('mail').addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        document.getElementById('telefono1').focus();
      }
    });
  
    document.getElementById('telefono1').addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        document.getElementById('telefono2').focus();
      }
    });
  
    document.getElementById('telefono2').addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        document.getElementById('direccion').focus();
      }
    });
  
    document.getElementById('direccion').addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        document.getElementById('nombre').focus();
        guardarCliente();
      }
    });
};

function obtenerClientes() {
  // Create a request variable and assign a new XMLHttpRequest object to it.
  var request = new XMLHttpRequest();
  var apiUrl = "http://127.0.0.1:3000/clientes";
  request.open("get", apiUrl, true);
  request.setRequestHeader("Content-Type", "application/json"); 
  request.send();
  request.onload = function () {
    
    var json = JSON.parse(request.response);
    var tabla = [];
    
    for (i=json.length-1;i>-1;i--){

      var linea = [];

      linea.push(json[i].nombre);
      linea.push(json[i].mail);
      linea.push(json[i].telefono1);
      linea.push(json[i].telefono2);
      linea.push(json[i].direccion);

      tabla.push(linea);

    };
  };
};

  function guardarCliente() {
    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest();
    var apiUrl = "http://127.0.0.1:3000/clientes";
    var nombre = document.getElementById('nombre');
    var mail = document.getElementById('mail');
    var telefono1 = document.getElementById('telefono1');
    var telefono2 = document.getElementById('telefono2');
    var direccion = document.getElementById('direccion');

    var miCliente = new Object(); 
    miCliente.nombre = nombre.value;
    miCliente.mail = mail.value;
    miCliente.telefono1 = telefono1.value;
    miCliente.telefono2 = telefono2.value;
    miCliente.direccion = direccion.value;
    var miString = JSON.stringify(miCliente);

    request.open("post", apiUrl, true);
    request.setRequestHeader("Content-Type", "application/json"); 
    request.send(miString);
    request.onload = function () {
      eliminarTabla();
      obtenerClientes();
      var tit = ["Nombre", "Mail", "Telefono 1", "Telefono 2", "Dirección"];
      crearTabla(tit, tabla);  
        };
    };

