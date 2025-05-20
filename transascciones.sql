USE DATABASE 'finanzas'	

CREATE TABLE `transacciones` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `usuario_id` int(11) NOT NULL,
 `descripcion` varchar(255) DEFAULT NULL,
 `monto` decimal(10,2) DEFAULT NULL,
 `tipo` enum('Ingresos','Gastos') DEFAULT NULL,
 `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
 PRIMARY KEY (`id`),
 KEY `usuario_id` (`usuario_id`),
 CONSTRAINT `transacciones_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci