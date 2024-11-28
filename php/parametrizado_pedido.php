<?php
require_once('config.php');
$conexion = obtenerConexion();

// Recoger datos
$idcliente = $_GET["idcliente"] ?? null;
$fecha = $_GET["fecha"] ?? null;
$camarero = $_GET["camarero"] ?? null;

// Validar que al menos un criterio de búsqueda sea enviado
if (!$idcliente && !$fecha && !$camarero) {
    echo json_encode(["ok" => false, "mensaje" => "No se enviaron criterios para buscar."]);
    exit;
}

// Construir la consulta dinámica
$sql = "SELECT * FROM pedido WHERE 1=1";
$params = [];
$types = "";

if ($idcliente) {
    $sql .= " AND idcliente = ?";
    $params[] = $idcliente;
    $types .= "i"; // 'i' para integer
}
if ($fecha) {
    // Asegúrate de que la fecha esté en el formato correcto
    $fecha = date('Y-m-d', strtotime($fecha));
    $sql .= " AND fecha = ?";
    $params[] = $fecha;
    $types .= "s"; // 's' para string, ya que date() devuelve un string en formato correcto
}

if ($camarero) {
    $sql .= " AND camarero LIKE ?";
    $params[] = "%$camarero%"; // Búsqueda parcial
    $types .= "s";
}

$stmt = $conexion->prepare($sql);
if (!$stmt) {
    responder(null, false, "Error al preparar la consulta: " . $conexion->error, $conexion);
}

if (!empty($params)) {
    $stmt->bind_param($types, ...$params);
}

$stmt->execute();
$resultado = $stmt->get_result();

$filas = [];
while ($fila = $resultado->fetch_assoc()) {
    $filas[] = $fila;
}

echo "Filas encontradas: ";
print_r($filas); // Línea de depuración

if (count($filas) > 0) {
    responder($filas, true, "Datos recuperados", $conexion);
} else {
    responder(null, false, "No se encontraron pedidos con los criterios dados", $conexion);
}


$stmt->close();
$conexion->close();
