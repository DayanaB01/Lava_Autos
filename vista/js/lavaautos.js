var url='../../controlador/fachada.php';

document.getElementById("registrar").addEventListener('click', function(){
    AgregarLavauto();
});

document.getElementById("consultar").addEventListener('click', function() {
    Consultarlavauto();
});

function AgregarLavauto(){
    const data=new FormData();
    data.append('oper','agregarLavaauto');
    data.append('clase','lavaautos');
    data.append('nit',document.getElementById("nit").value);
    data.append('nombre', document.getElementById("nombre_s").value);
    data.append('direccion', document.getElementById("direccion_s").value);
    data.append('tel',document.getElementById("tel_s").value);
    data.append('correo', document.getElementById("correo_s").value);
    data.append('admin', document.getElementById("admin_s").value);
    fetch(url,{
        method: 'POST',
        body: data,
       
    }).then(res=> res.json())  
    .catch(error => console.error('Error!!!:',error))
    .then(alert("Sede registrada con éxito!"));
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
            var html="";
            response.forEach(element => {
                html+="<tr><th>"+ element.nombre_sede+" </th>" +"<th>"+ element.direccion_sede +" </th>" 
                +"<th>"+ element.telefono_sede +" </th>" +"<th>"+ element.correo_sede +" </th>" +"<th>"+ element.nombre_admin +" </th></tr>"
            });
            document.getElementById("conlava").innerHTML=(html);
        });

}