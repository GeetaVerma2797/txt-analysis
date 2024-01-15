CREATE DATABASE `txt_analysis`;
USE `txt_analysis`;
CREATE TABLE `txt_analysis`.`files` (`id` INT(11) NOT NULL AUTO_INCREMENT , `file_name` VARCHAR(255) NOT NULL , `file_path` VARCHAR(255) NOT NULL , `metadata` LONGTEXT NULL , `created_at` DATETIME NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;
CREATE TABLE `txt_analysis`.`tasks` (`id` INT(11) NOT NULL AUTO_INCREMENT , `file_id` INT(11) NOT NULL , `count_words` BIGINT NULL , `count_uique_words` INT(11) NULL , `k_words` VARCHAR(255) NULL , `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`)) ENGINE = InnoDB;
