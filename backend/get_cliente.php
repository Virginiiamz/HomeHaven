<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $conexion = obtenerConexion();

    $idcliente = $_GET['idcliente'] ?? null;

    if (!$idcliente) {
        responder(null, true, "ID de cliente requerido", $conexion);
    }

    $sql = "SELECT idcliente, nombre, dni, email, telefono, direccion FROM cliente WHERE idcliente = ?";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("i", $idcliente);
    $stmt->execute();
    $result = $stmt->get_result();

    $cliente = $result->fetch_assoc();
    if ($cliente) {
        responder($cliente, false, "Cliente encontrado", $conexion);
    } else {
        responder(null, true, "Cliente no encontrado", $conexion);
    }
}
?>
