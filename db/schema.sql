DROP DATABASE IF EXISTS movies_db;
CREATE DATABASE movies_db;

\c movies_db;

CREATE TABLE movies(
    id SERIAL PRIMARY KEY,
    movie_name VARCHAR(100) NOT NULL
);

CREATE TABLE reviews(
    id SERIAL,
    movie_id INTEGER NOT NULL,
    review TEXT NOT NULL,
    FOREIGN KEY (movie_id)
    REFERENCES movies(id)
);