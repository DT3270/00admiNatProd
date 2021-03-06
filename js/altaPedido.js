
  function altaPedido () {

    document.getElementById('selCiclo').addEventListener('change', function (e) {
      eliminarTabla();
      obtenerPedidos();  
    });

    obtenerPedidos();

    document.getElementById('Ciclo').addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        document.getElementById('Cliente').focus();
      }
    });

    document.getElementById('Cliente').addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        document.getElementById('Producto').focus();
      }
    });
  
    document.getElementById('Producto').addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        document.getElementById('Precio').focus();
      }
    });

    document.getElementById('Precio').addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        document.getElementById('% de ganancia').focus();
      }
    });

    document.getElementById('% de ganancia').addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        document.getElementById('Cantidad').focus();
      }
    });
/*
    document.getElementById('check1').addEventListener('click', function (e) {
      let check1 = document.getElementById('check1');
      console.log('check1', check1.style)
      if (check1.value == 's') {
        check1.value = 'n'
      } else {
        check1.value = 's'        
      } 
    }); 

    document.getElementById('check1').addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        document.getElementById('Cantidad').focus();
      }
    }); 
*/
    document.getElementById('Cantidad').addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        document.getElementById('Puntos').focus();
      }
    });
  
    document.getElementById('Puntos').addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        document.getElementById('Notas').focus();
      }
    }); 

    document.getElementById('Notas').addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        document.getElementById('Ciclo').focus();
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

          // Porcentaje de ganancia
          linea.push(document.createTextNode(json[i].porGanancia));

          if (json[i].paraMi == 's') {
            var ganancia = 0;  
            var totalACobrar = json[i].precio * json[i].cantidad - json[i].precio * json[i].porGanancia / 100; 
          } else {
            var ganancia = (json[i].precio * json[i].cantidad) * json[i].porGanancia / 100 ;            
            var totalACobrar = json[i].precio * json[i].cantidad; 
          }

          // Total a cobrar
          linea.push(document.createTextNode('$' + totalACobrar.toFixed(2)));

          // Total a pagar
          var totalAPagar = totalACobrar - ganancia; 
          linea.push(document.createTextNode('$' + totalAPagar.toFixed(2)));

          // Ganancia
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
      var tit = ["Ciclo", "Cliente", "Producto", "Cantidad", "Precio Unitario", "%", "Total a Cobrar", "Total a Pagar", "Ganancia", "Puntos", "Notas", ""];
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

    var ciclo = document.getElementById('Ciclo');
    var cliente = document.getElementById('Cliente');
    var producto = document.getElementById('Producto');
    var cantidad = document.getElementById('Cantidad');
    var precio = document.getElementById('Precio');
    var porGanancia = document.getElementById('% de ganancia');
    var puntos = document.getElementById('Puntos');
    var notas = document.getElementById('Notas');
    var paraMi = document.getElementById('check1');
    
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
    paraMi.value = "n";
    paraMi.src = 'img/circle-regular2.png';
    cantidad.value = "";
    puntos.value = "";
    notas.value = "";

    let inputs = this.document.getElementsByClassName('myInput');
    for (let i = 0; i < inputs.length; i++) {
      if(inputs[i].value.length>=1) {
        inputs[i].nextElementSibling.classList.add('fijar');
      } else {
        inputs[i].nextElementSibling.classList.remove('fijar');
      };
    };

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