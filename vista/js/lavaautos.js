var url='../../controlador/fachada.php';

document.getElementById("registrar").addEventListener('click', function(){
    AgregarLavaauto();
});

document.getElementById("consultar").addEventListener('click', function() {
    Consultarlavauto();
});

function  AgregarLavaauto(){
    const data=new FormData();
    data.append('oper','agregarLavaauto');
    data.append('clase','lavaautos');
    data.append('nit',document.getElementById("nit").value);
    data.append('nombre', document.getElementById("nombre_e").value);
    data.append('direccion', document.getElementById("direccion_e").value);
    data.append('tel',document.getElementById("tel_e").value);
    data.append('correo', document.getElementById("correo_e").value);
    data.append('web', document.getElementById("web_e").value);
    fetch(url,{
        method: 'POST',
        body: data,
       
    }).then(res=> res.json())  
    .catch(error => console.error('error:',error))
    .then(response=> alert(response));
}

function Consultarlavauto() {
    const data = new FormData();
    data.append('oper', 'consultarlava');
    data.append('clase', 'lavaautos');
    fetch(url, {
            method: 'POST', // or 'PUT'
            body: data,
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            console.log(response);
            var html="<tr><th> NIT </th> <th> NOMBRE </th> <th> DIRECCION </th> <th> TELEFONO </th> <th> CORREO </th> <th> WEB </th></tr>";
            response.forEach(element => {
                html+="<tr><th>"+ element.nit_empresa +" </th>" +"<th>"+ element.nombre_empresa+" </th>" +"<th>"+ element.direccion_empresa +" </th>" 
                +"<th>"+ element.telefono_empresa +" </th>" +"<th>"+ element.correo_empresa +" </th>" +"<th>"+ element.web_empresa +" </th></tr>"
            });
            document.getElementById("conlava").innerHTML=(html);
        });

}