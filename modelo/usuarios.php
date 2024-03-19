<?php
class usuarios{
    function Agregarusuario($param){
        extract($param);
        $sql = "INSERT INTO usuarios(
            cedula_usuario, nombre_usuario, apellido_usuario,telefono_usuario, correo_usuario, direccion_usuario, contrasena)
            VALUES (?, ?, ?, ?, ?, ?, ?);";
        $rs = $conexion->getPDO()->prepare($sql);
        $conexion->getPDO()->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                try {
                    $rs->execute(array($cedula,$nombre, $apellido, $telefono, $correo, $direccion, $contrasena ));
                      $state  = "Usuario insertado correctamente con la cedula " .$cedula ;
                     
                    echo json_encode($state);
                 } catch (Exception $ex) {
                    //$state[0] = print_r($ex, 1);
                    $state = "Ocurrio un error al insertar el usuario con cedula: " .$cedula ;
                    
                    echo json_encode($state);
                }

    }

    function consultarusu($param){
        extract($param);
        $sql = "select * from usuario";
        $rs = $conexion->getPDO()->prepare($sql);
        if ($rs->execute(array())) {
            if ($filas = $rs->fetchAll(PDO::FETCH_ASSOC)) {
                foreach ($filas as $fila) {

                    $array[] = $fila;
                }
            }
        }
    
            echo json_encode(($array));        
 

    }
}