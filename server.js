const express = require('express');
const { Pool } = require('pg');

const PORT = process.env.PORT || 3001;

const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const pool = new Pool(
	{
		// TODO: Enter PostgreSQL username
		user: 'postgres',
		// TODO: Enter PostgreSQL password
		password: 'password',
		host: 'localhost',
		database: 'movies_db',
	},
	console.log(`Connected to the movies_db database.`)
);

pool.connect();

app.get('/api/movies', (req, res) => {
	pool.query('SELECT * FROM movies', function (err, { rows }) {
		// console.log(rows);
		res.json(rows);
	});
});

app.get('/api/movie-reviews', (req, res) => {
	pool.query(
		'SELECT movie_name, review FROM reviews LEFT JOIN movies ON movie_id = movies.id',
		function (err, { rows }) {
			res.json(rows);
		}
	);
});

app.post('/api/add-movie', (req, res) => {
	pool.query(
		'INSERT INTO movies(movie_name) VALUES($1)',
		[req.body.movie_name],
		function (err, { rows }) {
			if (err) {
				console.log(err);
				return res.status(500).send('check terminal for errors');
			}
			console.log(rows);
			res.json(req.body);
		}
	);
});

app.delete('/api/movie/:id', (req, res) => {
	const movie = parseInt(req.params.id);

	pool.query(`DELETE FROM movies WHERE id = $1`, [movie], (err, { rows }) => {
		if (err) {
			console.log(err);
		}
		console.log(rows);
		res.json(req.body);
	});
});

app.use((req, res) => {
	res.status(404).end();
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
