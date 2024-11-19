<?php
require_once('config.php');
$conexion = obtenerConexion();

// No hay datos de entrada

// SQL
$sql = "SELECT * FROM contrato;";

$resultado = mysqli_query($conexion, $sql);

while ($fila = mysqli_fetch_assoc($resultado)) {
    $datos[] = $fila; // Insertar la fila en el array
}

// parámetros: $datos, $ok, $mensaje, $conexion
responder($datos, true, "Datos recuperados", $conexion);