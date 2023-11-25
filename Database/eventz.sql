-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 25, 2023 at 06:10 PM
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
-- Database: `eventz`
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
  `CourseId` int(11) NOT NULL,
  `CourseName` varchar(255) DEFAULT NULL,
  `School` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`CourseId`, `CourseName`, `School`) VALUES
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
-- Table structure for table `eventorganizers`
--

CREATE TABLE `eventorganizers` (
  `OrganizerID` int(11) NOT NULL,
  `OrganizationName` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `eventorganizers`
--

INSERT INTO `eventorganizers` (`OrganizerID`, `OrganizationName`, `Email`, `Password`) VALUES
(1, 'SICAP', 'sicap@slu.edu.ph', 'sicap'),
(2, 'icon', 'icon@slu.edu.ph', 'icon'),
(3, 'MATH', 'math@slu.edu.ph', 'math'),
(4, 'schema', 'schema@slu.edu.ph', 'schema'),
(5, 'ssc', 'ssc@slu.edu.ph', 'ssc'),
(6, 'kasama', 'kasama@slu.edu.ph', 'kasama'),
(7, 'sluadmin', 'admin@slu.edu.ph', 'admin'),
(8, 'nazis', 'nazis@slu.edu.ph', 'nazis'),
(9, 'homies', 'homies@slu.edu.ph', 'homies');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `EventID` int(11) NOT NULL,
  `OrganizerId` int(11) DEFAULT NULL,
  `EventName` varchar(255) DEFAULT NULL,
  `EventInfo` text DEFAULT NULL,
  `EventDateStart` date DEFAULT NULL,
  `EventDateEnd` date DEFAULT NULL,
  `EventLocation` varchar(255) DEFAULT NULL,
  `organizationID` int(11) DEFAULT NULL,
  `courseID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`EventID`, `OrganizerId`, `EventName`, `EventInfo`, `EventDateStart`, `EventDateEnd`, `EventLocation`, `organizationID`, `courseID`) VALUES
(1, 1, 'SAMPLE schmea EVENT', 'should be scvhema exclusive', '2023-12-01', '2023-12-03', 'SLU SENIOR HIGH', 4, NULL),
(2, 2, 'icon sponsored event', 'should be for everyone ito', '2023-11-05', '2023-11-07', 'SLU AVR ROOM', NULL, NULL),
(3, 3, 'math dept spons event', 'description bla bla must be for bscs exclusive', '2023-12-10', '2023-12-12', 'SPOT', NULL, 1),
(4, 3, 'math dept again', 'for everyone dpt', '2024-01-10', '2024-01-12', 'NULL', NULL, 1),
(5, 7, 'slu admin event', 'slu admin made this for slu only dpt', '2023-12-24', '2023-12-26', 'place', 1, NULL),
(6, 9, 'homies', 'merry christmas sample, for every1', '2023-12-25', '2023-12-25', 'chirstmas village', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `organizationmembers`
--

CREATE TABLE `organizationmembers` (
  `userID` int(11) NOT NULL,
  `organizationID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `organizationmembers`
--

INSERT INTO `organizationmembers` (`userID`, `organizationID`) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 1),
(2, 2),
(3, 1),
(6, 1),
(6, 3),
(7, 1),
(9, 1),
(9, 3);

-- --------------------------------------------------------

--
-- Table structure for table `organizations`
--

