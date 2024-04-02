var url='../../controlador/fachada.php';


document.getElementById("registrar").addEventListener('click', function() {
    AgregarTrabajador();
    limpiarInputs();
});

document.getElementById("consultar").addEventListener('click', function() {
    ConsultarTrabajadores();
});

document.getElementById("buscarColaborador").addEventListener('click', function(){
    if (document.getElementById('codigo_colaborador').value=='') {
        alert('DIGITE UN CODIGO')
    } else {
        ConsultarTrabajadores();
        limpiarInput();   
    }
});
function limpiarInput(){
    let vacio = '';
    let input = document.getElementById('codigo_colaborador');
    input.value = vacio;
    input.focus();
}

function limpiarInputs(){
    let vacio = '';
    let input = document.getElementById('cedula_c');
    let input1 = document.getElementById('nombre_c');
    let input2 = document.getElementById('apellido_c');
    let input3 = document.getElementById('tel_c');
    let input4 = document.getElementById('correo_c');
    let input5 = document.getElementById('edad_c');
    let input6 = document.getElementById('sede_c');
    input.value = vacio;
    input1.value = vacio;
    input2.value = vacio;
    input3.value = vacio;
    input4.value = vacio;
    input5.value = vacio;
    input6.value = vacio;
    input.focus();
    input1.focus();
    input2.focus();
    input3.focus();
    input4.focus();
    input5.focus();
    input6.focus();
}

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
    let codigoColab = document.getElementById('codigo_colaborador').value;
    const data = new FormData();
    if (codigoColab == '') {
        data.append('oper', 'consultartraba');
        data.append('clase', 'trabajadores');
    } else {
        data.append('oper', 'consultarColaborador');
        data.append('clase', 'trabajadores');
        data.append('codigo', codigoColab);
    }

    fetch(url, {
            method: 'POST', // or 'PUT'
            body: data,
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            //console.log(response);
            if (response==null) {
                alert('El codigo del colaborador no se encuentra');
            } else {
                var html="";
                response.forEach(element => {
                    html+="<tr><th>"+ element.cedula_colab +" </th>" +"<th>"+ element.nombre_colab+" </th>" +"<th>"+ element.apellido_colab+" </th>" 
                    +"<th>"+ element.telefono_colab+" </th>" +"<th>"+ element.correo_colab+" </th>" +"<th>"+ element.edad_colab+"</th>"+"<th>"
                    +element.nit_sede+"</th><th><button onclick='mostrarEditar("+element.cedula_colab+")'>✍️</button></th><th><button onclick='eliminarInfoC("
                    +element.cedula_colab+")'>🗑️</button></th></tr>"
                });
                if (codigoColab=='') {
                    document.getElementById("contrabajadores").innerHTML=(html);
                } else {
                    document.getElementById("colaborador").innerHTML=(html);
                }
            }
        });

}

function mostrarEditar(codigo) {
    const data = new FormData();

    data.append('oper', 'consultarColaborador');
    data.append('clase', 'trabajadores');
    data.append('codigo', codigo);

    fetch(url, {
        method:'POST',
        body: data,
    })
    .then(res=>res.json())
    .catch(error=>console.error('Error!', error))
    .then(respo=>{
        var entrada='';
        respo.forEach(el=>{
            entrada+="<input id='nombre' value="+el.nombre_colab+
            "><input id='apellido' value="+el.apellido_colab+
            "><input id='telefono' value="+el.telefono_colab+
            "><input id='correo' value="+el.correo_colab+
            "><input id='edad' value="+el.edad_colab+
            "><input id='sede' value="+el.nit_sede+"><button onclick='EditarInformacion("+
            el.cedula_colab+")'>EDITAR INFO</button>";
        });
        document.getElementById('editarInfo').innerHTML=(entrada);
    });
}

function EditarInformacion(params) {
    let data = new FormData();
    data.append('oper', 'editarColaborador');
    data.append('clase', 'trabajadores');
    data.append('codigo', params);
    data.append('nombre', document.getElementById('nombre').value);
    data.append('apellido', document.getElementById('apellido').value);
    data.append('telefono', document.getElementById('telefono').value);
    data.append('correo', document.getElementById('correo').value);
    data.append('edad', document.getElementById('edad').value);
    data.append('sede', document.getElementById('sede').value);

    fetch(url,{
        method:'POST',
        body: data,
    })
    .then(response=>response.json())
    .catch(e=>console.error(e))
    .then(alert('Editado!!'));
}


function eliminarInfoC(parametro) {
    let dato= new FormData();
    dato.append('oper', 'eliminarInfoColab');
    dato.append('clase', 'trabajadores');
    dato.append('codigo',parametro);
    fetch(url,{
        method:'POST',
        body: dato,
    })
    .then(res=>res.json())
    .catch(e=>console.error(e))
    .then(alert("ok"))
}