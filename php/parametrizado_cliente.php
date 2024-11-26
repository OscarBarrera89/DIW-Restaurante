<?php
require_once('config.php');
$conexion = obtenerConexion();

    $nombre = $_POST["nombre"] ?? null;
    $email = $_POST["email"] ?? null;
    $telefono = $_POST["telefono"] ?? null;

    // Validar que los datos no estén vacíos
    if (!$nombre && !$email && !$telefono) {
        echo json_encode(value: ["ok" => false, "mensaje" => "No se enviaron criterios para buscar."]);
        exit;
    }

    try {
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

        // Preparar y ejecutar la consulta
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);

        // Obtener los resultados
        $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (count($resultados) > 0) {
            echo json_encode(["ok" => true, "datos" => $resultados]);
        } else {
            echo json_encode(["ok" => false, "mensaje" => "No se encontraron resultados."]);
        }
    } catch (PDOException $e) {
        echo json_encode(["ok" => false, "mensaje" => "Error al ejecutar la consulta: " . $e->getMessage()]);
    }
