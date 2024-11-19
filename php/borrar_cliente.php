<?php
require_once('config.php');
$conexion = obtenerConexion();

// Recoger datos de entrada
$idcliente = $_POST['idcliente'];

// SQL
$sql = "DELETE FROM cliente WHERE idcliente = $idcliente;";

$resultado = mysqli_query($conexion, $sql);

// responder(datos, error, mensaje, conexion)
responder(null, false, "Datos eliminados", $conexion);