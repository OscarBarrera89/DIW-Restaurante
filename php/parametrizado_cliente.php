<?php
require_once('config.php');
$conexion = obtenerConexion();

    $nombre = $_GET["nombre"] ?? null;
    $email = $_GET["email"] ?? null;
    $telefono = $_GET["telefono"] ?? null;

    // Validar que los datos no estén vacíos
    if (!$nombre && !$email && !$telefono) {
        echo json_encode(value: ["ok" => false, "mensaje" => "No se enviaron criterios para buscar."]);
        exit;
    }

    
        // Construir la consulta dinámica
        $sql = "SELECT * FROM cliente WHERE 1=1";
        $params = [];

        if ($nombre) {
            $sql .= " AND nombre LIKE :nombre";
            $params[":nombre"] = "%" . $nombre . "%";
        }
        if ($email) {
            $sql .= " AND email LIKE :email";
            $params[":email"] = "%" . $email . "%";
        }
        if ($telefono) {
            $sql .= " AND telefono = :telefono";
            $params[":telefono"] = $telefono;
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
        responder(null, true, "No existe el Cliente", $conexion);
    }
    $stmt->close();
}
$conexion->close();
