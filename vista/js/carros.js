var url='controlador/fachada.php';


document.getElementById("registrar").addEventListener('click', function() {
    AgregarCarro();
});

document.getElementById("consultar").addEventListener('click', function() {
    ConsultarCarro();
});


function ConsultarCarro() {
    const data = new FormData();
    data.append('oper', 'consultarcarro');
    data.append('clase', 'carros');
    fetch(url, {
            method: 'POST', // or 'PUT'
            body: data,
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            console.log(response);
            var html="<tr><th> PLACA </th> <th> MARCA </th> <th> MODELO </th> <th> TIPO </th> <th> SERVICIO </th> <th> USUARIO</th></tr>";
            response.forEach(element => {
                html+="<tr><th>"+ element.placa_carro +" </th>" +"<th>"+ element.marca_carro +" </th>" +"<th>"+ element.modelo_carro +" </th>" 
                +"<th>"+ element.tipo_carro +" </th>" +"<th>"+ element.codigo_servicio +" </th>" +"<th>"+ element.cedula_usuario +" </th></tr>"
            });
            document.getElementById("concarro").innerHTML=(html);
        });

}


function AgregarCarro() {

    const data = new FormData();
    data.append('oper', 'AgregarCarro');
    data.append('clase', 'carros');
    data.append('placa', document.getElementById("placa").value);
    data.append('marca', document.getElementById("marca").value);
    data.append('modelo', document.getElementById("modelo").value);
    data.append('tipo', document.getElementById("tipo").value);
    data.append('codigo_s', document.getElementById("codigo_s").value);
    data.append('cedula_u', document.getElementById("cedula_u").value);

    fetch(url, {
            method: 'POST',
            body: data, 

        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => alert(response));

}


