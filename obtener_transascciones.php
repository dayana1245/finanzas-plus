<?php
session_start();
require_once("conexion.php");

if (!isset($_SESSION["usuario_id"])) {
    echo json_encode(["success" => false, "error" => "Usuario no autenticado"]);
    exit;
}

$usuario_id = $_SESSION["usuario_id"];
$sql = "SELECT id, descripcion, monto, tipo, fecha FROM transacciones WHERE usuario_id = ? ORDER BY fecha DESC";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("i", $usuario_id);
$stmt->execute();
$resultado = $stmt->get_result();

$transacciones = [];
while ($fila = $resultado->fetch_assoc()) {
    $transacciones[] = $fila;
}

echo json_encode(["success" => true, "data" => $transacciones]);
?>