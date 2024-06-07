-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 07 Jun 2024 pada 11.12
-- Versi server: 10.4.27-MariaDB
-- Versi PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kcg_helpdesk`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `employees`
--

CREATE TABLE `employees` (
  `employee_id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `division` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `employees`
--

INSERT INTO `employees` (`employee_id`, `name`, `division`, `role`, `createdAt`, `updatedAt`) VALUES
('KCG-05515', 'Aidan', 'IT', 'QC', '2024-06-06 01:47:00', '2024-06-06 01:47:00'),
('KCG-05526', 'Darryl', 'IT', 'Assigner', '2024-06-06 01:47:00', '2024-06-06 01:47:00'),
('KCG-05542', 'Novia', 'HRGA', '', '2024-06-06 01:47:00', '2024-06-06 01:47:00'),
('KCG-05545', 'Akbar', 'IT', 'QC', '2024-06-06 01:47:00', '2024-06-06 01:47:00'),
('KCG-05546', 'Ashel', 'LnD', '', '2024-06-06 01:47:00', '2024-06-06 01:47:00'),
('KCG-05550', 'Andrew', 'Marketing', '', '2024-06-06 01:47:00', '2024-06-06 01:47:00'),
('KCG-05579', 'Gilbert', 'IT', '', '2024-06-06 01:47:00', '2024-06-06 01:47:00'),
('KCG-05691', 'Ilham', 'BusDev', '', '2024-06-06 01:47:00', '2024-06-06 01:47:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `files`
--

CREATE TABLE `files` (
  `id` int(11) NOT NULL,
  `path` varchar(255) DEFAULT NULL,
  `ticket_id` varchar(255) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `files`
--

INSERT INTO `files` (`id`, `path`, `ticket_id`, `is_deleted`, `createdAt`, `updatedAt`) VALUES
(1, 'uploads/1717639077716-OutlineProject.jpg', '1', 0, '2024-06-06 01:57:59', '2024-06-06 01:57:59'),
(2, 'uploads/1717641901115-_OnlineTherapyPlatformUseCaseDiagram(1).png', '2', 0, '2024-06-06 02:45:02', '2024-06-06 02:45:02'),
(3, 'uploads/1717643343859-bannerfiver1.png', '3', 0, '2024-06-06 03:09:04', '2024-06-06 03:09:04'),
(4, 'uploads/1717645760840-bannerfiver3.png', '4', 0, '2024-06-06 03:49:22', '2024-06-06 03:49:22'),
(5, 'uploads/1717650087517-bannerfiver4.png', '5', 0, '2024-06-06 05:01:27', '2024-06-06 05:01:27'),
(6, 'uploads/1717658834959-bannerfiver1.png', '6', 0, '2024-06-06 07:27:15', '2024-06-06 07:27:15'),
(7, 'uploads/1717658835063-bannerfiver3.png', '6', 0, '2024-06-06 07:27:15', '2024-06-06 07:27:15'),
(8, 'uploads/1717658835067-bannerfiver4.png', '6', 0, '2024-06-06 07:27:15', '2024-06-06 07:27:15'),
(9, 'uploads/1717658835072-scema-db-TokoSembako.png', '6', 0, '2024-06-06 07:27:15', '2024-06-06 07:27:15'),
(10, 'uploads/1717663153972-Invitation.png', '7', 0, '2024-06-06 08:39:15', '2024-06-06 08:39:15'),
(11, 'uploads/1717663153978-Advertising.png', '7', 0, '2024-06-06 08:39:15', '2024-06-06 08:39:15'),
(12, 'uploads/1717663155624-CVAkbar(Mei2024).pdf', '7', 0, '2024-06-06 08:39:15', '2024-06-06 08:39:15'),
(13, 'uploads/1717725988536-1717658835067-bannerfiver4.png', '9', 0, '2024-06-07 02:06:28', '2024-06-07 02:06:28');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data untuk tabel `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20240527025813-create-employees.js'),
('20240527030259-create-tickets.js'),
('20240529100353-create-files.js');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tickets`
--

CREATE TABLE `tickets` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `divisi` varchar(255) NOT NULL,
  `deadline` datetime DEFAULT NULL,
  `request_by` varchar(255) DEFAULT NULL,
  `request_by_date` datetime DEFAULT NULL,
  `request_by_div` varchar(255) DEFAULT NULL,
  `assigned_by` varchar(255) DEFAULT NULL,
  `assigned_to` varchar(255) DEFAULT NULL,
  `assigned_date` datetime DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `is_deleted` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tickets`
--

INSERT INTO `tickets` (`id`, `title`, `description`, `divisi`, `deadline`, `request_by`, `request_by_date`, `request_by_div`, `assigned_by`, `assigned_to`, `assigned_date`, `status`, `is_deleted`, `createdAt`, `updatedAt`) VALUES
(1, 'Tiket 1', 'Tiket 1\r\ntes ting', 'IT', '2024-06-06 00:00:00', 'KCG-05545', '2024-06-06 01:57:57', 'IT', 'KCG-05545', 'KCG-05526', '2024-06-06 02:35:59', 'pending', 0, '2024-06-06 01:57:57', '2024-06-06 02:35:59'),
(2, 'Tiket 2', 'Tiket 2\r\ntes\r\ntes\r\ntes', 'IT', '2024-06-06 00:00:00', 'KCG-05545', '2024-06-06 02:45:01', 'IT', 'KCG-05545', 'KCG-05579', '2024-06-06 02:47:10', 'pending', 0, '2024-06-06 02:45:01', '2024-06-06 02:47:10'),
(3, 'Tiket 3', 'Tiket 3', 'IT', '2024-06-06 00:00:00', 'KCG-05545', '2024-06-06 03:09:04', 'IT', 'KCG-05515', 'KCG-05545', '2000-06-06 03:44:56', 'solve', 0, '2024-06-06 03:09:04', '2024-06-06 05:00:28'),
(4, 'Tiket 4', 'tiket 4', 'IT', '2024-06-07 03:50:00', 'KCG-05545', '2024-06-06 03:49:20', 'IT', 'KCG-05545', 'KCG-05545', '2024-06-06 03:50:52', 'process', 0, '2024-06-06 03:49:20', '2024-06-06 07:26:30'),
(5, 'Tiket 5', 'tiket 5', 'IT', '2024-06-06 07:02:00', 'KCG-05545', '2024-06-06 05:01:27', 'IT', 'KCG-05545', 'KCG-05526', '2024-06-06 05:02:54', 'pending', 0, '2024-06-06 05:01:27', '2024-06-06 05:02:54'),
(6, 'Tiket 6', 'Tiket 6', 'IT', NULL, 'KCG-05545', '2024-06-06 07:27:15', 'IT', NULL, NULL, NULL, 'new', 0, '2024-06-06 07:27:15', '2024-06-06 07:27:15'),
(7, 'Tiket 7', 'tiket 7', 'IT', '2024-06-14 02:58:00', 'KCG-05545', '2024-06-06 08:39:15', 'IT', 'KCG-05545', 'KCG-05545', '2024-06-07 02:58:21', 'solve', 0, '2024-06-06 08:39:15', '2024-06-07 02:59:35'),
(8, 'Tiket 8', 'tiket 8', 'IT', NULL, 'KCG-05545', '2024-06-07 01:47:10', 'IT', NULL, NULL, NULL, 'new', 0, '2024-06-07 01:47:10', '2024-06-07 01:47:10'),
(9, 'Tiket 9', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has su', 'IT', NULL, 'KCG-05545', '2024-06-07 02:06:28', 'IT', NULL, NULL, NULL, 'new', 0, '2024-06-07 02:06:28', '2024-06-07 02:06:28');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employee_id`);

--
-- Indeks untuk tabel `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeks untuk tabel `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `files`
--
ALTER TABLE `files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT untuk tabel `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
