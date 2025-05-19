<?php
session_start();
require_once("conexion.php");

if (!isset($_SESSION["usuario_id"])) {
    echo json_encode(["success" => false, "error" => "Usuario no autenticado"]);
    exit;
}

$id = $_POST["id"];
$usuario_id = $_SESSION["usuario_id"];

$sql = "DELETE FROM transacciones WHERE id = ? AND usuario_id = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("ii", $id, $usuario_id);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => "Error al eliminar"]);
}
?>
