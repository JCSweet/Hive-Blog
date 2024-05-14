-- create database
CREATE DATABASE hive_blog;
USE hive_blog;


-- create table for posts
CREATE TABLE posts (
    post_ID SERIAL PRIMARY KEY ,
    post_Author VARCHAR(255) NOT NULL,
    post_Content VARCHAR(500) NOT NULL,
    post_Likes INTEGER,
    post_Timestamp TIMESTAMP NOT NULL DEFAULT NOW()
);

-- dummy data for posts
INSERT INTO posts (post_Author, post_Content, post_Likes)
VALUES ('Jordan', 'who can tell me the best way to clean kitty 🤮 out of the carpet?', 3),
('Jordan', 'Hello thar mateys!', 1); 


-- create table for comments
CREATE TABLE comments (
    comment_ID SERIAL PRIMARY KEY,
    comment_Author VARCHAR(255) NOT NULL,
    comment_Content VARCHAR(500) NOT NULL,
    post_ID INTEGER NOT NULL REFERENCES posts(post_ID),
    comment_Timestamp TIMESTAMP NOT NULL DEFAULT NOW()
);

-- dummy data for comments
INSERT INTO comments (comment_Author, comment_Content, post_ID)
VALUES ('🙀', '😬', 1),
('🏴‍☠️', 'Yarrrrr', 2),
('Jordan', '...Is this thing on?', 2);

