<?php
class lavaautos{
    function agregarLavaauto($param){
        extract($param);
        $sql = "INSERT INTO sedes(
            nit_sede, nombre_sede, direccion_sede, telefono_sede, correo_sede, nombre_admin)
            VALUES (?, ?, ?, ?, ?, ?);";
            $rs = $conexion->getPDO()->prepare($sql);
            $conexion->getPDO()->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            try {
                $rs->execute(array($nit,$nombre,$direccion,$tel,$correo,$admin));
                  $state  = "Lavaauto insertado con codigo" .$nit;
                 
                echo json_encode($state);
             } catch (Exception $ex) {
                //$state[0] = print_r($ex, 1);
                $state = "Ocurrio un error al insertar el lavaauto con codigo: " .$nit;
                
                echo json_encode($state);
            }
            
    }


    function consultarlava($param){
        extract($param);
        $sql = "select * from sedes";
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

    function consultarSede($info){
        extract($info);
        $sql="SELECT * FROM sedes WHERE nit_sede=?";
        $rs=$conexion->getPDO()->prepare($sql);
        if ($rs->execute(array($codigo))) {
            if ($elemento= $rs->fetchAll(PDO::FETCH_ASSOC)) {
                foreach ($elemento as $elemento) {
                    $arraySede[]=$elemento;
                }
            }
        }
        echo json_encode(($arraySede));
    }

    function editarSede($info){
        extract($info);
        $sql="UPDATE sedes SET nombre_sede='$nombre', direccion_sede='$direccion', telefono_sede='$telefono', correo_sede='$correo', nombre_admin='$admin' WHERE nit_sede=?";
        $rs=$conexion->getPDO()->prepare($sql);
        if ($rs->execute(array($codigo))) {
            if ($e = $rs->fetchAll(PDO::FETCH_ASSOC)) {
                foreach ($key as $key) {
                    $arrayEditar[]=$e;
                }
            }
        }
        echo json_encode(($arrayEditar));
    }

    function eliminarSede($x){
        extract($x);
        $sql="DELETE FROM sedes WHERE nit_sede=?";
        $rs=$conexion->getPDO()->prepare($sql);
        if ($rs->execute(array($codigo))) {
            try {
                $respuesta = "Información eliminada con exito";
            } catch (Exception $ex) {
                $respuesta = "Error, debe eliminar otra información".$ex;
            }
        }
        echo json_encode(($respuesta));
    }
}