CREATE TABLE `organizations` (
  `OrganizationID` int(11) NOT NULL,
  `OrgName` varchar(255) DEFAULT NULL,
  `OrgEmail` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `organizations`
--

INSERT INTO `organizations` (`OrganizationID`, `OrgName`, `OrgEmail`) VALUES
(1, 'SLU', 'slu@slu.edu.ph'),
(2, 'icon', 'icon@slu.edu.ph'),
(3, 'MATH', 'math@slu.edu.ph'),
(4, 'schema', 'schema@slu.edu.ph'),
(5, 'ssc', 'ssc@slu.edu.ph'),
(6, 'kasama', 'kasama@slu.edu.ph'),
(7, 'sluadmin', 'admin@slu.edu.ph'),
(8, 'nazis', 'nazis@slu.edu.ph'),
(9, 'homies', 'homies@slu.edu.ph');

-- --------------------------------------------------------

--
-- Table structure for table `registrations`
--

CREATE TABLE `registrations` (
  `RegistrationId` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `EventId` int(11) DEFAULT NULL,
  `QRCode` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `segments`
--

CREATE TABLE `segments` (
  `SegmentID` int(11) NOT NULL,
  `EventID` int(11) NOT NULL,
  `SegmentName` varchar(255) DEFAULT NULL,
  `SegmentDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UserId` int(11) NOT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `CourseId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UserId`, `Email`, `Name`, `Password`, `CourseId`) VALUES
(1, 'darr@slu.edu.ph', 'Darren Franz', 'asd', 1),
(2, 'jus@slu.edu.ph', 'Justin Long', 'aa', 1),
(3, 'rey@slu.edu.ph', 'Rey Jhong', 'as', 2),
(4, 'han@gmail.com', 'Hands Reyes', '123', NULL),
(5, 'aer@yahoo.com', 'Aeronn zaza', '234', NULL),
(6, 'a@slu.edu.ph', 'asd boi', '111', 4),
(7, 'b@slu.edu.ph', 'test test', '222', 4),
(8, 'c@gmail.com', 'zaza dealer', '333', NULL),
(9, 'd@slu.edu.ph', 'skibidi rizz', '444', 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`userId`,`SegmentID`,`EventID`),
  ADD KEY `SegmentID` (`SegmentID`,`EventID`),
  ADD KEY `EventID` (`EventID`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`CourseId`);

--
-- Indexes for table `eventorganizers`
--
ALTER TABLE `eventorganizers`
  ADD PRIMARY KEY (`OrganizerID`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`EventID`),
  ADD KEY `OrganizerId` (`OrganizerId`),
  ADD KEY `fk_organization` (`organizationID`),
  ADD KEY `fk_course` (`courseID`);

--
-- Indexes for table `organizationmembers`
--
ALTER TABLE `organizationmembers`
  ADD PRIMARY KEY (`userID`,`organizationID`),
  ADD KEY `organizationID` (`organizationID`);

--
-- Indexes for table `organizations`
--
ALTER TABLE `organizations`
  ADD PRIMARY KEY (`OrganizationID`);

--
-- Indexes for table `registrations`
--
ALTER TABLE `registrations`
  ADD PRIMARY KEY (`RegistrationId`),
  ADD KEY `EventId` (`EventId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `segments`
--
ALTER TABLE `segments`
  ADD PRIMARY KEY (`SegmentID`,`EventID`),
  ADD KEY `EventID` (`EventID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserId`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD KEY `CourseId` (`CourseId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `CourseId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `eventorganizers`
--
ALTER TABLE `eventorganizers`
  MODIFY `OrganizerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `organizations`
--
ALTER TABLE `organizations`
  MODIFY `OrganizationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UserId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

ALTER TABLE `events`
  MODIFY `EventID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`SegmentID`,`EventID`) REFERENCES `segments` (`SegmentID`, `EventID`),
  ADD CONSTRAINT `attendance_ibfk_2` FOREIGN KEY (`EventID`) REFERENCES `events` (`EventID`),
  ADD CONSTRAINT `attendance_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `users` (`UserId`);

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`OrganizerId`) REFERENCES `organizations` (`OrganizationID`),
  ADD CONSTRAINT `fk_course` FOREIGN KEY (`courseID`) REFERENCES `courses` (`CourseId`),
  ADD CONSTRAINT `fk_organization` FOREIGN KEY (`organizationID`) REFERENCES `organizations` (`OrganizationID`);

--
-- Constraints for table `organizationmembers`
--
ALTER TABLE `organizationmembers`
  ADD CONSTRAINT `organizationmembers_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`UserId`),
  ADD CONSTRAINT `organizationmembers_ibfk_2` FOREIGN KEY (`organizationID`) REFERENCES `organizations` (`OrganizationID`);

--
-- Constraints for table `registrations`
--
ALTER TABLE `registrations`
  ADD CONSTRAINT `registrations_ibfk_1` FOREIGN KEY (`EventId`) REFERENCES `events` (`EventID`),
  ADD CONSTRAINT `registrations_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`UserId`);

--
-- Constraints for table `segments`
--
ALTER TABLE `segments`
  ADD CONSTRAINT `segments_ibfk_1` FOREIGN KEY (`EventID`) REFERENCES `events` (`EventID`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`CourseId`) REFERENCES `courses` (`CourseId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
