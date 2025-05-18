<?php
header('Content-Type: application/json');
include '../includes/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Obtener transacciones
    $user_id = intval($_GET['user_id']);
    $stmt = $conn->prepare("SELECT * FROM transacciones WHERE usuario_id = ? ORDER BY id DESC");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $transactions = [];
    while ($row = $result->fetch_assoc()) {
        $transactions[] = $row;
    }
    echo json_encode($transactions);
} 
elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Guardar transacción
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $conn->prepare("INSERT INTO transacciones (usuario_id, description, amount, type) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("isds", $data['user_id'], $data['description'], $data['amount'], $data['type']);
    $stmt->execute();
    
    echo json_encode(['success' => true, 'id' => $stmt->insert_id]);
}
?>