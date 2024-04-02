var url = "../../controlador/fachada.php";

document.getElementById("registrar").addEventListener("click", function () {
  AgregarLavauto();
});

document.getElementById("consultar").addEventListener("click", function () {
  Consultarlavauto();
});

document.getElementById("unicaSede").addEventListener("click", function () {
  if (document.getElementById("codigo_sede").value == "") {
    alert("DIGITA UN CODIGO");
  } else {
    Consultarlavauto();
    limpiarInput();
  }
});

function limpiarInput() {
  let vacio = "";
  let input = document.getElementById("codigo_sede");
  input.value = vacio;
  input.focus();
}

function AgregarLavauto() {
  const data = new FormData();
  data.append("oper", "agregarLavaauto");
  data.append("clase", "lavaautos");
  data.append("nit", document.getElementById("nit").value);
  data.append("nombre", document.getElementById("nombre_s").value);
  data.append("direccion", document.getElementById("direccion_s").value);
  data.append("tel", document.getElementById("tel_s").value);
  data.append("correo", document.getElementById("correo_s").value);
  data.append("admin", document.getElementById("admin_s").value);
  fetch(url, {
    method: "POST",
    body: data,
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error!!!:", error))
    .then(alert("Sede registrada con éxito!"));
}

function Consultarlavauto() {
  let nit = document.getElementById("codigo_sede").value;
  const data = new FormData();
  if (nit == "") {
    data.append("oper", "consultarlava");
    data.append("clase", "lavaautos");
  } else {
    data.append("oper", "consultarSede");
    data.append("clase", "lavaautos");
    data.append("codigo", nit);
  }

  fetch(url, {
    method: "POST", // or 'PUT'
    body: data,
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => {
      console.log(response);
      if (response == null) {
        alert("Sede no exitente!!");
      } else {
        var html = "";
        response.forEach((element) => {
          html +=
            "<tr><th>" +
            element.nit_sede +
            "</th><th>" +
            element.nombre_sede +
            " </th>" +
            "<th>" +
            element.direccion_sede +
            " </th>" +
            "<th>" +
            element.telefono_sede +
            " </th>" +
            "<th>" +
            element.correo_sede +
            " </th>" +
            "<th>" +
            element.nombre_admin +
            " </th>"+
            "<th>"+
            "<button onclick='traerSede("+
            element.nit_sede+
            ")'>✍️</button>"
            +"</th><th>"+
            "<button onClick='eliminarInfosede("
            +element.nit_sede+")'>🗑️</button>"
            +"</th></tr>";
        });

        if (nit == "") {
          document.getElementById("conlava").innerHTML = html;
        } else {
          document.getElementById("infoSede").innerHTML = html;
        }
      }
    });
}

function traerSede(nit) {
    const dato = new FormData();
    dato.append('oper', 'consultarSede');
    dato.append('clase', 'lavaautos');
    dato.append('codigo', nit);

    fetch(url,{
        method:'POST',
        body:dato,
    })
    .then(r=>r.json())
    .catch(e=>console.error(e))
    .then(res=>{
        var editar='';
        res.forEach((r)=>{
            editar+="<input id='nombre' value="
            +r.nombre_sede
            +"><input id='direccion' value="+
            r.direccion_sede+
            "><input id='telefono' value="+
            r.telefono_sede+
            "><input id='correo' value="+
            r.correo_sede+
            "><input id='admin' value="+
            r.nombre_admin+
            "><button onClick='editarInfoSede("+
            r.nit_sede+")'>EDITAR</button>";
        });
        document.getElementById('infoEditar').innerHTML=(editar);
    });
}

function editarInfosede(p) {
    let info = new FormData();

    info.append('oper', 'editarSede');
    info.append('clase', 'lavaautos');
    info.append('codigo', p);
    info.append('nombre', document.getElementById('nombre').value);
    info.append('direccion', document.getElementById('direccion').value);
    info.append('telefono', document.getElementById('telefono').value);
    info.append('correo', document.getElementById('correo').value);
    info.append('admin', document.getElementById('admin').value);

    fetch(url,{
        method:'POST',
        body:info,
    })
    .then(res=>res.json())
    .catch(e=>console.error(e))
    .then(alert('EDITADO!!'))
}

function eliminarInfosede(codigo_i){
    let eliminar = new FormData();

    eliminar.append('oper', 'eliminarSede');
    eliminar.append('clase', 'lavaautos');
    eliminar.append('codigo', codigo_i);

    fetch(url,{
        method:'POST',
        body:eliminar,
    })
    .then((res) => res.json())
    .catch((error) => console.error(error))
    .then(alert("ELEMENTO ELIMINADO"));
}