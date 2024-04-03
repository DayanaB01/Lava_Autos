var url = "../../controlador/fachada.php";

document.getElementById("registrar").addEventListener("click", function () {
  AgregarUsuario();
});

// document.getElementById("consultar").addEventListener('click', function() {
//     Consultarusu();
// });

document.getElementById("iniciar").addEventListener("click", function () {
  let dato1 = document.getElementById("cedula").value;
  let dato2 = document.getElementById("contrasena").value;
  if (dato1 == "" || dato2 == "") {
    alert("INGRESA DATOS");
  } else {
    IniciarSesion();
  }
});

function AgregarUsuario() {
  const data = new FormData();
  data.append("oper", "Agregarusuario");
  data.append("clase", "usuarios");
  data.append("cedula", document.getElementById("cedula_u").value);
  data.append("nombre", document.getElementById("nombre_u").value);
  data.append("apellido", document.getElementById("apellido_u").value);
  data.append("telefono", document.getElementById("tel_u").value);
  data.append("correo", document.getElementById("correo_u").value);
  data.append("direccion", document.getElementById("direccion_u").value);
  data.append("contrasena", document.getElementById("contrasena_u").value);

  fetch(url, {
    method: "POST", // or 'PUT'
    body: data, // data can be `string` or {object}!
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => alert(response));
}

function IniciarSesion() {
  const datos = new FormData();
  datos.append("oper", "buscarUsuario");
  datos.append("clase", "usuarios");
  datos.append("codigo", document.getElementById("cedula").value);
  datos.append("contrasena", document.getElementById("contrasena").value);

  fetch(url, {
    method: "POST",
    body: datos,
  })
    .then((res) => res.json())
    .catch((e) => console.error(e))
    .then((response) => {
      if (response == null) {
        alert("UPS EL USUARIO NO EXISTE");
      } else {
        var r =
          "<tr><th> CEDULA </th> <th> NOMBRE </th> <th> APELLIDO </th> <th> TELEFONO </th> <th> CORREO </th> <th> DIRECCION </th><th>EDITAR</th><th>ELIMINAR</th></tr>";
        response.forEach((x) => {
          r +=
            "<tr><th>" +
            x.cedula_usuario +
            " </th>" +
            "<th>" +
            x.nombre_usuario +
            " </th>" +
            "<th>" +
            x.apellido_usuario +
            " </th>" +
            "<th>" +
            x.telefono_usuario +
            " </th>" +
            "<th>" +
            x.correo_usuario +
            " </th>" +
            "<th>" +
            x.direccion_usuario +
            " </th>" +
            "<th><button onClick='EditarUsuario(" +
            x.cedula_usuario +
            ")'>✍️</button></th><th>" +
            "<button onClick='eliminarUsuario(" +
            x.cedula_usuario +
            ")'>🗑️</button></th></tr>";
        });
      }
      document.getElementById("usuarioInicio").innerHTML = r;
    });
}

function EditarUsuario(codigo) {
  let datos = new FormData();
  datos.append("oper", "buscarUsuarioE");
  datos.append("clase", "usuarios");
  datos.append("codigo", codigo);

  fetch(url, {
    method: "POST",
    body: datos,
  })
    .then((resp) => resp.json())
    .catch((e) => console.error(e))
    .then((res) => {
      var inputs = "";
      res.forEach((e) => {
        inputs +=
          "<input id='nombre' value=" +
          e.nombre_usuario +
          "><input id='apellido' value=" +
          e.apellido_usuario +
          "><input id='telefono' value=" +
          e.telefono_usuario +
          "><input id='correo' value=" +
          e.correo_usuario +
          "><input id='direccion' value=" +
          e.direccion_usuario +
          "><button onClick='infoEditada("+e.cedula_usuario+
          ")'>EDITAR</button>";
      });
      document.getElementById('infoEditar').innerHTML=(inputs);
    });
}

function infoEditada(ps) {
    let datos = new FormData();
    datos.append('oper', 'editarUsuario');
    datos.append('clase', 'usuarios');
    datos.append('codigo', ps);
    datos.append('nombre', document.getElementById('nombre').value);
    datos.append('apellido', document.getElementById('apellido').value);
    datos.append('telefono', document.getElementById('telefono').value);
    datos.append('correo', document.getElementById('correo').value);
    datos.append('direccion', document.getElementById('direccion').value);

    fetch(url,{
        method:'POST',
        body:datos,
    })
    .then((res) => res.json())
    .catch((error) => console.error(error))
    .then(alert("USUARIO EDITADO CON ÉXITO"));
}

function eliminarUsuario(cod) {
  alert("¿SEGURO DESEAS ELIMINAR TU REGISTRO?" + cod);
 let dato=new FormData();
 dato.append('oper','eliminarUsuario');
 dato.append('clase', 'usuarios');
 dato.append('codigo', cod);

 fetch(url,{
    method:'POST',
    body:dato,
 })
 .then((res) => res.json())
 .catch((error) => console.error(error))
 .then(alert("CUENTA ELIMINADA"));
}

//FUNCIONES PARA ADMINISTRADOR
function Consultarusu() {
  const data = new FormData();
  data.append("oper", "consultarusu");
  data.append("clase", "usuarios");
  fetch(url, {
    method: "POST", // or 'PUT'
    body: data,
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => {
      console.log(response);
      var html =
        "<tr><th> CEDULA </th> <th> NOMBRE </th> <th> APELLIDO </th> <th> TELEFONO </th> <th> CORREO </th> <th> DIRECCION </th></tr>";
      response.forEach((element) => {
        html +=
          "<tr><th>" +
          element.cedula_usuario +
          " </th>" +
          "<th>" +
          element.nombre_usuario +
          " </th>" +
          "<th>" +
          element.apellido_usuario +
          " </th>" +
          "<th>" +
          element.telefono_usuario +
          " </th>" +
          "<th>" +
          element.correo_usuario +
          " </th>" +
          "<th>" +
          element.direccion_usuario +
          " </th></tr>";
      });
      document.getElementById("conusuario").innerHTML = html;
    });
}
