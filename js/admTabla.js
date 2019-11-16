function eliminarTabla() {
  // get the reference for the body
  var body = document.getElementsByTagName("body")[0];
  var tbl = document.getElementById('tabla_wrapper');
  body.removeChild(tbl);
};

function crearTabla(tit, tab) {

  // get the reference for the body
  //* var body = document.getElementById('area');
  var body = document.getElementsByTagName("body")[0];

  // creates a <table> element and a <tbody> element
  var tbl = document.createElement("table");

  // creating titles
  // creates a table row
  var tblHead = document.createElement("thead");
  var row = document.createElement("tr");

  for (var i = 0; i < tit.length; i++) {
    // Create a <th> element and a text node, make the text
    // node the contents of the <td>, and put the <td> at
    // the end of the table row
    var cell = document.createElement("th");
    var cellText = document.createTextNode(tit[i]);
    cell.appendChild(cellText);
    row.appendChild(cell);
  };
  tblHead.appendChild(row);

  // put the <thead> in the <table>
  tbl.appendChild(tblHead);

  var tblBody = document.createElement("tbody");  
  // creating all cells
  for (var i = 0; i < tab.length; i++) {
    // creates a table row
    var row = document.createElement("tr");

    for (var j = 0; j < tab[i].length; j++) {
      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at
      // the end of the table row
      var cell = document.createElement("td");
//    var cellText = document.createTextNode(tabla[i][j]);
      var cellText = tab[i][j];
      cell.appendChild(cellText);
      row.appendChild(cell);
    }

    // add the row to the end of the table body
    tblBody.appendChild(row);
  }

  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);

  // creating footer
  // creates a table row
  var tblFoot = document.createElement("tfoot");
  var row = document.createElement("tr");

  for (var i = 0; i < tit.length; i++) {
    // Create a <th> element and a text node, make the text
    // node the contents of the <td>, and put the <td> at
    // the end of the table row
    var cell = document.createElement("th");
    var cellText = document.createTextNode(tit[i]);
    cell.appendChild(cellText);
    row.appendChild(cell);
  };
  tblFoot.appendChild(row);

  // put the <thead> in the <table>
  tbl.appendChild(tblFoot);
  // appends <table> into <body>
  body.appendChild(tbl);

  // sets the border attribute of tbl to 2;
  tbl.setAttribute("id", "tabla");
  tbl.setAttribute("class", "display");

  $('#tabla').DataTable( {

    "language": 
      {
        "sProcessing":     "Procesando...",
        "sLengthMenu":     "Mostrar _MENU_ registros",
        "sZeroRecords":    "No se encontraron resultados",
        "sEmptyTable":     "Ningún dato disponible en esta tabla",
        "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
        "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
        "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
        "sInfoPostFix":    "",
        "sSearch":         "Buscar:",
        "sUrl":            "",
        "sInfoThousands":  ",",
        "sLoadingRecords": "Cargando...",
        "oPaginate": {
          "sFirst":    "Primero",
          "sLast":     "Último",
          "sNext":     "Siguiente",
          "sPrevious": "Anterior"
                      },
        "oAria": {
          "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
          "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                  }      },

    "columnDefs": [
      {className: "dt-body-center","targets": [0,2,3,4,5,6,7,8,9]},

    ],

    "footerCallback": function ( row, data, start, end, display ) {
    var api = this.api(), data;  

    // Remove the formatting to get integer data for summation
    var intVal = function ( i ) {
      return typeof i === 'string' ?
        i.replace(/[\$,]/g, '')*1 :
        typeof i === 'number' ?
          i : 0;
    };
  
    // Total over all pages
    cantidadTab = api
      .column( 3 )
      .data()
      .reduce( function (a, b) {
        return intVal(a) + intVal(b);
      }, 0 );

      precioUnitTab = api
      .column( 4 )
      .data()
      .reduce( function (a, b) {
        return intVal(a) + intVal(b);
      }, 0 );

      precioTab = api
      .column( 5 )
      .data()
      .reduce( function (a, b) {
        return intVal(a) + intVal(b);
      }, 0 );

      gananciaTab = api
      .column( 7 )
      .data()
      .reduce( function (a, b) {
        return intVal(a) + intVal(b);
      }, 0 );

      puntosTab = api
      .column( 8 )
      .data()
      .reduce( function (a, b) {
        return intVal(a) + intVal(b);
      }, 0 );

    // Total over this page  
    cantidadTab = api
    .column( 3, { page: 'current'} )
    .data()
    .reduce( function (a, b) {
      return intVal(a) + intVal(b);
    }, 0 );

    precioUnitTab = api
      .column( 4, { page: 'current'} )
      .data()
      .reduce( function (a, b) {
        return intVal(a) + intVal(b);
      }, 0 );

    totalACobrar = api
      .column( 6, { page: 'current'} )
      .data()
      .reduce( function (a, b) {
        return intVal(a) + intVal(b);
      }, 0 );

    totalAPagar = api
      .column( 7, { page: 'current'} )
      .data()
      .reduce( function (a, b) {
        return intVal(a) + intVal(b);
      }, 0 );

    gananciaTab = api
      .column( 8, { page: 'current'} )
      .data()
      .reduce( function (a, b) {
        return intVal(a) + intVal(b);
      }, 0 );

      puntosTab = api
      .column( 9, { page: 'current'} )
      .data()
      .reduce( function (a, b) {
        return intVal(a) + intVal(b);
      }, 0 );

    // Update footer
    // Ciclo
    $( api.column( 0 ).footer() ).html(
      ' ' 
    );
    // Cliente
    $( api.column( 1 ).footer() ).html(
      ' ' 
    );
    // Producto
    $( api.column( 2 ).footer() ).html(
      ' ' 
    );
    // Cantidad
    $( api.column( 3 ).footer() ).html(
      cantidadTab 
    );
    // Precio unitario
    $( api.column( 4 ).footer() ).html(
      '$'+precioUnitTab.toFixed(2) 
    );
    // Porcentaje
    $( api.column( 5 ).footer() ).html(
      ' ' 
    );
    // Total a cobrar
    $( api.column( 6 ).footer() ).html(
      '$'+totalACobrar.toFixed(2) 
    );
    // Total a pagar
    $( api.column( 7 ).footer() ).html(
      '$'+totalAPagar.toFixed(2) 
    );
    // Ganancia
    $( api.column( 8 ).footer() ).html(
      '$'+gananciaTab.toFixed(2) 
    );
    // Puntos
    $( api.column( 9 ).footer() ).html(
      puntosTab
    );
    // Notas
    $( api.column( 10 ).footer() ).html(
      ' '
    );

  }

  } );
}


