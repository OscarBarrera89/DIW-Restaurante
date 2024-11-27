<?php
require_once('config.php');
$conexion = obtenerConexion();

// Recoger datos de entrada
$idpedido = $_POST['idpedido'];

// SQL
$sql = "DELETE FROM pedido WHERE idpedido = $idpedido;";

$resultado = mysqli_query($conexion, $sql);

// responder(datos, error, mensaje, conexion)
responder(null, false, "Datos eliminados", $conexion);