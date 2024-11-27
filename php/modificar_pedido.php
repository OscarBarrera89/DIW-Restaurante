<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos y validar que se envíen correctamente
if (!isset($_POST['pedido'])) {
    responder(null, true, "No se ha recibido ningún dato de pedido", $conexion);
    exit;
}

$pedido = json_decode($_POST['pedido'], true);

if (!$pedido || !isset($pedido['idpedido'], $pedido['idcliente'], $pedido['fecha'], $pedido['camarero'], $pedido['total'])) {
    responder(null, true, "Datos incompletos o incorrectos para actualizar el pedido", $conexion);
    exit;
}

// Preparar la consulta segura
$sql = "UPDATE pedido 
        SET idcliente = ?, fecha = ?, camarero = ?, total = ? 
        WHERE idpedido = ?";
$stmt = $conexion->prepare($sql);

if (!$stmt) {
    responder(null, true, "Error al preparar la consulta: " . $conexion->error, $conexion);
    exit;
}

$stmt->bind_param(
    "issdi",
    $pedido['idcliente'],
    $pedido['fecha'],
    $pedido['camarero'],
    $pedido['total'],
    $pedido['idpedido']
);

if ($stmt->execute()) {
    responder(null, false, "El pedido se ha modificado correctamente", $conexion);
} else {
    responder(null, true, "Error al ejecutar la consulta: " . $stmt->error, $conexion);
}

$stmt->close();
$conexion->close();

