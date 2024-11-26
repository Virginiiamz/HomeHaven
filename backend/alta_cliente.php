<?php
require_once 'config.php'; // Archivo base

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $conexion = obtenerConexion();

    // Capturar datos enviados
    $nombre = $_POST['nombre'] ?? null;
    $dni = $_POST['dni'] ?? null;
    $email = $_POST['email'] ?? null;
    $telefono = $_POST['telefono'] ?? null;
    $direccion = $_POST['direccion'] ?? null;

    // Validación básica
    if (!$nombre || !$dni || !$email || !$telefono || !$direccion) {
        responder(null, true, "Todos los campos son obligatorios", $conexion);
    }

    $sql = "INSERT INTO cliente (nombre, dni, email, telefono, direccion) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("sssis", $nombre, $dni, $email, $telefono, $direccion);

    if ($stmt->execute()) {
        responder(["idcliente" => $stmt->insert_id], false, "Cliente registrado con éxito", $conexion);
    } else {
        responder(null, true, "Error al registrar cliente: " . $conexion->error, $conexion);
    }
}
?>
