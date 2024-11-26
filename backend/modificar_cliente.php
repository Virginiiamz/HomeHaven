<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $conexion = obtenerConexion();

    $idcliente = $_POST['idcliente'] ?? null;
    $nombre = $_POST['nombre'] ?? null;
    $dni = $_POST['dni'] ?? null;
    $email = $_POST['email'] ?? null;
    $telefono = $_POST['telefono'] ?? null;
    $direccion = $_POST['direccion'] ?? null;

    if (!$idcliente || !$nombre || !$dni || !$email || !$telefono || !$direccion) {
        responder(null, true, "Todos los campos son obligatorios", $conexion);
    }

    $sql = "UPDATE cliente SET nombre = ?, dni = ?, email = ?, telefono = ?, direccion = ? WHERE idcliente = ?";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("sssisi", $nombre, $dni, $email, $telefono, $direccion, $idcliente);

    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            responder(null, false, "Cliente actualizado con éxito", $conexion);
        } else {
            responder(null, true, "No se realizaron cambios o cliente no encontrado", $conexion);
        }
    } else {
        responder(null, true, "Error al actualizar cliente: " . $conexion->error, $conexion);
    }
}
?>
