

    CREATE TABLE `usuarios` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `correo` varchar(100) NOT NULL,
 `clave` varchar(255) NOT NULL,
 PRIMARY KEY (`id`),
 UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci