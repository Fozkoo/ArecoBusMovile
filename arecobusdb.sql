-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-08-2024 a las 21:31:56
-- Versión del servidor: 9.0.0
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `arecobusdb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bus`
--

CREATE TABLE `bus` (
  `idbus` int NOT NULL,
  `numero_linea` int NOT NULL,
  `destino` varchar(45) DEFAULT NULL,
  `empresa_idempresa` int NOT NULL,
  `precio` int DEFAULT NULL,
  `origen` varchar(45) DEFAULT NULL,
  `punto_partida` varchar(45) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `path` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `bus`
--

INSERT INTO `bus` (`idbus`, `numero_linea`, `destino`, `empresa_idempresa`, `precio`, `origen`, `punto_partida`, `image`, `path`) VALUES
(3, 350, 'Pilar', 3, 980, 'San Antonio de Areco', 'AV Smith 299', 'https://i.ibb.co/Hnk6xcq/rutabus.jpg', 'RutabusAP'),
(4, 500, 'Giles', 4, 2400, 'San Antonio de Areco', 'AV Smith 233', 'https://i.ibb.co/qMxsf0d/masterbus.jpg', 'MasterbusAG'),
(5, 111, 'Duggan', 5, 1000, 'San Antonio de Areco', 'AV Smith 299', 'https://i.ibb.co/V9cbjXX/ricardito-dugan.jpg', 'RicarditoAD'),
(6, 112, 'Villa Lia', 5, 1100, 'San Antonio de Areco', 'AV Smith 299', 'https://i.ibb.co/VJsLpNq/ricardito-villa-lia.jpg', 'RicarditoAV');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bus_has_horarios`
--

CREATE TABLE `bus_has_horarios` (
  `bus_idbus` int NOT NULL,
  `horarios_idhorarios` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `bus_has_horarios`
--

INSERT INTO `bus_has_horarios` (`bus_idbus`, `horarios_idhorarios`) VALUES
(3, 1),
(5, 1),
(3, 2),
(3, 4),
(3, 5),
(3, 6),
(3, 7),
(3, 8),
(3, 9),
(3, 10),
(3, 11),
(3, 12),
(3, 13),
(3, 14),
(3, 15),
(3, 16),
(6, 16),
(3, 17),
(4, 18),
(4, 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dias_semana`
--

CREATE TABLE `dias_semana` (
  `iddias_semana` int NOT NULL,
  `nombre` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `dias_semana`
--

INSERT INTO `dias_semana` (`iddias_semana`, `nombre`) VALUES
(1, 'lunes'),
(2, 'martes'),
(3, 'miercoles'),
(4, 'jueves'),
(5, 'viernes'),
(6, 'sabado'),
(7, 'domingo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dias_semana_has_horarios`
--

CREATE TABLE `dias_semana_has_horarios` (
  `dias_semana_iddias_semana` int NOT NULL,
  `horarios_idhorarios` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `dias_semana_has_horarios`
--

INSERT INTO `dias_semana_has_horarios` (`dias_semana_iddias_semana`, `horarios_idhorarios`) VALUES
(1, 1),
(2, 1),
(1, 2),
(2, 2),
(1, 5),
(2, 5),
(1, 6),
(2, 6),
(1, 7),
(2, 7),
(1, 8),
(2, 8),
(1, 9),
(2, 9),
(1, 10),
(2, 10),
(1, 11),
(2, 11),
(1, 12),
(2, 12),
(1, 13),
(2, 13),
(1, 14),
(2, 14),
(1, 15),
(2, 15),
(7, 16),
(7, 17),
(1, 18),
(1, 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresa`
--

CREATE TABLE `empresa` (
  `idempresa` int NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `telefono` varchar(45) NOT NULL,
  `ubicacion` varchar(45) NOT NULL,
  `direccion` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `empresa`
--

INSERT INTO `empresa` (`idempresa`, `nombre`, `email`, `telefono`, `ubicacion`, `direccion`) VALUES
(3, 'Rutabus', 'rutabus@gmail.com', '2323232', 'pilar', 'pilar 222'),
(4, 'Masterbus', 'masterbus@gmail.com', '111111', 'giles', 'giles 333'),
(5, 'Ricardito', 'ricardito@gmail.com', '11443532', 'areco', 'areco 555');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horarios`
--

CREATE TABLE `horarios` (
  `idhorarios` int NOT NULL,
  `horario` time NOT NULL,
  `destino` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `horarios`
--

INSERT INTO `horarios` (`idhorarios`, `horario`, `destino`) VALUES
(1, '05:25:00', 'pilar - 05:25'),
(2, '06:25:00', 'pilar 06:25'),
(3, '06:10:00', 'giles - 06:10'),
(4, '07:05:00', 'giles - 07:05'),
(5, '08:25:00', 'pilar - 08:25'),
(6, '09:25:00', 'pilar - 09:25'),
(7, '10:25:00', 'pilar - 10:25'),
(8, '11:25:00', 'pilar - 11:25'),
(9, '12:25:00', 'pilar - 12:25'),
(10, '13:25:00', 'pilar - 13:25'),
(11, '14:25:00', 'pilar - 14:25'),
(12, '15:25:00', 'pilar -15:25'),
(13, '16:25:00', 'pilar 16:25'),
(14, '17:25:00', 'pilar 17:25'),
(15, '07:25:00', 'pilar - 07:25'),
(16, '05:40:00', 'pilar - 05:40'),
(17, '06:40:00', 'pilar - 06:40'),
(18, '08:43:00', 'Mercedes 8:43'),
(19, '10:40:00', 'Mercedes 10:40'),
(20, '17:40:00', 'Mercedes 17:40');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bus`
--
ALTER TABLE `bus`
  ADD PRIMARY KEY (`idbus`),
  ADD KEY `fk_bus_empresa_idx` (`empresa_idempresa`);

--
-- Indices de la tabla `bus_has_horarios`
--
ALTER TABLE `bus_has_horarios`
  ADD PRIMARY KEY (`bus_idbus`,`horarios_idhorarios`),
  ADD KEY `fk_bus_has_horarios_horarios1_idx` (`horarios_idhorarios`),
  ADD KEY `fk_bus_has_horarios_bus1_idx` (`bus_idbus`);

--
-- Indices de la tabla `dias_semana`
--
ALTER TABLE `dias_semana`
  ADD PRIMARY KEY (`iddias_semana`);

--
-- Indices de la tabla `dias_semana_has_horarios`
--
ALTER TABLE `dias_semana_has_horarios`
  ADD PRIMARY KEY (`dias_semana_iddias_semana`,`horarios_idhorarios`),
  ADD KEY `fk_dias_semana_has_horarios_horarios1_idx` (`horarios_idhorarios`),
  ADD KEY `fk_dias_semana_has_horarios_dias_semana1_idx` (`dias_semana_iddias_semana`);

--
-- Indices de la tabla `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`idempresa`);

--
-- Indices de la tabla `horarios`
--
ALTER TABLE `horarios`
  ADD PRIMARY KEY (`idhorarios`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bus`
--
ALTER TABLE `bus`
  MODIFY `idbus` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `dias_semana`
--
ALTER TABLE `dias_semana`
  MODIFY `iddias_semana` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `empresa`
--
ALTER TABLE `empresa`
  MODIFY `idempresa` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `horarios`
--
ALTER TABLE `horarios`
  MODIFY `idhorarios` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `bus`
--
ALTER TABLE `bus`
  ADD CONSTRAINT `fk_bus_empresa` FOREIGN KEY (`empresa_idempresa`) REFERENCES `empresa` (`idempresa`);

--
-- Filtros para la tabla `bus_has_horarios`
--
ALTER TABLE `bus_has_horarios`
  ADD CONSTRAINT `fk_bus_has_horarios_bus1` FOREIGN KEY (`bus_idbus`) REFERENCES `bus` (`idbus`),
  ADD CONSTRAINT `fk_bus_has_horarios_horarios1` FOREIGN KEY (`horarios_idhorarios`) REFERENCES `horarios` (`idhorarios`);

--
-- Filtros para la tabla `dias_semana_has_horarios`
--
ALTER TABLE `dias_semana_has_horarios`
  ADD CONSTRAINT `fk_dias_semana_has_horarios_dias_semana1` FOREIGN KEY (`dias_semana_iddias_semana`) REFERENCES `dias_semana` (`iddias_semana`),
  ADD CONSTRAINT `fk_dias_semana_has_horarios_horarios1` FOREIGN KEY (`horarios_idhorarios`) REFERENCES `horarios` (`idhorarios`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
