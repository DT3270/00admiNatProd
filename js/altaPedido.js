
  function altaPedido () {

    obtenerPedidos();

    document.getElementById('ciclo').addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        document.getElementById('cliente').focus();
      }
    });

    document.getElementById('cliente').addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        document.getElementById('producto').focus();
      }
    });
  
    document.getElementById('producto').addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        document.getElementById('precio').focus();
      }
    });

    document.getElementById('precio').addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        document.getElementById('porGanancia').focus();
      }
    });

    document.getElementById('porGanancia').addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        document.getElementById('cantidad').focus();
      }
    }); 
  
    document.getElementById('cantidad').addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        document.getElementById('puntos').focus();
      }
    });
  
    document.getElementById('puntos').addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        document.getElementById('notas').focus();
      }
    }); 

    document.getElementById('notas').addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        document.getElementById('ciclo').focus();
        guardarPedido();
      }
    });
  };

  function obtenerPedidos() {
    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest();
    var apiUrl = urlServer + "/pedidos";
    request.open("get", apiUrl, true);
    request.setRequestHeader("Content-Type", "application/json"); 
    request.send();
    request.onload = function () {
        
      var json = JSON.parse(request.response);
      var tabla = [];
      var totPag = 0;
      var totCob = 0;
      var cuanPun = 0;
      var cuanGan = 0; 

      for (i=json.length-1;i>-1;i--){

        var linea = [];

        linea.push(document.createTextNode('C' + json[i].ciclo));
        linea.push(document.createTextNode(json[i].cliente));
        linea.push(document.createTextNode(json[i].producto));
        linea.push(document.createTextNode(json[i].cantidad));
        linea.push(document.createTextNode('$' + json[i].precio.toFixed(2)));
        linea.push(document.createTextNode('$' + (json[i].precio * json[i].cantidad).toFixed(2)));
        linea.push(document.createTextNode(json[i].porGanancia));
        var ganancia = (json[i].precio * json[i].porGanancia / 100) * json[i].cantidad;
        linea.push(document.createTextNode('$' + ganancia.toFixed(2)));
        var puntos = json[i].puntos * json[i].cantidad;
        linea.push(document.createTextNode(puntos));
        linea.push(document.createTextNode(json[i].notas));

        totCob = totCob + json[i].precio * json[i].cantidad;
        cuanGan = cuanGan + ganancia;
        cuanPun = cuanPun + puntos;

        var button = document.createElement('button');
        button.type = 'button';
        button.style = 'border: none; background-color: transparent';
        button.innerText = 'eliminar';
        button.id = json[i]._id;
        button.addEventListener('click', function(e){
          eliminarPedido(e.path[0].id);
        });
        linea.push(button);
        tabla.push(linea);

      };
      tabGlob = tabla;
      var tit = ["Ciclo", "Cliente", "Producto", "Cantidad", "Precio Unitario", "Precio", "%", "Ganancia", "Puntos", "Notas", ""];
      crearTabla(tit, tabGlob);
      document.getElementById('cantPed').value = json.length;
      document.getElementById('totPag').value = '$' + (totCob - cuanGan);
      document.getElementById('cuanGan').value = '$' + cuanGan;
      document.getElementById('totCob').value = '$' + totCob;
      document.getElementById('cuanPun').value = cuanPun;
    };
  };

  function guardarPedido() {
    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest();
    var apiUrl = urlServer + "/pedidos";
    var ciclo = document.getElementById('ciclo');
    var cliente = document.getElementById('cliente');
    var producto = document.getElementById('producto');
    var cantidad = document.getElementById('cantidad');
    var precio = document.getElementById('precio');
    var porGanancia = document.getElementById('porGanancia');
    var puntos = document.getElementById('puntos');
    var notas = document.getElementById('notas');

    var miPedido = new Object(); 
    miPedido.ciclo = ciclo.value;
    miPedido.cliente = cliente.value;
    miPedido.producto = producto.value;
    miPedido.cantidad = cantidad.value;
    miPedido.precio = precio.value;    
    miPedido.porGanancia = porGanancia.value;
    miPedido.puntos = puntos.value;
    miPedido.notas = notas.value;

    ciclo.value = "";
    cliente.value = "";
    producto.value = "";
    precio.value = "";
    porGanancia.value = "";
    cantidad.value = "";
    puntos.value = "";
    notas.value = "";

    var miString = JSON.stringify(miPedido);
    request.open("post", apiUrl, true);
    request.setRequestHeader("Content-Type", "application/json"); 
    request.send(miString);
    request.onload = function () {
      eliminarTabla()
      obtenerPedidos()
        };
      };  
    
    function eliminarPedido(id) {
      var request = new XMLHttpRequest();
      var apiUrl = urlServer + "/pedidos/" + id;
      request.open("delete", apiUrl, true);
      request.send();
      request.onload = function () {
        eliminarTabla();
        obtenerPedidos();
        }
    };

    function buscarCliente(cliente) {
        console.log('ok')
    };