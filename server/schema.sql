CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  /* Describe your table here.*/
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `text` VARCHAR(160) NULL DEFAULT NULL,
  `roomname` VARCHAR(20) NOT NULL DEFAULT 'lobby',
  `user_id` INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
);

/* Create other tables and define schemas for them here! */

CREATE TABLE users (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(20) NOT NULL DEFAULT 'anonymous',
  PRIMARY KEY (`id`)
);


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

