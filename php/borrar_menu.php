<?php
require_once('config.php');
$conexion = obtenerConexion();

// Recoger datos de entrada
$idplato = $_POST['idplato'];

// SQL
$sql = "DELETE FROM menu WHERE idplato = $idplato;";

$resultado = mysqli_query($conexion, $sql);

// responder(datos, error, mensaje, conexion)
responder(null, false, "Datos eliminados", $conexion);