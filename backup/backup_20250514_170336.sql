-- MariaDB dump 10.19  Distrib 10.4.34-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: todolist
-- ------------------------------------------------------
-- Server version	10.4.34-MariaDB-1:10.4.34+maria~ubu2004

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `todolist`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `todolist` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;

USE `todolist`;

--
-- Table structure for table `doctrine_migration_versions`
--

DROP TABLE IF EXISTS `doctrine_migration_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctrine_migration_versions`
--

LOCK TABLES `doctrine_migration_versions` WRITE;
/*!40000 ALTER TABLE `doctrine_migration_versions` DISABLE KEYS */;
INSERT INTO `doctrine_migration_versions` VALUES ('DoctrineMigrations\\Version20250304215841','2025-03-04 21:59:33',11),('DoctrineMigrations\\Version20250306132607','2025-03-06 13:26:35',11),('DoctrineMigrations\\Version20250328222847','2025-04-19 12:31:09',28),('DoctrineMigrations\\Version20250419122123','2025-04-19 12:31:09',70),('DoctrineMigrations\\Version20250419124608','2025-04-19 12:46:21',159),('DoctrineMigrations\\Version20250419134954','2025-04-19 13:50:14',60);
/*!40000 ALTER TABLE `doctrine_migration_versions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id_id` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` longtext DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `updated_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `task_list_id` int(11) DEFAULT NULL,
  `assigned_user_id` int(11) DEFAULT NULL,
  `progress` smallint(6) NOT NULL,
  `due_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_527EDB25224F3C61` (`task_list_id`),
  UNIQUE KEY `UNIQ_527EDB25ADF66B1A` (`assigned_user_id`),
  KEY `IDX_527EDB259D86650F` (`user_id_id`),
  CONSTRAINT `FK_527EDB25224F3C61` FOREIGN KEY (`task_list_id`) REFERENCES `task_list` (`id`),
  CONSTRAINT `FK_527EDB259D86650F` FOREIGN KEY (`user_id_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_527EDB25ADF66B1A` FOREIGN KEY (`assigned_user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task_list`
--

DROP TABLE IF EXISTS `task_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `task_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `owner_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` longtext DEFAULT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `updated_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_list`
--

LOCK TABLES `task_list` WRITE;
/*!40000 ALTER TABLE `task_list` DISABLE KEYS */;
INSERT INTO `task_list` VALUES (3,9,'My Test List ','Aadasdas','2025-04-29 20:24:44','2025-04-29 20:24:44'),(5,9,'TTEST','gsfsdfgsdfgdgdf','2025-04-29 20:27:10','2025-04-29 20:27:10');
/*!40000 ALTER TABLE `task_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task_list_user`
--

DROP TABLE IF EXISTS `task_list_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `task_list_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task_list_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `role` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_B777C4F1224F3C61` (`task_list_id`),
  KEY `IDX_B777C4F1A76ED395` (`user_id`),
  CONSTRAINT `FK_B777C4F1224F3C61` FOREIGN KEY (`task_list_id`) REFERENCES `task_list` (`id`),
  CONSTRAINT `FK_B777C4F1A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_list_user`
--

LOCK TABLES `task_list_user` WRITE;
/*!40000 ALTER TABLE `task_list_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `task_list_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(180) NOT NULL,
  `roles` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '(DC2Type:json)' CHECK (json_valid(`roles`)),
  `password` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `street` varchar(255) NOT NULL,
  `postcode` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_IDENTIFIER_EMAIL` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (6,'igorchernin+3424@yahoo.com','[]','$2y$13$pQUHvUD5jUKLrbdYPQYrfe7uWE9tAZzMFF7QOfN9oQnwvIwxIbGx2','Ihor','Chernin','Ukraine','Kyiv','adaasd','03117','12343425423'),(8,'igorchernin+333333@yahoo.com','[]','$2y$13$peweXS3gpcSCvNxACSnu1.g1CxBeh88anSkmzUOb3NEVjc.9gBbhK','Ihor','Chernin','Ukraine','Kyiv','Asdada','03117','0509459407'),(10,'i.chernin+90909@yahoo.com','[]','$2y$13$/qkNBo1DZ134ARiM.flUw.ISP5m5PWxgSoK9zGhdnRVvLkxKso8ny','Ihor','Cherni','Ukraine','Kyiv','Beresteiska','03117','+3805094594234'),(11,'igor+23123@yahoo.com','[]','$2y$13$kh/HdjE2odcFz15LZXM/q.HYIBgho4M7tCdwavW0KKRw1/zaQZIjW','Ihor','Chernin','Ukraine','Kyiv','Beresteyska 67-G flat 27','03117','1231242342'),(12,'i.chernin+222@yahoo.com','[]','$2y$13$osQ6IqPqS72.iUUd/5lztu5QWIb/kcxmMcF.xGxh6jVWPuZ9x.QSu','Ihor','Cherni','Ukraine','Kyiv','Beresteyska 67','03117','23425345'),(13,'igorchernin+90909@yahoo.com','[]','$2y$13$ki6lYtlkpOFgY51IJIhzbOU6O8hH2QN6cLbO/GRmmHCDgANmGR1Wq','Ihor','Chernin','UA','Kyiv','Asdasdas','03117','1231243254234123423');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-14 14:03:37
