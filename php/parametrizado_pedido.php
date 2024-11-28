<?php
require_once('config.php');
$conexion = obtenerConexion();

error_reporting(E_ALL);
ini_set('display_errors', 1);

function responder($datos, $ok, $mensaje, $conexion) {
    $respuesta = [
        'ok' => $ok,
        'mensaje' => $mensaje,
        'datos' => $datos
    ];
    echo json_encode($respuesta);
    $conexion->close();
    exit;
}

// Recoger datos
$idcliente = $_GET["idcliente"] ?? null;
$fecha = $_GET["fecha"] ?? null;
$camarero = $_GET["camarero"] ?? null;

// Depuración
error_log("Parámetros recibidos: idcliente = $idcliente, fecha = $fecha, camarero = $camarero");

// Validar que al menos un criterio de búsqueda sea enviado
if (!$idcliente && !$fecha && !$camarero) {
    responder(null, false, "No se enviaron criterios para buscar.", $conexion);
    exit();
}

// Construir la consulta dinámica
$sql = "SELECT * FROM pedido WHERE 1=1";
$params = [];
$types = "";

if ($idcliente) {
    $sql .= " AND idcliente = ?";
    $params[] = $idcliente;
    $types .= "i";
}
if ($fecha) {
    $sql .= " AND fecha = ?";
    $params[] = $fecha;
    $types .= "s";
}
if ($camarero) {
    $sql .= " AND camarero LIKE ?";
    $params[] = "'$camarero'";
    $types .= "s";
}

// Depuración
error_log("Consulta generada: $sql");

// Preparar y ejecutar la consulta
$stmt = $conexion->prepare($sql);
if (!$stmt) {
    responder(null, false, "Error al preparar la consulta: " . $conexion->error, $conexion);
    exit();
}

if (!empty($params)) {
    $stmt->bind_param($types, ...$params);
}

if (!$stmt->execute()) {
    responder(null, false, "Error al ejecutar la consulta: " . $stmt->error, $conexion);
    exit();
}

$resultado = $stmt->get_result();

// Construir respuesta
$filas = [];
while ($fila = $resultado->fetch_assoc()) {
    $filas[] = $fila;
}

if (count($filas) > 0) {
    responder($filas, true, "Datos recuperados", $conexion);
} else {
    responder(null, false, "No se encontraron pedidos con los criterios dados.", $conexion);
}

$stmt->close();
$conexion->close();
