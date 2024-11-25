<?php
require_once('config.php');
$conexion = obtenerConexion();

// Recoger datos de entrada
$nombre = $_POST['nombre'];

// Validar que el nombre no esté vacío
if (empty($nombre)) {
    responder(null, true, "El nombre es requerido", $conexion);
    exit();
}

// Preparar la consulta
$sql = "SELECT * FROM menu WHERE nombre = ?";
$stmt = $conexion->prepare($sql);

if (!$stmt) {
    responder(null, true, "Error al preparar la consulta: " . $conexion->error, $conexion);
    exit();
}

$stmt->bind_param("s", $nombre); // stmt es un atributo de php que con bind_param se asegura que ese atributo es un string para integer double o bin es i, d, b

// Ejecutar la consulta
if (!$stmt->execute()) {
    responder(null, true, "Error al ejecutar la consulta: " . $stmt->error, $conexion);
    exit();
}

$resultado = $stmt->get_result();

// Pedir una fila
$fila = $resultado->fetch_assoc();

if ($fila) { // Devuelve datos
    responder($fila, false, "Datos recuperados", $conexion);
} else { // No hay datos
    responder(null, true, "No existe el plato", $conexion);
}

// Cerrar el statement y la conexión
$stmt->close();
$conexion->close();
