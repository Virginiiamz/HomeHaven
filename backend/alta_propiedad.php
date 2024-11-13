<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
// $input = file_get_contents("php://input");
$propiedad = json_decode($_POST['propiedad']);

$sql = "INSERT INTO propiedad (idpropiedad, direccion, precio, tipovivienda, imagen) VALUES (null, '$propiedad->direccion' , $propiedad->precio, '$propiedad->tipovivienda', '$propiedad->imagen');";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);
    // responder(null, true, "", $conexion);
} else {
    // Prototipo responder($datos,$error,$mensaje,$conexion)
    responder(null, false, "Se ha dado de alta a la propiedad", $conexion);
}
