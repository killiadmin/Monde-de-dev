DROP
DATABASE IF EXISTS `mondededev`;

CREATE
DATABASE `mondededev`;

USE
`mondededev`;

DROP TABLE IF EXISTS users_li_themes;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS themes;
DROP TABLE IF EXISTS users;

CREATE TABLE users
(
    user_id    INT AUTO_INCREMENT PRIMARY KEY,
    email      VARCHAR(255) NOT NULL UNIQUE,
    username   VARCHAR(100) NOT NULL UNIQUE,
    password   VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE themes
(
    them_id      INT AUTO_INCREMENT PRIMARY KEY,
    them_title   VARCHAR(255) NOT NULL,
    them_content TEXT,
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE articles
(
    art_id          INT AUTO_INCREMENT PRIMARY KEY,
    art_author      INT          NOT NULL,
    them_associated INT,
    art_title       VARCHAR(255) NOT NULL,
    art_content     TEXT         NOT NULL,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (art_author) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (them_associated) REFERENCES themes (them_id) ON DELETE SET NULL
);

CREATE TABLE comments
(
    comment_id  INT AUTO_INCREMENT PRIMARY KEY,
    com_author  INT  NOT NULL,
    com_content TEXT NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (com_author) REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE users_li_themes
(
    user_id INT NOT NULL,
    them_id INT NOT NULL,
    PRIMARY KEY (user_id, them_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (them_id) REFERENCES themes (them_id) ON DELETE CASCADE
);
