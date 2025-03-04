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

$sql = "SELECT IdServicio, servicio, costo, descripcion, descripcioni
        FROM servicios where vigente=1
        ORDER BY servicio";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $servicios = [];
    while($row = $result->fetch_assoc()) {
        $servicios[] = $row;
    }
    echo json_encode(['servicios' => $servicios]);
} else {
    echo json_encode(['error' => 'No se encontraron servicios']);
}

$conn->close();
?>