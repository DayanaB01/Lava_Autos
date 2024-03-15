var url='../../controlador/fachada.php';


document.getElementById("registrar").addEventListener('click', function() {
    AgregarProductos();
});

document.getElementById("consultar").addEventListener('click', function() {
    Consultarproductos();
});


function AgregarProductos() {
    const data = new FormData();
    data.append('oper', 'Agregarproducto');
    data.append('clase', 'productos');
    data.append('codigo', document.getElementById("codigo_p").value);
    data.append('nombre', document.getElementById("nombre_p").value);
    data.append('tamano', document.getElementById("tamaño_p").value);
    data.append('valor', document.getElementById("valor_p").value);
    data.append('nit', document.getElementById("nit_sede").value);
    data.append('imagen', document.getElementById("imagen_p").value);
    fetch(url, {
            method: 'POST', // or 'PUT'
            body: data, // data can be `string` or {object}!
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(resp => alert('Registrado con exito!', resp));

}

function Consultarproductos() {
    const data = new FormData();
    data.append('oper', 'consultarproduc');
    data.append('clase', 'productos');
    fetch(url, {
            method: 'POST', // or 'PUT'
            body: data,
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            //console.log(response);
            var html="";
            response.forEach(element => {
                html+="<tr><th>"+ element.codigo_producto +" </th>" +"<th>"+ element.nombre_producto+" </th>" +"<th>"+ element.tamano_producto+" </th>" 
                +"<th>"+ element.valor_producto+"</th><th>"+element.imagen+"</th></tr>"
            });
            document.getElementById("conproductos").innerHTML=(html);
        });

}



