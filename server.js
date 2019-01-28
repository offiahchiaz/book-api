const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

const genre_controller = require('./controllers/genreController');
const book_controller = require('./controllers/bookController');

mongoose.connect('mongodb://localhost:27017/bookapi', {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err));


app.use(bodyParser.json());

// ============= GENRES ============ //

// POST Genres
app.post('/api/genres', genre_controller.add_genre);

// GET Genres
app.get('/api/genres', genre_controller.genre_list);

// Get Genre
app.get('/api/genres/:id', genre_controller.genre_detail);

// PATCH Genre
app.patch('/api/genres/:id', genre_controller.update_genre);

// DELETE Genre
app.delete('/api/genres/:id', genre_controller.delete_genre);


// ============= BOOKS ============ //

// POST Books
app.post('/api/books', book_controller.add_book);


// GET Books
app.get('/api/books', book_controller.book_list);

// GET Book
app.get('/api/books/:id', book_controller.book_detail);

// PATCH BOOK
app.patch('/api/books/:id', book_controller.update_book);

// DELETE Book
app.delete('/api/books/:id', book_controller.delete_book);



app.listen(port, (err) => {
    if (err) return console.log(err);
    console.log(`Server running on port ${port}`);
})
