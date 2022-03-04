var url='../../controlador/fachada.php';


document.getElementById("registrar").addEventListener('click', function() {
    AgregarTrabajador();
});

document.getElementById("consultar").addEventListener('click', function() {
    ConsultarTrabajadores();
});

function AgregarTrabajador() {

    const data = new FormData();
    data.append('oper', 'AgregarTrabajador');
    data.append('clase', 'trabajadores');
    data.append('cedula', document.getElementById("cedula_t").value);
    data.append('nombre', document.getElementById("nombre_t").value);
    data.append('apellido', document.getElementById("apellido_t").value);
    data.append('telefono', document.getElementById("tel_t").value);
    data.append('correo', document.getElementById("correo_t").value);
    data.append('edad', document.getElementById("edad_t").value);

    fetch(url, {
            method: 'POST', // or 'PUT'
            body: data, // data can be `string` or {object}!

        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => alert(response));

}

function  ConsultarTrabajadores() {
    const data = new FormData();
    data.append('oper', 'consultartraba');
    data.append('clase', 'trabajadores');
    fetch(url, {
            method: 'POST', // or 'PUT'
            body: data,
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            console.log(response);
            var html="<tr><th> CEDULA </th> <th> NOMBRE </th> <th> APELLIDO </th> <th> TELEFONO </th> <th> CORREO </th> <th> EDAD </th></tr>";
            response.forEach(element => {
                html+="<tr><th>"+ element.cedula_trabajador +" </th>" +"<th>"+ element.nombre_trabajador+" </th>" +"<th>"+ element.apellido_trabajador+" </th>" 
                +"<th>"+ element.telefono_trabajador+" </th>" +"<th>"+ element.correo_trabajador+" </th>" +"<th>"+ element.edad_trabajador+" </th></tr>"
            });
            document.getElementById("contrabajadores").innerHTML=(html);
        });

}


