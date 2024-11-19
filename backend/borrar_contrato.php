<?php
require_once('config.php');
$conexion = obtenerConexion();

// Recoger datos de entrada
$idcontrato = $_POST['idcontrato'];

// SQL
$sql = "DELETE FROM contrato WHERE idcontrato = $idcontrato;";

$resultado = mysqli_query($conexion, $sql);

// responder(datos, error, mensaje, conexion)
responder(null, false, "Datos eliminados", $conexion);
