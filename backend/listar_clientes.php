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

    // Consulta de clientes
    $stmt = $conn->query("SELECT * FROM cliente");
    $clientes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Devolver datos como JSON
    echo json_encode($clientes);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error al conectar con la base de datos: ' . $e->getMessage()]);
}
