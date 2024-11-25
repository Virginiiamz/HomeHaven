<?php
// Configuración de la base de datos
$host = 'localhost';
$dbname = 'homeheaven';
$user = 'root';
$password = 'test';

try {
    // Conexión a la base de datos
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Verificar si se recibieron datos POST
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $nombre = $_POST['nombre'];
        $direccion = $_POST['direccion'];
        $email = $_POST['email'];
        $telefono = $_POST['telefono'];

        // Insertar datos en la tabla cliente
        $stmt = $conn->prepare("INSERT INTO cliente (nombre, direccion, email, telefono) VALUES (:nombre, :direccion, :email, :telefono)");
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':direccion', $direccion);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':telefono', $telefono);
        $stmt->execute();

        // Respuesta de éxito
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => 'Método no permitido']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error al conectar con la base de datos: ' . $e->getMessage()]);
}
