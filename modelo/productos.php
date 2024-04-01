<?php

class productos{
    function Agregarproducto($param){
        extract($param);
        $sql = "INSERT INTO productos(
            codigo_producto, nombre_producto, tamano_producto, valor_producto, nit_sede, imagen)
            VALUES (?, ?, ?, ?, ?, ?);";
        $rs = $conexion->getPDO()->prepare($sql);
        $conexion->getPDO()->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                try {
                    $rs->execute(array($codigo,$nombre,$tamano,$valor,$nit,$imagen));
                      $state  = "Producto insertado correctamente con el codigo " .$codigo ;
                     
                    echo json_encode($state);
                 } catch (Exception $ex) {
                    //$state[0] = print_r($ex, 1);
                    $state = "Ocurrio un error al insertar el producto con codigo: " .$ex ;
                    
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

    function consultarUnico($parametro){
        extract($parametro);
        $sql = "SELECT * FROM productos WHERE codigo_producto=?";
        $rs = $conexion->getPDO()->prepare($sql);
        if ($rs->execute(array($codigo))) {
            if ($element = $rs->fetchAll(PDO::FETCH_ASSOC)) {
                foreach($element as $element){
                    $array[] = $element;
                }
            }
        }
        echo json_encode(($array));
    }

    function editarProducto($parametros){
        extract($parametros);
        $sql="UPDATE productos SET nombre_producto='$nombre', tamano_producto='$tamano', valor_producto= '$valor', imagen='$url' WHERE codigo_producto = ?";
        $rs = $conexion->getPDO()->prepare($sql);
        if ($rs->execute(array($codigo))) {
            if ($element = $rs->fetchAll(PDO::FETCH_ASSOC)) {
                foreach($element as $element){
                    $array[] = $element;
                }
            }
        }
        echo json_encode(($array));
    }

    function eliminarProducto($parametro){
        extract($parametro);
        $sql = "DELETE FROM productos WHERE codigo_producto=?";
        $rs = $conexion->getPDO()->prepare($sql);
        // $conexion->getPDO()->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        // try {
        //     $rs->execute(array($codigo));
        //     $estado = "Producto eliminado con exito";
        //     echo json_encode($estado)
        // } catch (Exception $ex) {
        //     $estado = "Hubo un problema para eliminar";
        //     echo json_encode($estado)
        // }
        if ($rs->execute(array($codigo))) {
        try {
            $estado = "Producto eliminado con exito";
           // echo json_encode($estado)
        } catch (Exception $ex) {
            $estado = "Hubo un problema para eliminar".$ex;
            //echo json_encode($estado)
        }
            // if ($elemento = $rs->fetchAll(PDO::FECTH_ASSOC)) {
            //     foreach ($elemento as $elemento) {
            //         $array[] = $elemento;
            //     }
            // }
        } 
        echo json_encode(($estado));
    }
}
