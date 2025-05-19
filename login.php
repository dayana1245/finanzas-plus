<?php
session_start();
require_once("conexion.php");

$correo = $_POST["correo"];
$clave = $_POST["clave"];

$sql = "SELECT * FROM usuarios WHERE correo = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("s", $correo);
$stmt->execute();
$resultado = $stmt->get_result();

if ($usuario = $resultado->fetch_assoc()) {
    if (password_verify($clave, $usuario["clave"])) {
        $_SESSION["usuario_id"] = $usuario["id"];
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => "Contraseña incorrecta"]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Usuario no encontrado"]);
}
?>