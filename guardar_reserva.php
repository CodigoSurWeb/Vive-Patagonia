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

$datos = json_decode(file_get_contents("php://input"), true);

if (!$datos) {
    echo json_encode(["success" => false, "message" => "Datos inválidos"]);
    exit;
}

$nombre = $conn->real_escape_string($datos['nombre']);
$email = $conn->real_escape_string($datos['email']);
$telefono = $conn->real_escape_string($datos['telefono']);
$vuelo = $conn->real_escape_string($datos['vuelo']);
$fecha = $conn->real_escape_string($datos['fecha']);
$personas = (int)$datos['personas'];
$servicios = $conn->real_escape_string($datos['servicios']);
$pago = $conn->real_escape_string($datos['pago']);
$notas = $conn->real_escape_string($datos['notas']);
$estado = 'PE';
$ImporteServicio = (int)$datos['ImporteServicio'];

$sql = "INSERT INTO reservas (nombre, correo, telefono, vuelo, fecha, pax, servicio, mediopago, notas, estado, ImporteServicio) 
        VALUES ('$nombre', '$email', '$telefono', '$vuelo', '$fecha', $personas, '$servicios', '$pago', '$notas', '$estado', '$ImporteServicio')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Reserva registrada con éxito"]);
} else {
    echo json_encode(["success" => false, "message" => "Error al registrar la reserva: " . $conn->error]);
}

$conn->close();
?>
