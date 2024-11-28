<?php
require_once('config.php');
$conexion = obtenerConexion();

// Recoger datos de entrada
$camarero = $_GET['camarero'] ?? null;

// Validar que el nombre no esté vacío
if (empty($camarero)) {
    responder(null, true, "El nombre del camarero es requerido", $conexion);
    exit();
}

// Preparar la consulta
$sql = "SELECT * FROM pedido WHERE camarero = ?";
$stmt = $conexion->prepare($sql);

if (!$stmt) {
    responder(null, true, "Error al preparar la consulta: " . $conexion->error, $conexion);
    exit();
}

$stmt->bind_param("s", $camarero);

// Ejecutar la consulta
if (!$stmt->execute()) {
    responder(null, true, "Error al ejecutar la consulta: " . $stmt->error, $conexion);
    exit();
}

$resultado = $stmt->get_result();

// Construir un array con todas las filas
$filas = [];
while ($fila = $resultado->fetch_assoc()) {
    $filas[] = $fila;
}

if (count($filas) > 0) { // Si hay datos
    responder($filas, false, "Datos recuperados", $conexion);
} else { // No hay datos
    responder(null, true, "No se encontraron pedidos para el camarero: $camarero", $conexion);
}

// Cerrar el statement y la conexión
$stmt->close();
$conexion->close();
