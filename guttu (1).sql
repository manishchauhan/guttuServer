-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 14, 2022 at 07:16 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `guttu`
--

-- --------------------------------------------------------

--
-- Table structure for table `fungames`
--

CREATE TABLE `fungames` (
  `gameid` int(11) NOT NULL,
  `gamename` varchar(256) NOT NULL,
  `gameurl` text NOT NULL,
  `gamedesc` longtext NOT NULL,
  `multiplayer` tinyint(1) NOT NULL,
  `played` bigint(20) NOT NULL,
  `gameimg` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `fungames`
--

INSERT INTO `fungames` (`gameid`, `gamename`, `gameurl`, `gamedesc`, `multiplayer`, `played`, `gameimg`) VALUES
(1, 'typing master', 'https://www.google.com/search?q=int+range+in+mysql&rlz=1C1GIVA_enIN957IN957&sxsrf=AOaemvLw_8TgaM8LWMLKBdqhzSlEUXjFlw%3A1641715409904&ei=0ZbaYeDbNuyP4-EPzoWVwAc&oq=int+range+in+my&gs_lcp=Cgdnd3Mtd2l6EAMYADIFCAAQgAQyBggAEBYQHjIICAAQFhAKEB4yCAgAEBYQChAeMgYIABAWEB46DQguEMcBEKMCELADECc6BwgjELADECc6BwgAEEcQsAM6CgguEMgDELADEEM6BAgjECc6CwgAEIAEELEDEIMBOggILhCxAxCDAToOCC4QgAQQsQMQxwEQ0QM6CAgAELEDEIMBOgoIABCxAxCDARBDOgQILhBDOgQIABBDOgcIABCxAxBDOg0ILhCxAxDHARCjAhBDOhEILhCABBCxAxCDARDHARDRAzoICAAQgAQQsQM6BQgAELEDOgoIABCABBCHAhAUSgQIQRgASgQIRhgAUOAKWL4qYKM2aAJwAngAgAHwAYgBmxSSAQYwLjE0LjGYAQCgAQHIAQvAAQE&sclient=gws-wiz', 'The signed range of INT is from -2147483648 to 2147483647 and the unsigned range is from 0 to 4294967295. You can specify signed or unsigned int in the column definition. The size parameter specifies the maximum length of the number which is 255.10-Nov-2020', 1, 0, ''),
(2, 'mysql game', 'https://dev.mysql.com/doc/refman/8.0/en/integer-types.html', 'MySQL supports the SQL standard integer types INTEGER (or INT) and SMALLINT. As an extension to the standard, MySQL also supports the integer types TINYINT, MEDIUMINT, and BIGINT. The following table shows the required storage and range for each integer type.', 0, 5005, '');

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `roomid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `gameid` int(11) NOT NULL,
  `parentgame` varchar(256) NOT NULL,
  `roomname` varchar(256) NOT NULL,
  `roomdesc` mediumtext NOT NULL,
  `roomimg` varchar(256) NOT NULL,
  `players` tinyint(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`roomid`, `userid`, `gameid`, `parentgame`, `roomname`, `roomdesc`, `roomimg`, `players`) VALUES
(1, 1, 1, 'typing master', 'typing room by manish', 'some room details by manish chauhan', '', 2),
(2, 1, 1, 'typing master', 'typing room by manish2', 'some room details by manish chauhan2', '', 8);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userid` int(11) NOT NULL,
  `username` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userid`, `username`, `password`, `email`) VALUES
(1, 'manish', '$2b$10$Wm..hiV5QjtfpBbZDlOTlO01J2FGZT.uIV8N2ozJNTtf1H73f4dCi', 'manish@yahoo.com'),
(2, 'sachin', '$2b$10$BRER9IDjoOzpHIpo/gRuc.3nOKZX.ZPo3JhTu7e9KqWk8X6NJu4Bi', 'sachin@gamil.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `fungames`
--
ALTER TABLE `fungames`
  ADD PRIMARY KEY (`gameid`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`roomid`),
  ADD KEY `userlook` (`userid`),
  ADD KEY `roomlook` (`gameid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `fungames`
--
ALTER TABLE `fungames`
  MODIFY `gameid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `room`
--
ALTER TABLE `room`
  MODIFY `roomid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `room`
--
ALTER TABLE `room`
  ADD CONSTRAINT `roomlook` FOREIGN KEY (`gameid`) REFERENCES `fungames` (`gameid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `userlook` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
