<?php
include 'includes/config.php';
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FINANZAS PLUS 💲</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="icon" type="image/jpg" href="assets/images/favicon.jpg">
</head>
<body>
    <!-- Copia TODO el contenido de tu index.html aquí -->
    <div class="app-container">
        <div class="input-container">
            <div class="media">
                <div class="image">
                    <img src="assets/images/Finanazas_Logo.png" alt="Logo de Finanzas">
                </div>
                <div class="content">
                    <p>Bienvenido, <?php echo htmlspecialchars($_SESSION['username']); ?></p>
                </div>
            </div>
            <!-- ... resto de tu HTML original ... -->
        </div>
    </div>
    
    <script src="main.js"></script>
</body>
</html>