<?php

class servicios{
    function Agregarservicio($param){
        extract($param);
        $sql = "INSERT INTO servicios(
            codigo_servicio, completo, medio, solo_llantas, interno, brillo, nit_empresa)
            VALUES (?, ?, ?, ?, ?, ?, ?);";
        $rs = $conexion->getPDO()->prepare($sql);
        $conexion->getPDO()->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                try {
                    $rs->execute(array($codigo_s,$completo_s, $medio_s, $llantas_s, $interno_s, $brillo_s,$nit ));
                      $state  = "Servicio insertado correctamente con codigo " .$codigo_s ;
                     
                    echo json_encode($state);
                 } catch (Exception $ex) {
                    //$state[0] = print_r($ex, 1);
                    $state = "Ocurrio un error al insertar el servicio con codigo: " .$ex ;
                    
                    echo json_encode($state);
                }

    }

    function consultarservi($param){
        extract($param);
        $sql = "select * from servicios";
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