var url='../../controlador/fachada.php';


document.getElementById("registrar").addEventListener('click', function() {
    AgregarUsuario();
});

// document.getElementById("consultar").addEventListener('click', function() {
//     Consultarusu();
// });




function AgregarUsuario() {
    const data = new FormData();
    data.append('oper', 'Agregarusuario');
    data.append('clase', 'usuarios');
    data.append('cedula', document.getElementById("cedula_u").value);
    data.append('nombre', document.getElementById("nombre_u").value);
    data.append('apellido', document.getElementById("apellido_u").value);
    data.append('telefono', document.getElementById("tel_u").value);
    data.append('correo', document.getElementById("correo_u").value);
    data.append('direccion', document.getElementById("direccion_u").value);
    data.append('contrasena', document.getElementById("contrasena_u").value);

    fetch(url, {
            method: 'POST', // or 'PUT'
            body: data, // data can be `string` or {object}!

        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => alert(response));

}


function  Consultarusu() {
    const data = new FormData();
    data.append('oper', 'consultarusu');
    data.append('clase', 'usuarios');
    fetch(url, {
            method: 'POST', // or 'PUT'
            body: data,
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            console.log(response);
            var html="<tr><th> CEDULA </th> <th> NOMBRE </th> <th> APELLIDO </th> <th> TELEFONO </th> <th> CORREO </th> <th> DIRECCION </th></tr>";
            response.forEach(element => {
                html+="<tr><th>"+ element.cedula_usuario +" </th>" +"<th>"+ element.nombre_usuario+" </th>" +"<th>"+ element.apellido_usuario+" </th>" 
                +"<th>"+ element.telefono_usuario+" </th>" +"<th>"+ element.correo_usuario+" </th>" +"<th>"+ element.direccion_usuario+" </th></tr>"
            });
            document.getElementById("conusuario").innerHTML=(html);
        });

}


