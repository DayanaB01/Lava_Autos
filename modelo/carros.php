<?php

class carros{
    function AgregarCarro($param){
        extract($param);
        $sql = "INSERT INTO carros(
            placa_carro, marca_carro, modelo_carro, tipo_carro, codigo_servicio, cedula_usuario)
            VALUES (?, ?, ?, ?, ?, ?);";
        $rs = $conexion->getPDO()->prepare($sql);
        $conexion->getPDO()->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION).$ex;
                try {
                    $rs->execute(array($placa,$marca, $modelo, $tipo, $codigo_s,$cedula_u ));
                      $state  = "Carro insertado correctamente con placa " .$placa ;
                     
                    echo json_encode($state);
                 } catch (Exception $ex) {
                    //$state[0] = print_r($ex, 1);
                    $state = "Ocurrio un error al insertar el carro con placa: " .$placa ;
                    
                    echo json_encode($state);
                }

    }

    function consultarcarro($param){
        extract($param);
        $sql = "select * from carros";
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