<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
$menu = json_decode($_POST['menu']);

$sql = "UPDATE menu SET nombre = '$menu->nombre', descripcion = '$menu->descripcion', precio = $menu->precio, alergenos = '$menu->alergenos' WHERE idplato = $menu->idplato";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);
} else {
    // Prototipo responder($datos,$error,$mensaje,$conexion)
    responder(null, false, "Se ha modificado el menu", $conexion);
}

