<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $conexion = obtenerConexion();

    $termino = $_GET['termino'] ?? null;

    if (!$termino) {
        responder(null, true, "Término de búsqueda requerido", $conexion);
    }

    $sql = "SELECT idcliente, nombre, dni, email, telefono, direccion FROM cliente WHERE nombre LIKE ? OR dni LIKE ?";
    $stmt = $conexion->prepare($sql);
    $likeTerm = "%" . $termino . "%";
    $stmt->bind_param("ss", $likeTerm, $likeTerm);
    $stmt->execute();
    $result = $stmt->get_result();

    $clientes = $result->fetch_all(MYSQLI_ASSOC);
    responder($clientes, false, "Clientes encontrados", $conexion);
}
?>
