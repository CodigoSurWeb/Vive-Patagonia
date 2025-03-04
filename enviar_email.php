<?php

//require 'PHPMailer/src/PHPMailer.php';
//require 'PHPMailer/src/SMTP.php';
//require 'PHPMailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'vendor/autoload.php'; // Asegúrate de que PHPMailer está instalado

// Recibir datos JSON del request
$data = json_decode(file_get_contents("php://input"), true);

// Validar que los datos requeridos estén presentes
if (!isset($data['destinatario'], $data['remitente'], $data['asunto'], $data['mensaje'])) {
    echo json_encode(["success" => false, "error" => "Faltan datos en la solicitud"]);
    exit;
}

$destinatario = 'reservas@vivepatagonia.com.ar'; // Vpatagonia@20250101
$remitente = 'remitentes@vivepatagonia.com.ar'; // Vpatagonia@28022601
$asunto = 'Nueva reserva en Vive Patagonia';
$mensaje = $data['mensaje'];

$mail = new PHPMailer(true);

try {
    // Configuración del servidor SMTP
    $mail->isSMTP();
    $mail->Host       = 'c2720886.ferozo.com'; // Reemplaza con el servidor SMTP real
    $mail->SMTPAuth   = true;
    $mail->Username   = 'remitentes@vivepatagonia.com.ar'; // Tu cuenta de email
    $mail->Password   = 'Vpatagonia@28022601'; // La contraseña del email Vpatagonia@28022601
    $mail->SMTPSecure = 'ssl' // PHPMailer::ENCRYPTION_STARTTLS; // TLS o SSL si el servidor lo requiere
    $mail->Port       = 465; // Puerto SMTP (puede ser 465 para SSL o 587 para TLS)

    // Configurar el email
    $mail->setFrom($remitente, 'Vive Patagonia Reservas');
    $mail->addAddress($destinatario);
    $mail->Subject = $asunto;
    $mail->isHTML(true);
    $mail->Body = $mensaje;

    // Enviar email
    $mail->send();
    
    echo json_encode(["success" => true]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "error" => $mail->ErrorInfo]);
}
?>
