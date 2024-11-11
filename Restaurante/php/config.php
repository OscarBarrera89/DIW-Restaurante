<?php 
function obtenerConexion() {
    // Establecer conexión y opciones de mysql
    // Errores mysql sin excepciones
    mysqli_report(MYSQLI_REPORT_OFF);

    // Importante, ajustar los siguientes parámetros
    $conexion = new mysqli("localhost", "root", "test", "restaurante","8000");
    // $conexion = mysqli_connect('db', 'root', 'test', "dbname");
    mysqli_set_charset($conexion, 'utf8');

    if ($conexion->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }
    echo "Conectado con éxito";

    return $conexion;
}