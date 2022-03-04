<?php
class producservi{
    function Agregarps($param){
        extract($param);
        $sql = "INSERT INTO productosservicios(
            codigo_pservicio, nombre_pservicio, descripcion_pservicio, responsable_pservicio, codigo_servicio, codigo_producto)
            VALUES (?, ?, ?, ?, ?, ?);";
        $rs = $conexion->getPDO()->prepare($sql);
        $conexion->getPDO()->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                try {
                    $rs->execute(array($codigo,$nombre, $descripcion, $responsable, $codigo_s, $codigo_p));
                      $state  = "Producto-servicio insertado correctamente con la codigo " .$codigo ;
                     
                    echo json_encode($state);
                 } catch (Exception $ex) {
                    //$state[0] = print_r($ex, 1);
                    $state = "Ocurrio un error al insertar el producto-servicio con codigo: " .$codigo ;
                    
                    echo json_encode($state);
                }

    }

    function consultarps($param){
        extract($param);
        $sql = "select * from productosservicios";
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