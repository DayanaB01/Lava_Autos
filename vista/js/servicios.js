var url='../../controlador/fachada.php';


document.getElementById("registrar").addEventListener('click', function() {
    agregarservicio();
});

document.getElementById("consultar").addEventListener('click', function() {
    Consultarservicios();
});

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

