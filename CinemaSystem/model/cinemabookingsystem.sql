-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 08, 2024 at 06:13 PM
-- Server version: 8.0.32
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cinemabookingsystem`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `bookingId` int NOT NULL,
  `bookingDate` date DEFAULT NULL,
  `totalCost` double DEFAULT NULL,
  `Seats` int DEFAULT NULL,
  `screenId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `movie`
--

CREATE TABLE `movie` (
  `movieId` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `releaseDate` date DEFAULT NULL,
  `genre` varchar(255) DEFAULT NULL,
  `runtime` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `movie`
--

INSERT INTO `movie` (`movieId`, `title`, `description`, `releaseDate`, `genre`, `runtime`) VALUES
(1, 'Jurassic Park', 'During a preview tour, a theme park suffers a major power breakdown that allows its cloned dinosaur exhibits to run amok.', '1993-06-11', 'Adventure', 127),
(2, 'The Avengers', 'Earth\'s mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.', '2012-05-04', 'Action', 143),
(3, 'Forrest Gump', 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.', '1994-07-06', 'Drama', 142);

-- --------------------------------------------------------

--
-- Table structure for table `screen`
--

CREATE TABLE `screen` (
  `viewingId` int NOT NULL,
  `movieId` int DEFAULT NULL,
  `startTime` datetime DEFAULT NULL,
  `endTime` datetime DEFAULT NULL,
  `theaterId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `screen`
--

INSERT INTO `screen` (`viewingId`, `movieId`, `startTime`, `endTime`, `theaterId`) VALUES
(101, 1, '2024-02-08 18:00:00', '2024-02-08 20:16:00', 1),
(102, 2, '2024-02-08 17:30:00', '2024-02-08 20:18:00', 2),
(103, 3, '2024-02-08 19:00:00', '2024-02-08 21:22:00', 3);

-- --------------------------------------------------------

--
-- Table structure for table `seat`
--

CREATE TABLE `seat` (
  `seatNumber` int NOT NULL,
  `availability` tinyint(1) DEFAULT NULL,
  `screenId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `seat`
--

INSERT INTO `seat` (`seatNumber`, `availability`, `screenId`) VALUES
(1, 1, 101),
(2, 0, 101),
(3, 1, 101),
(4, 1, 102),
(5, 1, 102),
(6, 1, 102),
(7, 1, 103),
(8, 1, 103),
(9, 0, 103);

-- --------------------------------------------------------

--
-- Table structure for table `theatre`
--

CREATE TABLE `theatre` (
  `screenNumber` int NOT NULL,
  `totalSeats` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `theatre`
--

INSERT INTO `theatre` (`screenNumber`, `totalSeats`) VALUES
(1, 120),
(2, 150),
(3, 80);

-- --------------------------------------------------------

--
-- Table structure for table `ticket`
--

CREATE TABLE `ticket` (
  `ticketId` int NOT NULL,
  `cost` double DEFAULT NULL,
  `ticketType` varchar(255) DEFAULT NULL,
  `bookingId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`bookingId`),
  ADD KEY `screenId` (`screenId`);

--
-- Indexes for table `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`movieId`);

--
-- Indexes for table `screen`
--
ALTER TABLE `screen`
  ADD PRIMARY KEY (`viewingId`),
  ADD KEY `movieId` (`movieId`),
  ADD KEY `theaterId` (`theaterId`);

--
-- Indexes for table `seat`
--
ALTER TABLE `seat`
  ADD PRIMARY KEY (`seatNumber`),
  ADD KEY `screenId` (`screenId`);

--
-- Indexes for table `theatre`
--
ALTER TABLE `theatre`
  ADD PRIMARY KEY (`screenNumber`);

--
-- Indexes for table `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`ticketId`),
  ADD KEY `bookingId` (`bookingId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `movie`
--
ALTER TABLE `movie`
  MODIFY `movieId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `ticket`
--
ALTER TABLE `ticket`
  MODIFY `ticketId` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`screenId`) REFERENCES `screen` (`viewingId`);

--
-- Constraints for table `screen`
--
ALTER TABLE `screen`
  ADD CONSTRAINT `screen_ibfk_1` FOREIGN KEY (`movieId`) REFERENCES `movie` (`movieId`),
  ADD CONSTRAINT `screen_ibfk_2` FOREIGN KEY (`theaterId`) REFERENCES `theatre` (`screenNumber`);

--
-- Constraints for table `seat`
--
ALTER TABLE `seat`
  ADD CONSTRAINT `seat_ibfk_1` FOREIGN KEY (`screenId`) REFERENCES `screen` (`viewingId`);

--
-- Constraints for table `ticket`
--
ALTER TABLE `ticket`
  ADD CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`bookingId`) REFERENCES `booking` (`bookingId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
