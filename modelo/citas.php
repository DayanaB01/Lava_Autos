<?php
class citas{
    function Agregarcitas($param){
        extract($param);
        $sql = "INSERT INTO citas(
            codigo_cita, fecha_cita, servicio_cita, nit_sede, cedula_usuario, placa_carro, estado)
            VALUES (?, ?, ?, ?, ?, ?, ?);";
        $rs = $conexion->getPDO()->prepare($sql);
        $conexion->getPDO()->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                try {
                    $rs->execute(array($codigo,$fecha,$servicio,$nit,$cedula,$placa,$estado));
                      $state  = "Cita programada correctamente con la codigo " .$codigo ;
                     
                    echo json_encode($state);
                 } catch (Exception $ex) {
                    //$state[0] = print_r($ex, 1);
                    $state = "Ocurrio un error al programar la cita con codigo: " .$ex ;
                    
                    echo json_encode($state);
                }

    }


    function consultarcitas($param){
        extract($param);
        $sql = "select * from citas";
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

    function Consultarcita($param){
        extract($param);
        $sql ="select * from citas where cedula_usuario=?";
        $rs = $conexion->getPDO()->prepare($sql);
        if ($rs->execute(array($codigo))) {
            if ($element = $rs->fetchAll(PDO::FETCH_ASSOC)) {
                foreach ($element as $element) {
                    $array[] = $element;
                }
            }
        }
        echo json_encode(($array));
    
    }

   
 
       
       function editarcita($param){
        extract($param);
        $sql ="UPDATE citas SET estado='$estado' where codigo_cita=?";
        $rs = $conexion->getPDO()->prepare($sql);
        if ($rs->execute(array($codigo))) {
            if ($element = $rs->fetchAll(PDO::FETCH_ASSOC)) {
                foreach ($element as $element) {
                    $array[] = $element;
                }
            }
        }
        echo json_encode(($array));
    
    }
    




}