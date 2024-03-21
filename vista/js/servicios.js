var url='../../controlador/fachada.php';


document.getElementById("registrar").addEventListener('click', function() {
    AgregarCarro();
});

document.getElementById("agendar").addEventListener('click', function() {
    Agregarcitas();
});

function AgregarCarro() {

    const data = new FormData();
    data.append('oper', 'AgregarCarro');
    data.append('clase', 'carros');
    data.append('placa', document.getElementById("placa_c").value);
    data.append('marca', document.getElementById("marca_c").value);
    data.append('modelo', document.getElementById("modelo_c").value);
    data.append('tamano', document.getElementById("tamano_c").value);
    data.append('cedula_u', document.getElementById("cedula_u").value);

    fetch(url, {
            method: 'POST',
            body: data, 

        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => alert(response));

}

function Agregarcitas() {

    const data = new FormData();
    data.append('oper', 'Agregarcitas');
    data.append('clase', 'citas');
    data.append('codigo', document.getElementById("codigo_c").value);
    data.append('fecha', document.getElementById("fecha_c").value);
    data.append('servicio', document.getElementById("servicio_c").value);
    data.append('nit', '123');
    data.append('cedula', document.getElementById("cedula_usuario").value);
    data.append('placa', document.getElementById("placa_cita").value);
    data.append('estado', 'en_espera');
    // console.log('documentos: ', data.get('codigo'),'2: ', data.get('fecha'),'3: ', data.get('servicio'),'4: ', data.get('nit'),
    // '5: ', data.get('cedula'),'6: ', data.get('placa'), '7: ', data.get('estado'))
    fetch(url, {
            method: 'POST', // or 'PUT'
            body: data, // data can be `string` or {object}!

        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => alert(response));

}

function agregarservicio() {

    const data = new FormData();
    data.append('oper', 'Agregarservicio');
    data.append('clase', 'servicios');
    data.append('codigo_s', document.getElementById("codigo_s").value);
    data.append('completo_s', document.getElementById("completo_s").value);
    data.append('medio_s', document.getElementById("medio_s").value);
    data.append('llantas_s', document.getElementById("llantas_s").value);
    data.append('interno_s', document.getElementById("interno_s").value);
    data.append('brillo_s', document.getElementById("brillo_s").value);
    data.append('nit',document.getElementById("nit").value);
    fetch(url, {
            method: 'POST', // or 'PUT'
            body: data, // data can be `string` or {object}!

        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => alert(response));

}


function Consultarservicios() {
    const data = new FormData();
    data.append('oper', 'consultarservi');
    data.append('clase', 'servicios');
    fetch(url, {
            method: 'POST', // or 'PUT'
            body: data,
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            console.log(response);
            var html="<tr><th> CODIGO </th> <th> COMPLETO </th> <th> MEDIO </th> <th> LLANTAS </th> <th> INTERNO </th> <th> BRILLO </th><th> NIT </th></tr>";
            response.forEach(element => {
                html+="<tr><th>"+ element.codigo_servicio +" </th>" +"<th>"+ element.completo+" </th>" +"<th>"+ element.medio+" </th>" 
                +"<th>"+ element.solo_llantas+" </th>" +"<th>"+ element.interno+" </th>" +"<th>"+ element.brillo+" </th><th>"+ element.nit_empresa+" </th></tr>"
            });
            document.getElementById("conservicio").innerHTML=(html);
        });

}

