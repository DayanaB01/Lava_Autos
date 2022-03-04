var url='../../controlador/fachada.php';


document.getElementById("registrar").addEventListener('click', function() {
    Agregarcitas();
});



document.getElementById("consultarcita").addEventListener('click', function() {
    ConsultarCita();
});

document.getElementById("editar").addEventListener('click', function(){
    EditarCita();
});


function Agregarcitas() {

    const data = new FormData();
    data.append('oper', 'Agregarcitas');
    data.append('clase', 'citas');
    data.append('codigo', document.getElementById("codigo_c").value);
    data.append('fecha', document.getElementById("fecha_c").value);
    data.append('cedula_t', document.getElementById("cedula_t").value);
    data.append('codigo_s', document.getElementById("codigo_s").value);
    data.append('placa', document.getElementById("placa").value);
    data.append('descripcion', document.getElementById("descripcion_c").value);
    data.append('hora', document.getElementById("hora_c").value);
    data.append('estado', document.getElementById("estado").value);
    fetch(url, {
            method: 'POST', // or 'PUT'
            body: data, // data can be `string` or {object}!

        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => alert(response));

}



function   ConsultarCita(){
    let cod=document.getElementById("codigo_c");
    const data = new FormData();
    
    if(cod.value==''){
        data.append('oper','Consultarcitas');
        data.append('clase','citas');
    }else{
        data.append('oper','Consultarcita');
        data.append('clase','citas');
        data.append('codigo', cod.value);
    }
 fetch(url, {
            method: 'POST', 
            body: data,
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            if(response==null){
                alert("entra");
            }else{            
                var html="<tr><th> CODIGO </th> <th> FECHA </th> <th> HORA </th> <th> TRABAJADOR </th> <th> SERVICIO </th> <th> CARRO </th> <th> DESCRIPCION</th><th> ESTADO</th></tr>";
                response.forEach(element => {
                    html+="<tr><th>"+ element.codigo_cita +" </th>" +"<th>"+ element.fecha_cita+" </th>"+"<th>"+ element.hora+" </th>" +"<th>"+ element.cedula_trabajador +" </th>" 
                    +"<th>"+ element.codigo_servicio +" </th>" +"<th>"+ element.placa_carro +" </th>" +"<th>"+ element.descripcion_cita +"<th>"+ element.estado +"</th></tr>"
            });
            document.getElementById("concita").innerHTML=(html);
         }
         });

}


function EditarCita(){
    const data = new FormData();
    data.append('oper', 'editarcita');
    data.append('clase', 'citas');
    data.append('codigo', document.getElementById("codigo_c").value);
    data.append('estado', document.getElementById("estado").value); 
    fetch(url, {
            method: 'POST', // or 'PUT'
            body: data,
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => alert(response));
           
}



