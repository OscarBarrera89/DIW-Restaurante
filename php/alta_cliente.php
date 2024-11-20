<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
// $input = file_get_contents("php://input");
$cliente = json_decode($_POST['cliente']);

$sql = "INSERT INTO cliente (idcliente, nombre, email, telefono) VALUES (null, '$cliente->nombre' , '$cliente->email', $cliente->telefono);";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, false, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);
} else {
    // Prototipo responder($datos,$ok,$mensaje,$conexion)
    responder(null, true, "Se ha dado de alta al cliente", $conexion);
}
