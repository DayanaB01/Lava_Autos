<?php
class lavaautos{
    function agregarLavaauto($param){
        extract($param);
        $sql = "INSERT INTO lavaauto(
            nit_empresa, nombre_empresa, direccion_empresa, telefono_empresa, correo_empresa, web_empresa)
            VALUES (?, ?, ?, ?, ?, ?);";
            $rs = $conexion->getPDO()->prepare($sql);
            $conexion->getPDO()->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            try {
                $rs->execute(array($nit,$nombre,$direccion,$tel,$correo,$web));
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
        $sql = "select * from lavaauto";
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