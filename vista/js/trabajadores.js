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
    data.append('cedula', document.getElementById("cedula_c").value);
    data.append('nombre', document.getElementById("nombre_c").value);
    data.append('apellido', document.getElementById("apellido_c").value);
    data.append('telefono', document.getElementById("tel_c").value);
    data.append('correo', document.getElementById("correo_c").value);
    data.append('edad', document.getElementById("edad_c").value);
    data.append('sede', document.getElementById('sede_c').value)

    fetch(url, {
            method: 'POST', // or 'PUT'
            body: data, // data can be `string` or {object}!

        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => alert('Agregado con exito!',response));

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
            //console.log(response);
            var html="";
            response.forEach(element => {
                html+="<tr><th>"+ element.cedula_colab +" </th>" +"<th>"+ element.nombre_colab+" </th>" +"<th>"+ element.apellido_colab+" </th>" 
                +"<th>"+ element.telefono_colab+" </th>" +"<th>"+ element.correo_colab+" </th>" +"<th>"+ element.edad_colab+"</th>"+"<th>"+element.nit_sede+"</th></tr>"
            });
            document.getElementById("contrabajadores").innerHTML=(html);
        });

}


