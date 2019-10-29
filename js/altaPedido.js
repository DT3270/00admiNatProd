
  function altaPedido () {

    document.getElementById('selCiclo').addEventListener('change', function (e) {
      eliminarTabla();
      obtenerPedidos();  
    });

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
        document.getElementById('check1').focus();
      }
    }); 

    document.getElementById('check1').addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        document.getElementById('cantidad').focus();
      }
    }); 

    document.getElementById('check1').addEventListener('click', function (e) {
      let check1 = document.getElementById('check1');
      if (check1.value == 's') {
        check1.value = 'n'
      } else {
        check1.value = 's'        
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
    // Bloqueo la pantalla
    bloquear();
    // Consulta la base y deja la respuesta en la variabla json.
    var request = new XMLHttpRequest();
    var apiUrl = urlServer + "/pedidos";
    request.open("get", apiUrl, true);
    request.setRequestHeader("Content-Type", "application/json"); 
    request.send();
    request.onload = function () {
      desbloquear();  
      var json = JSON.parse(request.response);

      // Guardo la opción seleccionada
      var selCiclo = document.getElementById("selCiclo");
      var seleccion = selCiclo.value;
      // Recorro el json cargando el combo de ciclos.
      var ciclos = [];
      for (i=json.length-1;i>-1;i--){
          ciclos.push(json[i].ciclo)
      }; //end-for
      ciclos.sort()
      var listaCiclos = ciclos.filter(function(valor, indiceActual, arreglo) {
          var indiceAlBuscar = arreglo.indexOf(valor);
          if (indiceActual === indiceAlBuscar) {
              return true;
          } else {
              return false;
          }
      });
      // Cargo los ciclos
      selCiclo.length = 0;
      selCiclo.options[0] = new Option('Ciclo: Todos', 0, false, false);
      var j=1;
      for(var i=listaCiclos.length-1;i>-1;i--){ 
        selCiclo.options[j] = new Option('Ciclo: ' + listaCiclos[i], listaCiclos[i], false, false);
        j++
      }; //end-for
      selCiclo.value = seleccion
      // Recorro el json cargando la tabla.
      var tabla = [];
      var cantPed = 0;
      var totCob = 0;
      var cuanPun = 0;
      var cuanGan = 0;
      var totProd = 0;
      for (i=json.length-1;i>-1;i--){
        if (json[i].ciclo == selCiclo.value||selCiclo.value == 0) {
          
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

          totProd = totProd + json[i].cantidad;
          totCob = totCob + json[i].precio * json[i].cantidad;
          cuanGan = cuanGan + ganancia;
          cuanPun = cuanPun + puntos;
          cantPed = cantPed + 1;

          var button = document.createElement('button');
          button.type = 'button';
          button.style = 'border: none; background-color: transparent';
          button.innerText = 'eliminar';
          button.id = json[i]._id;
          button.addEventListener('click', function(e){
            eliminarPedido(e.target.id);
          });
          linea.push(button);
          tabla.push(linea);
        }; //end-if
      }; //end-for
      tabGlob = tabla;
      var tit = ["Ciclo", "Cliente", "Producto", "Cantidad", "Precio Unitario", "Precio", "%", "Ganancia", "Puntos", "Notas", ""];
      crearTabla(tit, tabGlob);
      document.getElementById('cantPed').innerHTML = '<p class="p3">Cantidad de pedidos: <b>' + cantPed + '</b></p>';
      document.getElementById('totPag').innerHTML = '<p class="p3"> Total a pagar: <b>$ ' + (totCob - cuanGan).toFixed(2) + '</b></p>';
      document.getElementById('cuanGan').innerHTML = '<p class="p3"> Total ganado: <b>$ ' + cuanGan.toFixed(2) + '</b></p>';
      document.getElementById('totCob').innerHTML = '<p class="p3"> Total a cobrar: <b>$ ' + totCob.toFixed(2) + '</b></p>';
      document.getElementById('cuanPun').innerHTML = '<p class="p3"> Puntos ganados: <b>' + cuanPun + '</b></p>';
      document.getElementById('cantProd').innerHTML = '<p class="p3"> Cantidad de productos: <b>' + totProd + '</b></p>';
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
    var paraMi = document.getElementById('check1');
    var puntos = document.getElementById('puntos');
    var notas = document.getElementById('notas');

    var miPedido = new Object(); 
    miPedido.ciclo = ciclo.value;
    miPedido.cliente = cliente.value;
    miPedido.producto = producto.value;
    miPedido.cantidad = cantidad.value;
    miPedido.precio = precio.value;    
    miPedido.porGanancia = porGanancia.value;
    miPedido.paraMi = paraMi.value;
    miPedido.puntos = puntos.value;
    miPedido.notas = notas.value;

    ciclo.value = "";
    cliente.value = "";
    producto.value = "";
    precio.value = "";
    porGanancia.value = "";
    cantidad.value = "";
    puntos.value = "";
    paraMi.value = "n";
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