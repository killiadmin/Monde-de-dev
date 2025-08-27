# Monde de dev

Orion wishes to create the next social network dedicated to developers: MDD (deviation world). The purpose of the MDD social network is to help developers seeking work, thanks to the connection, by encouraging links and collaboration between peers who have common interests. MDD could become a pool for the recruitment of profiles missing from companies.

## Tools required

Before installing the project, you must check that you have all the required tools :

- Java Development version 17

- Apache Maven

- MySQL

- Angular CLI version 14

## Configuration

1. Create a new database in your Mysql console or Mysql workbench

Create a new database for your application and add all the tables to your database:

```sql
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
    role       VARCHAR(255) NOT NULL DEFAULT 'USER',
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
    com_article INT  NOT NULL,
    com_author  INT  NOT NULL,
    com_content TEXT NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (com_author) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (com_article) REFERENCES articles (art_id) ON DELETE CASCADE
);

CREATE TABLE users_li_themes
(
    id      INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    them_id INT NOT NULL,
    UNIQUE KEY unique_user_theme (user_id, them_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (them_id) REFERENCES themes (them_id) ON DELETE CASCADE
);
```

## Installation Procedure

**Cloning the project:**

1. `git clone https://github.com/killiadmin/Monde-de-dev.git`

**Set up the `.env` file on the path /back using the `.env.example` file:**

```properties
# ==========================
# .env.example
# ==========================
# Database configuration

DB_URL=
DB_USERNAME=
DB_PASSWORD=

APP_SECRET_KEY=
```

2. Run the application `mvn spring-boot:run` on the path /back
3. Run the application `npm install` on the path /front
3. And then `ng serve` for launching the application Monde de dev
