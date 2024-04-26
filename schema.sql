-- create database
CREATE DATABASE hive_blog;
USE hive_blog;


-- create table for posts
CREATE TABLE posts (
    postID INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    postAuthor VARCHAR(255) NOT NULL,
    postContent VARCHAR(255) NOT NULL,
    postLikes INT,
    postTimestamp TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO posts (postAuthor, postContent, postLikes)
VALUES ('Jordan', 'who can tell me the best way to clean kitty 🤮 out of the carpet?', 3),
('Jordan', 'Hello thar mateys!', 1); 


-- create table for comments
CREATE TABLE comments (
    commentID INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    commentAuthor VARCHAR(255) NOT NULL,
    commentContent VARCHAR(255) NOT NULL,
    commentParentPost INT NOT NULL,
    commentTimestamp TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO comments (commentAuthor, commentContent, commentParentPost)
VALUES ('🙀', '😬', 1),
('🏴‍☠️', 'Yarrrrr', 2),
('Jordan', '...Is this thing on?', 2);

