const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const async = require('async');

const Genre = require('./models/genre');
const Book = require('./models/book');

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/bookapi', {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err));


app.use(bodyParser.json());

// ============= GENRES ============ //

// POST Genres
app.post('/api/genres', (req, res) => {
    let genre = new Genre({
        name: req.body.name
    });

    genre.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

// GET Genres
app.get('/api/genres', (req, res) => {
    Genre.find({}).then((genres) => {
        res.json({genres});
    }, (e)=> {
            res.status(400).json(e);
    });
});

// Get Genre
app.get('/api/genre/:id', (req, res) => {
    const genreId = req.params.id;

    if (!ObjectID.isValid(genreId)) {
        return res.status(404).send('Invalid ID');
    }

    Genre.findOne({
        _id: genreId
    }).then((genre) => {
        if (!genre) {
            return res.status(404).send('Genre with this ID does not exist');
        }
        res.send({genre});
    }).catch((e) => {
        res.status(400).send(e);
    });
});


// ============= BOOKS ============ //

// POST Books
app.post('/api/books', (req, res) => {

    let book = new Book({
        title: req.body.title,
        genre: req.body.genre, 
        author: req.body.author, 
        price: req.body.price,  
        image_url: req.body.image_url, 
        buy_url: req.body.buy_url
    });

    book.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});


// GET Books
app.get('/api/books', (req, res) => {
    Book.find({}).then((books) => {
        res.send({books});
    }, (e) => {
        res.status(400).send(e);
    });
});

// GET Book
app.get('/api/book/:id', (req, res) => {
    const bookId = req.params.id;

    if (!ObjectID.isValid(bookId)) {
        return res.status(404).send('Invalid ID');
    }

    Book.findOne({
        _id: bookId
    }).then((book) => {
        if (!book) {
            return res.status(404).send('Book with this ID does not exist');
        }
        res.send({book});
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.listen(port, (err) => {
    if (err) return console.log(err);
    console.log(`Server running on port ${port}`);
})
