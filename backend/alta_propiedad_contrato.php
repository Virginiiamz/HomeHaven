<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
// $input = file_get_contents("php://input");
$contrato = json_decode($_POST['propiedadcontrato']);

$sql1 = "INSERT INTO propiedad_contrato VALUES ($contrato->idpropiedad, (SELECT idcontrato FROM contrato WHERE idcliente = $contrato->idcliente AND fecha = '$contrato->fecha'));";


mysqli_query($conexion, $sql1);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);
    // responder(null, true, "", $conexion);
} else {
    // Prototipo responder($datos,$error,$mensaje,$conexion)
    responder(null, false, "Se ha dado de alta a la contrato", $conexion);
}

// $sql1=  "INSERT INTO propiedad_contrato VALUES ($contrato->idpropiedad, $contrato->idcontrato);";
