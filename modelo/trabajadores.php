<?php
class trabajadores{
    function AgregarTrabajador($param){
        extract($param);
        $sql = "INSERT INTO colaboradores(
            cedula_colab, nombre_colab, apellido_colab,telefono_colab, correo_colab, edad_colab, nit_sede)
            VALUES (?, ?, ?, ?, ?, ?, ?);";
        $rs = $conexion->getPDO()->prepare($sql);
        $conexion->getPDO()->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                try {
                    $rs->execute(array($cedula,$nombre,$apellido,$telefono,$correo,$edad,$sede));
                      $state  = "Trabajador insertado correctamente con la cedula " .$cedula ;
                     
                    echo json_encode($state);
                 } catch (Exception $ex) {
                    //$state[0] = print_r($ex, 1);
                    $state = "Ocurrio un error al insertar el trabajador con cedula: " .$cedula ;
                    
                    echo json_encode($state);
                }

    }

    function consultartraba($param){
        extract($param);
        $sql = "select * from colaboradores";
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