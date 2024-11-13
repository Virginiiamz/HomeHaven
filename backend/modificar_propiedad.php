<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
$propiedad = json_decode($_POST['propiedad']);

$sql = "UPDATE propiedad SET direccion = '$propiedad->direccion', precio = $propiedad->precio, tipovivienda = '$propiedad->tipovivienda', imagen = '$propiedad->imagen' WHERE idpropiedad = $propiedad->idpropiedad ";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);
} else {
    // Prototipo responder($datos,$error,$mensaje,$conexion)
    responder(null, false, "Se ha modificado la propiedad", $conexion);
}
