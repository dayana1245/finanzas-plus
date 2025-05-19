<?php
session_start();
require_once("conexion.php");

if (!isset($_SESSION["usuario_id"])) {
    echo json_encode(["success" => false, "error" => "Usuario no autenticado"]);
    exit;
}

$descripcion = $_POST["descripcion"];
$monto = $_POST["monto"];
$tipo = $_POST["tipo"];
$usuario_id = $_SESSION["usuario_id"];

$sql = "INSERT INTO transacciones (usuario_id, descripcion, monto, tipo) VALUES (?, ?, ?, ?)";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("isds", $usuario_id, $descripcion, $monto, $tipo);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => "Error al guardar"]);
}
?>
