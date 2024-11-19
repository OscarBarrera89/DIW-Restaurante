<?php
require_once('config.php');
$conexion = obtenerConexion();

// Recoger datos de entrada
$nombre = $_POST['nombre'];

// SQL
$sql = "SELECT * FROM cliente WHERE nombre = $nombre";

$resultado = mysqli_query($conexion, $sql);

// Pedir una fila
$fila = mysqli_fetch_assoc($resultado);

if ($fila) { // Devuelve datos
    // responder(datos, error, mensaje, conexion)
    responder($fila, false, "Datos recuperados", $conexion);
} else { // No hay datos
    responder(null, true, "No existe la propiedad", $conexion);
}
