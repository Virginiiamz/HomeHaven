<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
// $input = file_get_contents("php://input");
$contrato = json_decode($_POST['contrato']);

$sql = "INSERT INTO contrato VALUES (null,  $contrato->idcliente, $contrato->idpropiedad , '$contrato->tipoventa', '$contrato->estado','$contrato->fecha');";

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
