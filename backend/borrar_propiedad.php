<?php
require_once('config.php');
$conexion = obtenerConexion();

// Recoger datos de entrada
$idpropiedad = $_POST['idpropiedad'];

// SQL
$sql = "DELETE FROM propiedad WHERE idpropiedad = $idpropiedad;";

$resultado = mysqli_query($conexion, $sql);

// responder(datos, error, mensaje, conexion)
responder(null, false, "Datos eliminados", $conexion);
