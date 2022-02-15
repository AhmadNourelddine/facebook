-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 16, 2022 at 12:08 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.0.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `facebookdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `friends`
--

CREATE TABLE `friends` (
  `id` int(11) NOT NULL,
  `friend1_id` int(11) NOT NULL,
  `friend2_id` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `friend_blocked` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `friends`
--

INSERT INTO `friends` (`id`, `friend1_id`, `friend2_id`, `date`, `friend_blocked`) VALUES
(2, 1, 12, '2022-02-13 14:38:37', 0),
(5, 1, 14, '2022-02-13 14:40:10', 0),
(7, 14, 13, '2022-02-13 14:42:37', 0),
(8, 13, 11, '2022-02-13 14:42:37', 0),
(10, 11, 14, '2022-02-13 15:01:58', 0);

-- --------------------------------------------------------

--
-- Table structure for table `friends_requests`
--

CREATE TABLE `friends_requests` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_requester_id` int(11) NOT NULL,
  `date_of_request` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `friends_requests`
--

INSERT INTO `friends_requests` (`id`, `user_id`, `user_requester_id`, `date_of_request`) VALUES
(1, 11, 1, '2022-02-14 19:05:46'),
(2, 18, 17, '2022-02-14 19:24:35'),
(3, 19, 17, '2022-02-14 19:24:35'),
(6, 13, 19, '2022-02-14 19:26:46'),
(7, 13, 17, '2022-02-14 19:26:46'),
(8, 1, 19, '2022-02-16 00:50:05');

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_like_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `post_id`, `user_like_id`) VALUES
(1, 1, 1),
(2, 1, 14),
(3, 2, 11);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `text` mediumtext NOT NULL,
  `post_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `user_id`, `text`, `post_date`) VALUES
(1, 1, 'hellooooossss', '2022-02-13 17:10:01'),
(2, 1, 'byeeezzzz', '2022-02-13 17:10:01'),
(3, 12, 'hi ana sami hello lower case', '2022-02-13 17:28:17'),
(4, 11, 'hi ana hasan', '2022-02-13 17:28:17'),
(5, 1, 'post 1 ahmad hello', '2022-02-14 12:57:56'),
(6, 1, 'post 2 ahmad helloz', '2022-02-14 12:57:56'),
(7, 1, 'post 3 byeeee ahmad', '2022-02-14 12:57:56'),
(8, 12, '\"hi again ana sami\"', '2022-02-14 16:57:27'),
(9, 1, 'ahmad from gui', '2022-02-14 23:03:20');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `image` longblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `email`, `image`) VALUES
(1, 'ahmad ', '123', 'ahmad.nrdn', NULL),
(11, 'hasan', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 'hasan.nrdn', NULL),
(12, 'sami', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 'sami.hey', NULL),
(13, 'hadi', '12345', 'hadi.email', NULL),
(14, 'charbel', '5678', 'charbel.email', NULL),
(17, 'housam', '45678', 'housam.com', NULL),
(18, 'mhmd', '89076', 'mhmd.com', NULL),
(19, 'kamal', '3434', 'kamal.com', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `friends`
--
ALTER TABLE `friends`
  ADD PRIMARY KEY (`id`),
  ADD KEY `follower_id` (`friend1_id`),
  ADD KEY `followed_id` (`friend2_id`);

--
-- Indexes for table `friends_requests`
--
ALTER TABLE `friends_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `user_request_id` (`user_requester_id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_like_id` (`user_like_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `friends`
--
ALTER TABLE `friends`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `friends_requests`
--
ALTER TABLE `friends_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `friends`
--
ALTER TABLE `friends`
  ADD CONSTRAINT `friends_ibfk_1` FOREIGN KEY (`friend1_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `friends_ibfk_2` FOREIGN KEY (`friend2_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `friends_requests`
--
ALTER TABLE `friends_requests`
  ADD CONSTRAINT `friends_requests_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `friends_requests_ibfk_2` FOREIGN KEY (`user_requester_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`user_like_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
