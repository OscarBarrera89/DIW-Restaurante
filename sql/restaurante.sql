-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 28-11-2024 a las 09:57:01
-- Versión del servidor: 8.0.40
-- Versión de PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `restaurante`
--
CREATE DATABASE IF NOT EXISTS restaurante;
USE restaurante;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `idcliente` int NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `email` varchar(40) NOT NULL,
  `telefono` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`idcliente`, `nombre`, `email`, `telefono`) VALUES
(2, 'Julian Lopez', 'jlopez@hotmail.com', 53954142),
(3, 'Elonio Musco', 'xitter@gmail.com', 23458543),
(5, 'Susana Oria', 'carotenos@orange.es', 3456789),
(6, 'Norm Brefalso', 'correoautentico@fakemail.com', 60363523),
(7, 'Dolores Fuerte De Barriga', 'ecoli@gmail.com', 53892562),
(8, 'Armando Casas', 'house@gmail.com', 345678522),
(9, 'Chris P. Bacon', 'pork@hotmail.com', 435674543),
(10, 'Joe King', 'jokin@outlook.com', 313424312),
(11, 'Paco Tilla', 'pctll@gmail.com', 123456789),
(12, 'Jovani Vazquez', 'jotauve@outlook.es', 943963578);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_pedido`
--

CREATE TABLE `detalle_pedido` (
  `iddetalle` int NOT NULL,
  `idpedido` int NOT NULL,
  `idplato` int NOT NULL,
  `cantidad` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `menu`
--

CREATE TABLE `menu` (
  `idplato` int NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `precio` double(10,2) NOT NULL,
  `alergenos` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `menu`
--

INSERT INTO `menu` (`idplato`, `nombre`, `descripcion`, `precio`, `alergenos`) VALUES
(1, 'Risotto de Setas y Parmesano', 'Cremoso risotto elaborado con setas frescas, queso parmesano rallado y un toque de trufa.', 12.50, 'gluten'),
(2, 'Tacos de Pescado Baja Style', 'Tacos suaves rellenos de pescado empanizado, repollo, crema de chipotle y pico de gallo.', 10.00, 'pescado'),
(3, 'Ensalada Mediterránea con Falafel', 'Mezcla de hojas verdes con tomate, pepino, cebolla morada, aceitunas y bolitas de falafel, acompañado de aderezo de yogur.', 8.75, 'soja'),
(4, 'Ramen de Cerdo Tonkotsu', 'Caldo concentrado de cerdo, noodles, huevo marinado, alga nori, y carne de cerdo asado.', 14.00, 'huevos'),
(5, 'Ceviche de Camarones', 'Camarones marinados en jugo de limón, acompañados de cebolla morada, cilantro, aguacate y chiles frescos.', 13.50, 'moluscos'),
(6, 'Pizza Margarita Artesanal', 'Base de masa delgada, salsa de tomate natural, mozzarella fresca y albahaca.', 9.50, 'gluten'),
(7, 'Pollo al Curry con Arroz Jazmín', 'Pollo tierno cocinado en una mezcla de especias y leche de coco, servido con arroz aromático.', 11.75, 'lacteos'),
(8, 'Hamburguesa Vegetariana de Quinoa', 'Hamburguesa de quinoa y espinaca en pan integral, con aguacate, lechuga y tomate.', 10.00, 'soja'),
(9, 'Paella Mixta', 'Arroz con azafrán, pollo, mariscos y verduras frescas, preparado al estilo tradicional español.', 16.00, 'moluscos'),
(10, 'Brownie de Chocolate con Helado', 'Brownie tibio de chocolate oscuro servido con helado de vainilla y salsa de caramelo.', 6.50, 'gluten');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `idpedido` int NOT NULL,
  `idcliente` int NOT NULL,
  `fecha` date NOT NULL,
  `camarero` varchar(30) NOT NULL,
  `total` double(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`idpedido`, `idcliente`, `fecha`, `camarero`, `total`) VALUES
(1, 2, '2024-11-29', 'camarero', 8.00),
(2, 3, '2024-11-29', 'camarero2', 8.20),
(3, 2, '2024-11-29', 'Pedro', 10.20),
(4, 3, '2024-11-29', 'Pedro', 12.99),
(5, 5, '2024-11-28', 'Jose', 3.27),
(6, 6, '2024-12-07', 'Julian', 5.27),
(7, 7, '2024-11-30', 'Ana', 6.55),
(8, 8, '2024-12-01', 'Jose', 8.22),
(9, 9, '2024-12-25', 'Paco', 12.60),
(10, 10, '2025-02-19', 'Ana', 8.99),
(11, 11, '2027-02-24', 'Paco', 100.86),
(12, 12, '2025-01-28', 'Jhon', 7.24);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`idcliente`);

--
-- Indices de la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD PRIMARY KEY (`iddetalle`),
  ADD KEY `idpedido` (`idpedido`),
  ADD KEY `idplato` (`idplato`);

--
-- Indices de la tabla `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`idplato`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`idpedido`),
  ADD KEY `FK_cliente` (`idcliente`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `idcliente` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  MODIFY `iddetalle` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `menu`
--
ALTER TABLE `menu`
  MODIFY `idplato` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `idpedido` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD CONSTRAINT `detalle_pedido_ibfk_1` FOREIGN KEY (`idpedido`) REFERENCES `pedido` (`idpedido`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detalle_pedido_ibfk_2` FOREIGN KEY (`idplato`) REFERENCES `menu` (`idplato`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `FK_cliente` FOREIGN KEY (`idcliente`) REFERENCES `cliente` (`idcliente`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
