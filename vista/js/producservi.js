var url = "../../controlador/fachada.php";

// document.getElementById("registrar").addEventListener('click', function() {
//     AgregarProducservi();
// });

// document.getElementById("consultar").addEventListener('click', function() {
//     Consultarps();
// });

// window.addEventListener('click', function(){
//     ConsultarProductos()
// })

// document.getElementById("consultarProductos").addEventListener('click', function(){
//     ConsultarProductos();
// });

function AgregarProducservi() {
  const data = new FormData();
  data.append("oper", "Agregarps");
  data.append("clase", "producservi");
  data.append("codigo", document.getElementById("codigo_ps").value);
  data.append("nombre", document.getElementById("nombre_ps").value);
  data.append("descripcion", document.getElementById("descripcion_ps").value);
  data.append("responsable", document.getElementById("responsable_ps").value);
  data.append("codigo_s", document.getElementById("cod_servicio").value);
  data.append("codigo_p", document.getElementById("cod_producto").value);

  fetch(url, {
    method: "POST", // or 'PUT'
    body: data, // data can be `string` or {object}!
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => alert(response));
}

function Consultarps() {
  const data = new FormData();
  data.append("oper", "consultarps");
  data.append("clase", "producservi");
  fetch(url, {
    method: "POST", // or 'PUT'
    body: data,
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => {
      console.log(response);
      var html =
        "<tr><th> CODIGO </th> <th> NOMBRE </th> <th> DESCRIPCION </th> <th> RESPONSABLE </th> <th> SERVICIO </th> <th> PRODUCTO </th></tr>";
      response.forEach((element) => {
        html +=
          "<tr><th>" +
          element.codigo_pservicio +
          " </th>" +
          "<th>" +
          element.nombre_pservicio +
          " </th>" +
          "<th>" +
          element.descripcion_pservicio +
          " </th>" +
          "<th>" +
          element.responsable_pservicio +
          " </th>" +
          "<th>" +
          element.codigo_servicio +
          " </th>" +
          "<th>" +
          element.codigo_producto +
          " </th></tr>";
      });
      document.getElementById("conps").innerHTML = html;
    });
}

function ConsultarProductos() {
  console.log("CARGANDO...--");
  const data = new FormData();
  data.append("oper", "consultarproduc");
  data.append("clase", "productos");
  fetch(url, {
    method: "POST", // or 'PUT'
    body: data,
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => {
      //console.log(response);
      var html = "";
      response.forEach((element) => {
        html +=
          "<div class='card'><img src=" +
          element.imagen +
          "><ul><li>" +
          element.nombre_producto +
          "</li><li>" +
          element.tamano_producto +
          "</li><li>" +
          element.valor_producto +
          "</li></ul><button onclick='comprar(" +
          element.codigo_producto+")'>Carrito</button></div>";
      });
      document.getElementById("lista").innerHTML = html;
    });
}
var selec = [];
function comprar(c) {
  alert("producto seleccionado" + c);
  selec.push(c);
  //console.log("array: ", selec);
}

function mostrar(params) {
    var cantidad = 0;
  for (let index = 0; index < selec.length; index++) {
    const element = selec[index];   
    cantidad++; 
  }
  alert('HAS ELEGIDO '+cantidad+' ELEMENTOS PARA COMPRAR');
}
