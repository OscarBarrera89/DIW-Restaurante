<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
$cliente = json_decode($_POST['cliente']);

$sql = "UPDATE cliente SET nombre = '$cliente->nombre', email = $cliente->email, telefono = '$cliente->telefono' WHERE idcliente = $cliente->idcliente ";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);
} else {
    // Prototipo responder($datos,$error,$mensaje,$conexion)
    responder(null, false, "Se ha modificado el cliente", $conexion);
}

