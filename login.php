<?php include 'includes/config.php'; ?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Login | Finanzas PLUS</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="icon" type="image/jpg" href="assets/images/favicon.jpg">
</head>
<body>
    <div class="login-container">
        <img src="assets/images/Finanazas_Logo.png" alt="Logo" width="120" style="display:block; margin:0 auto 20px;">
        <h2>FINANZAS PLUS 💲</h2>
        <?php if (isset($_GET['error'])): ?>
            <p style="color:red; text-align:center;">Credenciales incorrectas</p>
        <?php endif; ?>
        <form method="POST" action="auth.php">
            <input type="text" name="username" placeholder="Usuario" required>
            <input type="password" name="password" placeholder="Contraseña" required>
            <button type="submit">Ingresar</button>
        </form>
    </div>
</body>
</html>