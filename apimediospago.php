<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'config.php';

$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($conn->connect_error) {
    die(json_encode(['error' => 'Falló la conexión a la base de datos']));
}

$sql = "SELECT IdMediopago, mediopago, descripcion
        FROM mediospago
        ORDER BY IdMediopago";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $mediospago = [];
    while($row = $result->fetch_assoc()) {
        $mediospago[] = $row;
    }
    echo json_encode(['mediospago' => $mediospago]);
} else {
    echo json_encode(['error' => 'No se encontraron medios de pago']);
}

$conn->close();
?>