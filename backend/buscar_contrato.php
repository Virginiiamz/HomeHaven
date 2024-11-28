<?php
require_once('config.php');
$conexion = obtenerConexion();

// Recoger datos de entrada
$idpropiedad = $_POST['idpropiedad'];

// SQL
// $sql = "SELECT * FROM propiedad_contrato WHERE idpropiedad = $idpropiedad";

$sql = "SELECT * FROM contrato WHERE idcontrato = (SELECT idcontrato FROM propiedad_contrato WHERE idpropiedad = $idpropiedad);";

$resultado = mysqli_query($conexion, $sql);

// Pedir una fila
$fila = mysqli_fetch_assoc($resultado);

if ($fila) { // Devuelve datos
    // responder(datos, error, mensaje, conexion)
    responder($fila, false, "Datos recuperados", $conexion);
} else { // No hay datos
    responder(null, true, "No existe la propiedad", $conexion);
}
