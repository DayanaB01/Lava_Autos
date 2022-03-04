<?php

class productos{
    function Agregarproducto($param){
        extract($param);
        $sql = "INSERT INTO productos(
            codigo_producto, nombre_producto, tamaño_producto, marca_producto, valor_producto, calidad_producto)
            VALUES (?, ?, ?, ?, ?, ?);";
        $rs = $conexion->getPDO()->prepare($sql);
        $conexion->getPDO()->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                try {
                    $rs->execute(array($codigo,$nombre, $tamaño, $marca, $valor, $calidad ));
                      $state  = "Producto insertado correctamente con el codigo " .$codigo ;
                     
                    echo json_encode($state);
                 } catch (Exception $ex) {
                    //$state[0] = print_r($ex, 1);
                    $state = "Ocurrio un error al insertar el producto con codigo: " .$codigo ;
                    
                    echo json_encode($state);
                }

    }

    function consultarproduc($param){
        extract($param);
        $sql = "select * from productos";
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