-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 30, 2023 at 03:33 PM
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
-- Database: `events`
--

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
(6, 9, 'homies', 'merry christmas sample, for every1', '2023-12-25', '2023-12-25', 'chirstmas village', NULL, NULL),
(7, 1, 'Sample Completed SLU event', 'A celebration event for graduates', '2022-08-31', '2022-09-02', 'sa tabi tabi', NULL, NULL),
(9, 1, 'Teacher Conference', 'Annual meeting and development event for educators', '2023-03-14', '2023-03-16', 'Manila Hotel', NULL, NULL),
(10, 3, 'Math Olympics', 'Math competition for high school students', '2023-05-21', '2023-05-23', 'SMX Convention Center', NULL, 3),
(11, 5, 'Science Fair', 'Science competition for elementary school children', '2023-06-01', '2023-06-03', 'World Trade Center', NULL, NULL),
(12, 5, 'Spelling Bee Finals', 'National finals for the spelling bee competition', '2023-07-12', '2023-07-14', 'Araneta Coliseum', NULL, NULL),
(13, 6, 'Debate Tournament', 'Inter-collegiate debate competition', '2023-09-05', '2023-09-07', 'UP Theater', NULL, NULL),
(14, 2, 'IT Summit', 'Technology conference and expo', '2023-10-28', '2023-10-30', 'Shangri-La Hotel', 2, NULL),
(15, 8, 'Youth Leadership Conference', 'Leadership development for high school students', '2023-11-11', '2023-11-14', 'Astoria Plaza', NULL, NULL),
(16, 9, 'Medical Symposium', 'Conference covering latest advancements in medicine', '2023-12-05', '2023-12-07', 'Makati Shangri-La', NULL, NULL),
(17, 5, 'Summer Coding Camp', 'Coding workshop for high school students', '2023-06-12', '2023-06-16', 'University Auditorium', NULL, NULL),
(18, 7, 'Physics Competition', 'Physics challenge for top science students', '2023-08-01', '2023-08-03', 'City Conference Hall', NULL, 1),
(19, 3, 'Entrepreneurship Bootcamp', 'Immersive startup workshop for budding entrepreneurs', '2023-03-05', '2023-03-09', 'Business Innovation Hub', NULL, NULL),
(20, 9, 'Debate Championship', 'National interschool debate tournament finals', '2023-09-25', '2023-09-27', 'Grand Auditorium', NULL, 2),
(21, 4, 'Young Writers Seminar', 'Creative writing workshop for aspiring authors aged 10-15', '2023-10-12', '2023-10-14', 'Arts Center', NULL, NULL),
(22, 1, 'Photography Exhibit Opening', 'Launch event for wildlife photography gallery', '2023-11-17', '2023-11-17', 'Museum Gallery Hall', NULL, NULL),
(23, 8, 'Literature Festival', 'Readings, talks, workshops celebrating renowned authors', '2023-07-30', '2023-08-04', 'University Library', NULL, 3),
(24, 2, 'Job Skills Bootcamp', 'Employment training program focused on workplace competencies', '2023-04-15', '2023-04-22', 'Community Learning Hub', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`eventID`),
  ADD KEY `OrganizerId` (`OrganizerId`),
  ADD KEY `courseID` (`courseID`),
  ADD KEY `OrganizationID` (`OrganizationID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `eventID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`OrganizerId`) REFERENCES `eventorganizers` (`OrganizerID`),
  ADD CONSTRAINT `events_ibfk_2` FOREIGN KEY (`courseID`) REFERENCES `courses` (`courseID`),
  ADD CONSTRAINT `events_ibfk_3` FOREIGN KEY (`OrganizationID`) REFERENCES `organizations` (`OrganizationID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
