<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $conexion = obtenerConexion();

    $idcliente = $_POST['idcliente'] ?? null;

    if (!$idcliente) {
        responder(null, true, "ID de cliente requerido", $conexion);
    }

    $sql = "DELETE FROM cliente WHERE idcliente = ?";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("i", $idcliente);

    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            responder(null, false, "Cliente eliminado correctamente", $conexion);
        } else {
            responder(null, true, "Cliente no encontrado", $conexion);
        }
    } else {
        responder(null, true, "Error al eliminar cliente: " . $conexion->error, $conexion);
    }
}
?>
