
INSERT INTO movies(movie_name) VALUES
('Lion King'),
('Baby Driver'),
('Finding Nemo');

INSERT INTO reviews(movie_id, review) VALUES
(1, 'GOOD'),
(2, 'BAD'),
(3, 'GOOD');

-- SELECT * FROM movies;

SELECT movies.id, movie_name, review FROM reviews LEFT JOIN movies ON movie_id = movies.id;