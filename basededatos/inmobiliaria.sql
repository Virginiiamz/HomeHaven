-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 28-11-2024 a las 12:32:42
-- Versión del servidor: 8.0.39
-- Versión de PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `inmobiliaria`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `idcliente` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `direccion` varchar(200) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefono` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`idcliente`, `nombre`, `direccion`, `email`, `telefono`) VALUES
(1, 'cliente1', 'dir cliente 1', 'cliente1@gmail.com', 123456789);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contrato`
--

CREATE TABLE `contrato` (
  `idcontrato` int NOT NULL,
  `idcliente` int NOT NULL,
  `tipoventa` enum('Compra','Venta','Alquiler') NOT NULL,
  `estado` enum('enproceso','comprado') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `contrato`
--

INSERT INTO `contrato` (`idcontrato`, `idcliente`, `tipoventa`, `estado`, `fecha`) VALUES
(1, 1, 'Venta', 'comprado', '2024-11-22'),
(2, 1, 'Compra', 'enproceso', '2024-11-28'),
(3, 1, 'Compra', 'comprado', '2024-12-01'),
(11, 1, 'Compra', 'comprado', '2024-12-26'),
(15, 1, 'Venta', 'enproceso', '2024-12-09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `propiedad`
--

CREATE TABLE `propiedad` (
  `idpropiedad` int NOT NULL,
  `direccion` varchar(200) NOT NULL,
  `precio` float NOT NULL,
  `tipovivienda` varchar(50) NOT NULL,
  `imagen` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `propiedad`
--

INSERT INTO `propiedad` (`idpropiedad`, `direccion`, `precio`, `tipovivienda`, `imagen`) VALUES
(1, 'propiedad1', 1111, 'Casa', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `propiedad_contrato`
--

CREATE TABLE `propiedad_contrato` (
  `idpropiedad` int NOT NULL,
  `idcontrato` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`idcliente`);

--
-- Indices de la tabla `contrato`
--
ALTER TABLE `contrato`
  ADD PRIMARY KEY (`idcontrato`),
  ADD KEY `idcliente` (`idcliente`);

--
-- Indices de la tabla `propiedad`
--
ALTER TABLE `propiedad`
  ADD PRIMARY KEY (`idpropiedad`);

--
-- Indices de la tabla `propiedad_contrato`
--
ALTER TABLE `propiedad_contrato`
  ADD KEY `idpropiedad` (`idpropiedad`,`idcontrato`),
  ADD KEY `idcontrato` (`idcontrato`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `idcliente` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `contrato`
--
ALTER TABLE `contrato`
  MODIFY `idcontrato` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `propiedad`
--
ALTER TABLE `propiedad`
  MODIFY `idpropiedad` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `contrato`
--
ALTER TABLE `contrato`
  ADD CONSTRAINT `contrato_ibfk_2` FOREIGN KEY (`idcliente`) REFERENCES `cliente` (`idcliente`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `propiedad_contrato`
--
ALTER TABLE `propiedad_contrato`
  ADD CONSTRAINT `fk_propiedad_contrato_contrato` FOREIGN KEY (`idcontrato`) REFERENCES `contrato` (`idcontrato`) ON DELETE CASCADE,
  ADD CONSTRAINT `propiedad_contrato_ibfk_1` FOREIGN KEY (`idcontrato`) REFERENCES `contrato` (`idcontrato`),
  ADD CONSTRAINT `propiedad_contrato_ibfk_2` FOREIGN KEY (`idpropiedad`) REFERENCES `propiedad` (`idpropiedad`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
