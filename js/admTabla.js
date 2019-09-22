function eliminarTabla() {
  // get the reference for the body
  var body = document.getElementsByTagName("body")[0];
  console.log('body1', body)
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
    cantidad = api
      .column( 3 )
      .data()
      .reduce( function (a, b) {
        return intVal(a) + intVal(b);
      }, 0 );

      precioUnit = api
      .column( 4 )
      .data()
      .reduce( function (a, b) {
        return intVal(a) + intVal(b);
      }, 0 );

      precio = api
      .column( 5 )
      .data()
      .reduce( function (a, b) {
        return intVal(a) + intVal(b);
      }, 0 );

      ganancia = api
      .column( 7 )
      .data()
      .reduce( function (a, b) {
        return intVal(a) + intVal(b);
      }, 0 );

      puntos = api
      .column( 8 )
      .data()
      .reduce( function (a, b) {
        return intVal(a) + intVal(b);
      }, 0 );

    // Total over this page  
    cantidad = api
    .column( 3, { page: 'current'} )
    .data()
    .reduce( function (a, b) {
      return intVal(a) + intVal(b);
    }, 0 );

    precioUnit = api
      .column( 4, { page: 'current'} )
      .data()
      .reduce( function (a, b) {
        return intVal(a) + intVal(b);
      }, 0 );

    precio = api
      .column( 5, { page: 'current'} )
      .data()
      .reduce( function (a, b) {
        return intVal(a) + intVal(b);
      }, 0 );

    ganancia = api
      .column( 7, { page: 'current'} )
      .data()
      .reduce( function (a, b) {
        return intVal(a) + intVal(b);
      }, 0 );

    puntos = api
      .column( 8, { page: 'current'} )
      .data()
      .reduce( function (a, b) {
        return intVal(a) + intVal(b);
      }, 0 );

    // Update footer
    $( api.column( 0 ).footer() ).html(
      ' ' 
    );

    $( api.column( 1 ).footer() ).html(
      ' ' 
    );

    $( api.column( 2 ).footer() ).html(
      ' ' 
    );

    $( api.column( 3 ).footer() ).html(
      cantidad 
    );

    $( api.column( 4 ).footer() ).html(
      '$'+precioUnit.toFixed(2) 
    );

    $( api.column( 5 ).footer() ).html(
      '$'+precio.toFixed(2) 
    );

    $( api.column( 6 ).footer() ).html(
      ' ' 
    );

    $( api.column( 7 ).footer() ).html(
      '$'+ganancia.toFixed(2) 
    );
    
    $( api.column( 8 ).footer() ).html(
      puntos
    );

    $( api.column( 9 ).footer() ).html(
      ' '
    );

  }
  } );
}


