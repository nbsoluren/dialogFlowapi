DROP DATABASE IF EXISTS `DialogFlow`;
CREATE DATABASE `DialogFlow`;

USE `DialogFlow`

DROP TABLE IF EXISTS `book`;
CREATE TABLE `book` (
    `bookId` int(10) NOT NULL AUTO_INCREMENT,
    `name` varchar(256) DEFAULT NULL,
    `author` varchar(256) DEFAULT NULL,
    `category` varchar(256) DEFAULT NULL,
    `isBorrowed` boolean,

  PRIMARY KEY (`bookId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
    `bookId` int(10)  NOT NULL AUTO_INCREMENT,
    `userId`  int(10) DEFAULT NULL,
    PRIMARY KEY (`userId`),
    CONSTRAINT `user_bookId_fk` FOREIGN KEY (`bookId`) REFERENCES `book` (`bookId`));
