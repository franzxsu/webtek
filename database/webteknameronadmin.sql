-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 28, 2023 at 12:10 PM
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
-- Database: `webteknameronadmin`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`) VALUES
(1, 'admin1', 'pass1'),
(2, 'admin2', 'pass2'),
(3, 'admin3', 'pass3'),
(4, 'admin4', 'pass4'),
(5, 'admin5', 'pass5');

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
(9, 'homies', 'homies@slu.edu.ph', 'homies'),
(1001, 'TITE', 'tite@slu.edu.ph', 'tite'),
(1002, 'REAL', 'real@slu.edu.ph', 'real');

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
  `OrganizationID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`eventID`, `OrganizerId`, `EventName`, `EventInfo`, `EventDateStart`, `EventDateEnd`, `EventLocation`, `courseID`, `OrganizationID`) VALUES
(1, 1, 'SAMPLE schmea EVENT', 'should be scvhema exclusive', '2023-12-01', '2023-12-03', 'SLU SENIOR HIGH', NULL, 4),
(2, 2, 'icon sponsored event', 'should be for everyone ito', '2023-11-05', '2023-11-07', 'SLU AVR ROOM', NULL, NULL),
(3, 3, 'math dept spons event', 'description bla bla must be for bscs exclusive', '2023-12-10', '2023-12-12', 'SPOT', 1, NULL),
(4, 3, 'math dept again', 'for everyone dpt', '2024-01-10', '2024-01-12', 'NULL', 1, NULL),
(5, 7, 'slu admin event', 'slu admin made this for slu only dpt', '2023-12-24', '2023-12-26', 'place', NULL, 1),
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
  `orgName` varchar(255) DEFAULT NULL,
  `orgEmail` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `organizations`
--

INSERT INTO `organizations` (`OrganizationID`, `orgName`, `orgEmail`) VALUES
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
  `EventId` int(11) DEFAULT NULL
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
  `userId` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `FirstName` varchar(255) DEFAULT NULL,
  `LastName` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `email`, `FirstName`, `LastName`, `password`) VALUES
(1, 'darr@slu.edu.ph', 'Darren', 'Franz', 'asd'),
(2, 'jus@slu.edu.ph', 'Justin', 'Long', 'aa'),
(3, 'rey@slu.edu.ph', 'Rey', 'Jhong', 'as'),
(4, 'han@gmail.com', 'Hands', 'Reyes', '123'),
(5, 'aer@yahoo.com', 'Aeronn', 'zaza', '234'),
(6, 'a@slu.edu.ph', 'asd', 'boi', '111'),
(7, 'b@slu.edu.ph', 'test', 'test', '222'),
(8, 'c@gmail.com', 'zaza', 'dealer', '333'),
(9, 'd@slu.edu.ph', 'skibidi', 'rizz', '444');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

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
  ADD KEY `courseID` (`courseID`),
  ADD KEY `OrganizationID` (`OrganizationID`);

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
  ADD KEY `EventId` (`EventId`);

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
  MODIFY `OrganizerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1003;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `eventID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `organizations`
--
ALTER TABLE `organizations`
  MODIFY `OrganizationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `registrations`
--
ALTER TABLE `registrations`
  MODIFY `RegistrationId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`SegmentID`,`EventID`) REFERENCES `segments` (`SegmentID`, `EventID`);

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
  ADD CONSTRAINT `events_ibfk_2` FOREIGN KEY (`courseID`) REFERENCES `courses` (`courseID`),
  ADD CONSTRAINT `events_ibfk_3` FOREIGN KEY (`OrganizationID`) REFERENCES `organizations` (`OrganizationID`);

--
-- Constraints for table `organizationmembers`
--
ALTER TABLE `organizationmembers`
  ADD CONSTRAINT `organizationmembers_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userId`),
  ADD CONSTRAINT `organizationmembers_ibfk_2` FOREIGN KEY (`organizationID`) REFERENCES `organizations` (`OrganizationID`);

--
-- Constraints for table `registrations`
--
ALTER TABLE `registrations`
  ADD CONSTRAINT `registrations_ibfk_1` FOREIGN KEY (`EventId`) REFERENCES `events` (`eventID`);

--
-- Constraints for table `segments`
--
ALTER TABLE `segments`
  ADD CONSTRAINT `segments_ibfk_1` FOREIGN KEY (`EventID`) REFERENCES `events` (`eventID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
