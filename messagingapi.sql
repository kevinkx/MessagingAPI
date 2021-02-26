-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 26, 2021 at 05:59 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `messagingapi`
--

-- --------------------------------------------------------

--
-- Table structure for table `conversations`
--

CREATE TABLE `conversations` (
  `id` bigint(20) NOT NULL,
  `user_id_1` bigint(20) NOT NULL,
  `user_id_2` bigint(20) NOT NULL,
  `last_message_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `conversations`
--

INSERT INTO `conversations` (`id`, `user_id_1`, `user_id_2`, `last_message_id`) VALUES
(1, 1, 2, 13),
(3, 2, 5, 14),
(4, 2, 6, 15);

-- --------------------------------------------------------

--
-- Table structure for table `conversation_detail`
--

CREATE TABLE `conversation_detail` (
  `id` bigint(20) NOT NULL,
  `conversation_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `chat_user_id` bigint(20) NOT NULL,
  `unread_count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `conversation_detail`
--

INSERT INTO `conversation_detail` (`id`, `conversation_id`, `user_id`, `chat_user_id`, `unread_count`) VALUES
(1, 1, 1, 2, 4),
(2, 1, 2, 1, 0),
(3, 3, 2, 5, 0),
(4, 3, 5, 2, 0),
(5, 4, 2, 6, 0),
(6, 4, 6, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `conversation_id` bigint(20) NOT NULL,
  `message` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `user_id`, `conversation_id`, `message`, `date`) VALUES
(1, 1, 1, 'hallo', '2021-01-31 17:00:00'),
(2, 2, 1, 'oi', '2021-02-01 17:00:00'),
(3, 1, 1, 'ga jadi bro hehe', '2021-02-26 12:56:42'),
(5, 2, 1, '\"wkwkwk\"', '2021-02-26 15:57:34'),
(6, 2, 1, '\"wkwkwk\"', '2021-02-26 16:00:03'),
(7, 2, 1, '\"wkwkwk\"', '2021-02-26 16:00:36'),
(8, 2, 1, '\"wkwkwk\"', '2021-02-26 16:01:34'),
(9, 2, 1, '\"wkwkwk\"', '2021-02-26 16:02:49'),
(10, 2, 1, '\"wkwkwk\"', '2021-02-26 16:03:30'),
(11, 2, 1, '\"wkwkwk\"', '2021-02-26 16:03:35'),
(12, 2, 1, '\"wkwkwk\"', '2021-02-26 16:03:36'),
(13, 2, 1, '\"wkwkwk\"', '2021-02-26 16:03:36'),
(14, 2, 3, '\"wkwkwk\"', '2021-02-26 16:17:28'),
(15, 2, 4, '\"wkwkwk\"', '2021-02-26 16:19:24');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `username` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`) VALUES
(1, 'admin'),
(8, 'budi'),
(2, 'kevin'),
(5, 'richard'),
(6, 'ricky'),
(7, 'sujana');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `conversations`
--
ALTER TABLE `conversations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `conversation_detail`
--
ALTER TABLE `conversation_detail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `username_2` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `conversations`
--
ALTER TABLE `conversations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `conversation_detail`
--
ALTER TABLE `conversation_detail`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
