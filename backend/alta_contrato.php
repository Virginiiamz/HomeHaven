<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
// $input = file_get_contents("php://input");
$contrato = json_decode($_POST['contrato']);

$sql = "INSERT INTO contrato (idcontrato, idpropiedad, idcliente, tipoventa, fecha, estado) VALUES (null, '$contrato->idpropiedad' , $contrato->idcliente, '$contrato->tipoventa', '$contrato->fecha', '$contrato->estado');";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);
    // responder(null, true, "", $conexion);
} else {
    // Prototipo responder($datos,$error,$mensaje,$conexion)
    responder(null, false, "Se ha dado de alta a la contrato", $conexion);
}
