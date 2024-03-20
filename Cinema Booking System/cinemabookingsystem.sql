-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 20, 2024 at 12:35 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

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
  `bookingId` int(11) NOT NULL,
  `bookingDate` date DEFAULT NULL,
  `totalCost` double DEFAULT NULL,
  `seats` int(11) DEFAULT NULL,
  `emailAddress` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`bookingId`, `bookingDate`, `totalCost`, `seats`, `emailAddress`) VALUES
(1, '2024-02-09', 25.5, 2, 'john@email.com'),
(2, '2024-02-10', 30.75, 3, 'doe@email.com'),
(3, '2024-02-11', 15.25, 1, 'alan@email.com');

-- --------------------------------------------------------

--
-- Table structure for table `movie`
--

CREATE TABLE `movie` (
  `movieId` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `language` varchar(50) DEFAULT NULL,
  `releaseDate` date DEFAULT NULL,
  `genre` varchar(50) DEFAULT NULL,
  `runtime` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `movie`
--

INSERT INTO `movie` (`movieId`, `title`, `language`, `releaseDate`, `genre`, `runtime`) VALUES
(1, 'Avengers', 'English', '2012-10-14', 'Action', 142),
(2, 'The Godfather', 'English', '1972-03-24', 'Crime', 175),
(7, 'BroBoFoM', 'English', '2024-02-14', 'Sci fi', 180),
(8, 'The Batman', 'English', '2022-11-22', 'Action', 190);

-- --------------------------------------------------------

--
-- Table structure for table `screen`
--

CREATE TABLE `screen` (
  `screenId` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `startTime` datetime DEFAULT NULL,
  `endTime` datetime DEFAULT NULL,
  `seatsRemaining` int(11) DEFAULT NULL,
  `theatreId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `screen`
--

INSERT INTO `screen` (`screenId`, `movieId`, `startTime`, `endTime`, `seatsRemaining`, `theatreId`) VALUES
(1, 2, '2024-03-09 18:30:01', '2024-02-10 21:55:00', 150, 3);

-- --------------------------------------------------------

--
-- Table structure for table `theatre`
--

CREATE TABLE `theatre` (
  `theatreId` int(11) NOT NULL,
  `capacity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `theatre`
--

INSERT INTO `theatre` (`theatreId`, `capacity`) VALUES
(1, 100),
(2, 200),
(3, 150);

-- --------------------------------------------------------

--
-- Table structure for table `ticket`
--

CREATE TABLE `ticket` (
  `ticketNo` int(11) NOT NULL,
  `bookingId` int(11) DEFAULT NULL,
  `screenId` int(11) DEFAULT NULL,
  `ticketType` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ticket`
--

INSERT INTO `ticket` (`ticketNo`, `bookingId`, `screenId`, `ticketType`) VALUES
(1, 1, 1, 'Adult'),
(2, 2, 2, 'Student'),
(3, 3, 3, 'Senior');

-- --------------------------------------------------------

--
-- Table structure for table `tickettype`
--

CREATE TABLE `tickettype` (
  `typeId` int(11) NOT NULL,
  `typeName` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tickettype`
--

INSERT INTO `tickettype` (`typeId`, `typeName`) VALUES
(1, 'Adult'),
(2, 'Student'),
(3, 'Senior');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `userType` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `userType`, `email`, `password`) VALUES
(1, 'admin', 'admin@example.com', 'admin123'),
(2, 'customer', 'customer1@example.com', 'customer123'),
(3, 'customer', 'customer2@example.com', 'customer456');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`bookingId`);

--
-- Indexes for table `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`movieId`);

--
-- Indexes for table `screen`
--
ALTER TABLE `screen`
  ADD PRIMARY KEY (`screenId`),
  ADD KEY `screen_ibfk_1` (`movieId`),
  ADD KEY `fk_screen_theatre` (`theatreId`);

--
-- Indexes for table `theatre`
--
ALTER TABLE `theatre`
  ADD PRIMARY KEY (`theatreId`);

--
-- Indexes for table `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`ticketNo`),
  ADD KEY `bookingId` (`bookingId`),
  ADD KEY `screenId` (`screenId`);

--
-- Indexes for table `tickettype`
--
ALTER TABLE `tickettype`
  ADD PRIMARY KEY (`typeId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `movie`
--
ALTER TABLE `movie`
  MODIFY `movieId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `screen`
--
ALTER TABLE `screen`
  MODIFY `screenId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `screen`
--
ALTER TABLE `screen`
  ADD CONSTRAINT `fk_screen_theatre` FOREIGN KEY (`theatreId`) REFERENCES `theatre` (`theatreId`);

--
-- Constraints for table `ticket`
--
ALTER TABLE `ticket`
  ADD CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`bookingId`) REFERENCES `booking` (`bookingId`),
  ADD CONSTRAINT `ticket_ibfk_2` FOREIGN KEY (`screenId`) REFERENCES `screen` (`screenId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
