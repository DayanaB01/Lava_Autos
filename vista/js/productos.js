var url='../../controlador/fachada.php';


document.getElementById("registrar").addEventListener('click', function() {
    AgregarProductos();
});

document.getElementById("consultar").addEventListener('click', function() {
    Consultarproductos()   
});
document.getElementById("buscarProducto").addEventListener('click', function(){
    if (document.getElementById('codigo').value == '') {
        alert('DIGITA UN CODIGO')
    } else {
        Consultarproductos();
        limpiarInputs();
    }
});


function limpiarInputs(){
    let vacio = '';
    let input = document.getElementById('codigo');
    input.value = vacio;
    input.focus();
}

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

//COMO LIMPIAR EL INPUT
function Consultarproductos() {
    let codigo = document.getElementById('codigo').value;
    const data = new FormData();
    if (codigo == '') {
        data.append('oper', 'consultarproduc');
        data.append('clase', 'productos');  
    } else {
        data.append('oper', 'consultarUnico');
        data.append('clase', 'productos');
        data.append('codigo', codigo);
    }

    fetch(url, {
            method: 'POST', // or 'PUT'
            body: data,
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            if (response == null) {
                alert('Este producto no existe')
            } else {
                var html="";
                response.forEach(element => {
                    html+="<tr><th>"+ element.codigo_producto +" </th>" +"<th>"+ element.nombre_producto+" </th>" +"<th>"+ element.tamano_producto+" </th>" 
                    +"<th>"+ element.valor_producto+"</th><th>"+element.imagen+"</th><th>"+"<button onclick='EditarProducto("+element.codigo_producto+")'>✍️</button></th><th><button onClick='eliminarProducto("+element.codigo_producto+")'>🗑️</button></th></tr>"
                });
    
                if (codigo == '') {
                    document.getElementById("conproductos").innerHTML=(html); 
                } else {
                    document.getElementById("productoUnico").innerHTML=(html)
                }
            }
        })
}

function EditarProducto(codigoProducto){
    const data = new FormData();

    data.append('oper','consultarUnico');
    data.append('clase','productos');
    data.append('codigo', codigoProducto)

    fetch(url, {
        method: 'POST',
        body: data,
    }).then(respon => respon.json())
    .catch(error=>console.error('X',error))
    .then(
        response=>{
            var inputs='';

            response.forEach(e=>{
                inputs+="<input id='name' value="+e.nombre_producto+"><select id='tamano'><option disabled selected >"+e.tamano_producto+
                "</option><option value='Grande'>Grande</option><option value='Mediana'>Mediano</option><option value='Pequeno'>Pequeño</option></select><input id='valor' value="
                +e.valor_producto+"><input id='imagen' value="+e.imagen+
                "><button onClick='editarProducto("+e.codigo_producto+")'>EDITAR</button>";
            });
            document.getElementById('editarInfo').innerHTML=(inputs);
        }
    )
}
""
function editarProducto(valor){
  let data = new FormData();
  data.append('oper', 'editarProducto');
  data.append('clase', 'productos')
  data.append('codigo', valor);
  data.append('nombre', document.getElementById('name').value);
  data.append('tamano',document.getElementById('tamano').value);
  data.append('valor',document.getElementById('valor').value);
  data.append('url', document.getElementById('imagen').value);
    fetch(url,{
        method:'POST',
        body: data,
    })
    .then(res=>res.json())
    .catch(error=>console.error(error))
    .then(alert("PRODUCTO EDITADO CON ÉXITO"))
}

function eliminarProducto(parametro) {
    let data = new FormData();
    data.append('oper', 'eliminarProducto');
    data.append('clase', 'productos');
    data.append('codigo', parametro);
    //console.log("PRODUCTO:", parametro)
    fetch(url,{
        method: 'POST',
        body: data,
    })
    .then(res=>res.json())
    .catch(error=>console.error(error))
    .then(alert("ELEMENTO ELIMINADO"))
}
