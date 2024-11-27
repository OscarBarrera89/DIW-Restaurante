<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
// $input = file_get_contents("php://input");
$pedido = json_decode($_POST['pedido']);

$sql = "INSERT INTO menu (idpedido, idcliente, fecha, camarero, total) VALUES (null, '$pedido->idcliente' , '$pedido->fecha', $pedido->camarero, '$pedido->total');";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, false, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);
} else {
    // Prototipo responder($datos,$ok,$mensaje,$conexion)
    responder(null, true, "Se ha dado de alta al pedido", $conexion);
}
