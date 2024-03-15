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
}