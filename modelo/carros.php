<?php

class carros{
    function AgregarCarro($param){
        extract($param);
        $sql = "INSERT INTO carros(
            placa_carro, marca_carro, modelo_carro,tamano_carro, cedula_usuario)
            VALUES (?, ?, ?, ?, ?);";
        $rs = $conexion->getPDO()->prepare($sql);
        $conexion->getPDO()->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION).$ex;
                try {
                    $rs->execute(array($placa,$marca, $modelo, $tamano,$cedula_u ));
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

    function consultaCarro($info){
        extract($info);
        $sql="SELECT * FROM carros WHERE cedula_usuario = ?";
        $rs = $conexion->getPDO()->prepare($sql);
        if ($rs->execute(array($codigo))) {
            if ($element = $rs->fetchAll(PDO::FETCH_ASSOC)) {
                foreach($element as $element){
                    $arrayCarro[] = $element;
                }
            }
        }
        echo json_encode(($arrayCarro));
    }

    function BuscarCarro($p){
        extract($p);
        $sql="SELECT * FROM carros WHERE placa_carro = ? ";
        $rs = $conexion->getPDO()->prepare($sql);
        if ($rs->execute(array($codigo))) {
            if ($element = $rs->fetchAll(PDO::FETCH_ASSOC)) {
                foreach($element as $element){
                    $arrayCarro[] = $element;
                }
            }
        }
        echo json_encode(($arrayCarro));
    }

    function editarCarro($change){
        extract($change);
        $sql="UPDATE carros SET marca_carro='$marca', modelo_carro='$modelo',tamano_carro='$tamano' WHERE placa_carro=?";
        $rs = $conexion->getPDO()->prepare($sql);
        if ($rs->execute(array($codigo))) {
            if ($element = $rs->fetchAll(PDO::FETCH_ASSOC)) {
                foreach($element as $element){
                    $arrayEditar[] = $element;
                }
            }
        }
        echo json_encode(($arrayEditar));
    }

}