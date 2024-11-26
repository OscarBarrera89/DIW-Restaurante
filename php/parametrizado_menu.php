<?php
require_once('config.php');
$conexion = obtenerConexion();

$nombre = $_GET["nombre"] ?? null;
$descripcion = $_GET["descripcion"] ?? null;
$alergenos = $_GET["alergenos"] ?? null;

// Validar que los datos no estén vacíos
if (!$nombre && !$descripcion && !$precio && !$alergenos) {
    echo json_encode(["ok" => false, "mensaje" => "No se enviaron criterios para buscar."]);
    exit;
}
$sql = "SELECT * FROM menu WHERE 1=1";
$params = [];
$types = "";

if ($nombre) {
    $sql .= " AND nombre = ?";
    $params[] = $nombre;
    $types .= "s";
}
if ($descripcion) {
    $sql .= " AND descripcion = ?";
    $params[] = $descripcion;
    $types .= "s";
}
if ($alergenos) {
    $sql .= " AND alergenos = ?";
    $params[] = $alergenos;
    $types .= "s";
}

$stmt = $conexion->prepare($sql);
if ($stmt) {
    if (!empty($params)) {
        $stmt->bind_param($types, ...$params);
    }
    $stmt->execute();
    $resultado = $stmt->get_result();

    $filas = [];
    while ($fila = $resultado->fetch_assoc()) {
        $filas[] = $fila;
    }

    if (count($filas) > 0) {
        responder($filas, false, "Datos recuperados", $conexion);
    } else {
        responder(null, true, "No existe el plato", $conexion);
    }
    $stmt->close();
}
$conexion->close();