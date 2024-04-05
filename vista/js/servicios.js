var url = "../../controlador/fachada.php";

document.getElementById("registrar").addEventListener("click", function () {
  AgregarCarro();
});

document.getElementById("agendar").addEventListener("click", function () {
  Agregarcitas();
});

document
  .getElementById("consultarCitas")
  .addEventListener("click", function () {
    Buscarcitas();
  });

document.getElementById("BuscarCarros").addEventListener("click", function () {
  if (document.getElementById("listaCarros").value == "") {
    alert("Digita una cedula");
  } else {
    BuscarCarro();
  }
});

function AgregarCarro() {
  const data = new FormData();
  data.append("oper", "AgregarCarro");
  data.append("clase", "carros");
  data.append("placa", document.getElementById("placa_c").value);
  data.append("marca", document.getElementById("marca_c").value);
  data.append("modelo", document.getElementById("modelo_c").value);
  data.append("tamano", document.getElementById("tamano_c").value);
  data.append("cedula_u", document.getElementById("cedula_u").value);

  fetch(url, {
    method: "POST",
    body: data,
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => alert(response));
}

function Agregarcitas() {
  const data = new FormData();
  data.append("oper", "Agregarcitas");
  data.append("clase", "citas");
  data.append("codigo", document.getElementById("codigo_c").value);
  data.append("fecha", document.getElementById("fecha_c").value);
  data.append("servicio", document.getElementById("servicio_c").value);
  data.append("nit", "123");
  data.append("cedula", document.getElementById("cedula_usuario").value);
  data.append("placa", document.getElementById("placa_cita").value);
  data.append("estado", "en_espera");
  // console.log('documentos: ', data.get('codigo'),'2: ', data.get('fecha'),'3: ', data.get('servicio'),'4: ', data.get('nit'),
  // '5: ', data.get('cedula'),'6: ', data.get('placa'), '7: ', data.get('estado'))
  fetch(url, {
    method: "POST", // or 'PUT'
    body: data, // data can be `string` or {object}!
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => alert(response));
}

function BuscarCarro() {
  const data = new FormData();
  data.append("oper", "consultaCarro");
  data.append("clase", "carros");
  data.append("codigo", document.getElementById("listaCarros").value);
  fetch(url, {
    method: "POST", // or 'PUT'
    body: data,
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => {
      var html =
        "<tr><th> PLACA </th> <th> MARCA </th> <th> MODELO </th> <th> TAMAÑO </th><th> EDITAR</th> </tr>";
      response.forEach((element) => {
        html +=
          "<tr><th>" +
          element.placa_carro +
          " </th>" +
          "<th>" +
          element.marca_carro +
          " </th>" +
          "<th>" +
          element.modelo_carro +
          " </th>" +
          "<th>" +
          element.tamano_carro +
          " </th><th><button onClick='mostrarCarro(" +
          element.placa_carro +
          ")'>✍️</button></th></tr>";
      });
      document.getElementById("listaUsuario").innerHTML = html;
    });
}

function mostrarCarro(params) {
  let datos = new FormData();
  datos.append("oper", "BuscarCarro");
  datos.append("clase", "carros");
  datos.append("codigo", params);

  fetch(url, {
    method: "POST",
    body: datos,
  })
    .then((respon) => respon.json())
    .catch((error) => console.error("Error:(!!!", error))
    .then((response) => {
      var inputs = "";

      response.forEach((e) => {
        inputs +=
          "<input id='marca' value=" +
          e.marca_carro +
          "><input id='modelo' value=" +
          e.modelo_carro +
          "><select id='tamano'><option disabled selected >" +
          e.tamano_carro +
          "</option><option value='Grande'>Grande</option><option value='Mediano'>Mediano</option><option value='Pequeno'>Pequeño</option></select><button onClick='editarCarro(" +
          e.placa_carro +
          ")'>EDITAR</button>";
      });
      document.getElementById("editarInfoCarro").innerHTML = inputs;
    });
}

function editarCarro(params) {
  let dato = new FormData();
  dato.append("oper", "editarCarro");
  dato.append("clase", "carros");
  dato.append("codigo", params);
  dato.append("marca", document.getElementById("marca").value);
  dato.append("modelo", document.getElementById("modelo").value);
  dato.append("tamano", document.getElementById("tamano").value);

  fetch(url, {
    method: "POST",
    body: dato,
  })
    .then((res) => res.json())
    .catch((error) => console.error(error))
    .then(alert("INFORMACIÓN DEL CARRO EDITADA CON ÉXITO"));
}

function Buscarcitas() {
  let data = new FormData();
  data.append("oper", "Consultarcita");
  data.append("clase", "citas");
  data.append("codigo", document.getElementById("citaUsuario").value);

  fetch(url, {
    method: "POST",
    body: data,
  })
    .then((r) => r.json())
    .catch((e) => console.error(e))
    .then((res) => {
      var table =
        "<tr><th>FECHA</th><th>SERVICIO</th><th>PLACA CARRO</th><th>ESTADO</th><th>CANCELAR</th></tr>";
      res.forEach((x) => {
        table +=
          "<tr><th>" +
          x.fecha_cita +
          "</th><th>" +
          x.servicio_cita +
          "</th><th>" +
          x.placa_carro +
          "</th><th>"+x.estado
          +"</th><th><button onClick='cancelarCita("+
          x.codigo_cita+")'>❌</button></th></tr>";

      });
      document.getElementById('listasCitas').innerHTML=table;
    });
}

function cancelarCita(codigo){
  let datos = new FormData();
  datos.append('oper', 'cancelarCitas');
  datos.append('clase', 'citas');
  datos.append('codigo', codigo);

  fetch(url,{
    method:'POST',
    body:datos,
  })
  .then(res=>res.json())
  .catch(e=>console.error(e))
  .then(alert('Cita cancelada'))
}

function agregarservicio() {
  const data = new FormData();
  data.append("oper", "Agregarservicio");
  data.append("clase", "servicios");
  data.append("codigo_s", document.getElementById("codigo_s").value);
  data.append("completo_s", document.getElementById("completo_s").value);
  data.append("medio_s", document.getElementById("medio_s").value);
  data.append("llantas_s", document.getElementById("llantas_s").value);
  data.append("interno_s", document.getElementById("interno_s").value);
  data.append("brillo_s", document.getElementById("brillo_s").value);
  data.append("nit", document.getElementById("nit").value);
  fetch(url, {
    method: "POST", // or 'PUT'
    body: data, // data can be `string` or {object}!
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => alert(response));
}

function Consultarservicios() {
  const data = new FormData();
  data.append("oper", "consultarservi");
  data.append("clase", "servicios");
  fetch(url, {
    method: "POST", // or 'PUT'
    body: data,
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => {
      var html =
        "<tr><th> CODIGO </th> <th> COMPLETO </th> <th> MEDIO </th> <th> LLANTAS </th> <th> INTERNO </th> <th> BRILLO </th><th> NIT </th></tr>";
      response.forEach((element) => {
        html +=
          "<tr><th>" +
          element.codigo_servicio +
          " </th>" +
          "<th>" +
          element.completo +
          " </th>" +
          "<th>" +
          element.medio +
          " </th>" +
          "<th>" +
          element.solo_llantas +
          " </th>" +
          "<th>" +
          element.interno +
          " </th>" +
          "<th>" +
          element.brillo +
          " </th><th>" +
          element.nit_empresa +
          " </th></tr>";
      });
      document.getElementById("conservicio").innerHTML = html;
    });
}
