-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema sound_wavedb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema sound_wavedb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sound_wavedb` DEFAULT CHARACTER SET utf8 ;
USE `sound_wavedb` ;

-- -----------------------------------------------------
-- Table `sound_wavedb`.`event`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sound_wavedb`.`event` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `date` DATE NOT NULL,
  `starting_hour` TIME NOT NULL,
  `location` VARCHAR(250) NULL,
  `address` VARCHAR(250) NOT NULL,
  `description` TEXT NOT NULL,
  `image` TEXT NOT NULL,
  `is_validated` TINYINT NULL,
  `lineup` TEXT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sound_wavedb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sound_wavedb`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(80) NOT NULL,
  `lastname` VARCHAR(80) NOT NULL,
  `email` VARCHAR(250) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `image` TEXT NULL,
  `role` ENUM("client", "crew", "admin") NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sound_wavedb`.`crew`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sound_wavedb`.`crew` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(80) NOT NULL,
  `image` TEXT NOT NULL,
  `description` LONGTEXT NULL,
  `owner_id` INT NOT NULL,
  `is_validated` TINYINT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_crew_user1_idx` (`owner_id` ASC) VISIBLE,
  CONSTRAINT `fk_crew_user1`
    FOREIGN KEY (`owner_id`)
    REFERENCES `sound_wavedb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sound_wavedb`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sound_wavedb`.`category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `style` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sound_wavedb`.`user_event_like`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sound_wavedb`.`user_event_like` (
  `event_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`event_id`, `user_id`),
  INDEX `fk_event_has_user_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_event_has_user_event_idx` (`event_id` ASC) VISIBLE,
  CONSTRAINT `fk_event_has_user_event`
    FOREIGN KEY (`event_id`)
    REFERENCES `sound_wavedb`.`event` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_event_has_user_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `sound_wavedb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sound_wavedb`.`user_crew_follow`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sound_wavedb`.`user_crew_follow` (
  `crew_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`crew_id`, `user_id`),
  INDEX `fk_crew_has_user_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_crew_has_user_crew1_idx` (`crew_id` ASC) VISIBLE,
  CONSTRAINT `fk_crew_has_user_crew1`
    FOREIGN KEY (`crew_id`)
    REFERENCES `sound_wavedb`.`crew` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_crew_has_user_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `sound_wavedb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sound_wavedb`.`crew_event`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sound_wavedb`.`crew_event` (
  `event_id` INT NOT NULL,
  `crew_id` INT NOT NULL,
  PRIMARY KEY (`event_id`, `crew_id`),
  INDEX `fk_event_has_crew_crew1_idx` (`crew_id` ASC) VISIBLE,
  INDEX `fk_event_has_crew_event1_idx` (`event_id` ASC) VISIBLE,
  CONSTRAINT `fk_event_has_crew_event1`
    FOREIGN KEY (`event_id`)
    REFERENCES `sound_wavedb`.`event` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_event_has_crew_crew1`
    FOREIGN KEY (`crew_id`)
    REFERENCES `sound_wavedb`.`crew` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sound_wavedb`.`category_event`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sound_wavedb`.`category_event` (
  `category_id` INT NOT NULL,
  `event_id` INT NOT NULL,
  PRIMARY KEY (`category_id`, `event_id`),
  INDEX `fk_event_has_category_category1_idx` (`category_id` ASC) VISIBLE,
  INDEX `fk_category_event_event1_idx` (`event_id` ASC) VISIBLE,
  CONSTRAINT `fk_event_has_category_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `sound_wavedb`.`category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_category_event_event1`
    FOREIGN KEY (`event_id`)
    REFERENCES `sound_wavedb`.`event` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sound_wavedb`.`category_crew`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sound_wavedb`.`category_crew` (
  `category_id` INT NOT NULL,
  `crew_id` INT NOT NULL,
  PRIMARY KEY (`category_id`),
  INDEX `fk_category_has_crew_crew1_idx` (`crew_id` ASC) VISIBLE,
  INDEX `fk_category_has_crew_category1_idx` (`category_id` ASC) VISIBLE,
  CONSTRAINT `fk_category_has_crew_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `sound_wavedb`.`category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_category_has_crew_crew1`
    FOREIGN KEY (`crew_id`)
    REFERENCES `sound_wavedb`.`crew` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;