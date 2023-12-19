-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 19, 2023 at 08:56 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sampe_no_data`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `userId` int(11) NOT NULL,
  `SegmentID` int(11) NOT NULL,
  `EventID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `courseID` int(11) NOT NULL,
  `CourseName` varchar(255) DEFAULT NULL,
  `school` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`courseID`, `CourseName`, `school`) VALUES
(1, 'BSCS', 'SAMCIS'),
(2, 'BSIT', 'SAMCIS'),
(3, 'BMMA', 'SAMCIS'),
(4, 'BSAC', 'SAMCIS'),
(5, 'BSME', 'SEA'),
(6, 'BSCE', 'SEA'),
(7, 'BSEE', 'SEA'),
(8, 'BSIE', 'SEA'),
(9, 'BSN', 'SONAHBS'),
(10, 'BSRT', 'SONAHBS');

-- --------------------------------------------------------

--
-- Table structure for table `enrolledcourse`
--

CREATE TABLE `enrolledcourse` (
  `courseID` int(11) NOT NULL,
  `Email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `enrolledcourse`
--

INSERT INTO `enrolledcourse` (`courseID`, `Email`) VALUES
(1, 'd@slu.edu.ph'),
(1, 'darr@slu.edu.ph'),
(1, 'jus@slu.edu.ph'),
(2, 'a@slu.edu.ph'),
(3, 'rey@slu.edu.ph');

-- --------------------------------------------------------

--
-- Table structure for table `eventorganizers`
--

CREATE TABLE `eventorganizers` (
  `OrganizerID` int(11) NOT NULL,
  `OrganizationName` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `orgIcon` blob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `eventorganizers`
--

INSERT INTO `eventorganizers` (`OrganizerID`, `OrganizationName`, `Email`, `Password`, `orgIcon`) VALUES
(1, 'SICAP', 'sicap@slu.edu.ph', 'sicap', NULL),
(2, 'icon', 'icon@slu.edu.ph', 'icon', NULL),
(3, 'MATH', 'math@slu.edu.ph', 'math', NULL),
(4, 'schema', 'schema@slu.edu.ph', 'schema', NULL),
(5, 'ssc', 'ssc@slu.edu.ph', 'ssc', NULL),
(6, 'kasama', 'kasama@slu.edu.ph', 'kasama', NULL),
(7, 'sluadmin', 'admin@slu.edu.ph', 'admin', NULL),
(8, 'rpg', 'rpg@slu.edu.ph', 'rpg', NULL),
(9, 'homies', 'homies@slu.edu.ph', 'homies', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `eventID` int(11) NOT NULL,
  `OrganizerId` int(11) DEFAULT NULL,
  `EventName` varchar(255) DEFAULT NULL,
  `EventInfo` text DEFAULT NULL,
  `EventDateStart` date DEFAULT NULL,
  `EventDateEnd` date DEFAULT NULL,
  `EventLocation` varchar(255) DEFAULT NULL,
  `courseID` int(11) DEFAULT NULL,
  `accessLevel` enum('Everyone','SLU','Organization','Course') DEFAULT NULL,
  `poster` blob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `organizationmembers`
--

CREATE TABLE `organizationmembers` (
  `organizationID` int(11) NOT NULL,
  `Email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `organizationmembers`
--

INSERT INTO `organizationmembers` (`organizationID`, `Email`) VALUES
(1, '123456@gmail.com'),
(1, '123@gmail.com'),
(1, 'darr@slu.edu.ph'),
(1, 'darrendoe@gmail.coms'),
(1, 'han@gmail.com'),
(1, 'jus@slu.edu.ph'),
(1, 'rey@slu.edu.ph'),
(2, 'darr@slu.edu.ph'),
(2, 'darrs@slu.edu.ph'),
(2, 'darsr@slu.edu.ph'),
(3, 'darr@slu.edu.ph'),
(4, 'darr@slu.edu.ph'),
(5, 'darr@slu.edu.ph'),
(7, 'aer@yahoo.com'),
(8, 'darr@slu.edu.ph');

-- --------------------------------------------------------

--
-- Table structure for table `registrations`
--

CREATE TABLE `registrations` (
  `RegistrationId` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `EventId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `segments`
--

CREATE TABLE `segments` (
  `SegmentNo` int(11) NOT NULL,
  `EventID` int(11) NOT NULL,
  `SegmentName` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `FirstName` varchar(255) DEFAULT NULL,
  `LastName` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `icon` blob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`userId`,`SegmentID`,`EventID`),
  ADD KEY `SegmentID` (`SegmentID`,`EventID`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`courseID`);

--
-- Indexes for table `enrolledcourse`
--
ALTER TABLE `enrolledcourse`
  ADD PRIMARY KEY (`courseID`,`Email`);

--
-- Indexes for table `eventorganizers`
--
ALTER TABLE `eventorganizers`
  ADD PRIMARY KEY (`OrganizerID`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`eventID`),
  ADD KEY `OrganizerId` (`OrganizerId`),
  ADD KEY `courseID` (`courseID`);

--
-- Indexes for table `organizationmembers`
--
ALTER TABLE `organizationmembers`
  ADD PRIMARY KEY (`organizationID`,`Email`);

--
-- Indexes for table `registrations`
--
ALTER TABLE `registrations`
  ADD PRIMARY KEY (`RegistrationId`),
  ADD KEY `EventId` (`EventId`);

--
-- Indexes for table `segments`
--
ALTER TABLE `segments`
  ADD PRIMARY KEY (`SegmentNo`,`EventID`),
  ADD KEY `EventID` (`EventID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `courseID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `eventorganizers`
--
ALTER TABLE `eventorganizers`
  MODIFY `OrganizerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `eventID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `registrations`
--
ALTER TABLE `registrations`
  MODIFY `RegistrationId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `enrolledcourse`
--
ALTER TABLE `enrolledcourse`
  ADD CONSTRAINT `enrolledcourse_ibfk_1` FOREIGN KEY (`courseID`) REFERENCES `courses` (`courseID`);

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`OrganizerId`) REFERENCES `eventorganizers` (`OrganizerID`),
  ADD CONSTRAINT `events_ibfk_2` FOREIGN KEY (`courseID`) REFERENCES `courses` (`courseID`);

--
-- Constraints for table `organizationmembers`
--
ALTER TABLE `organizationmembers`
  ADD CONSTRAINT `organizationmembers_ibfk_1` FOREIGN KEY (`organizationID`) REFERENCES `eventorganizers` (`OrganizerID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
