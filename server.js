const express = require('express');
const mongoose = require('mongoose');
const {ObjectID} = require('mongodb');

const Genre = require('./models/genre');
const Book = require('./models/book');

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/bookapi', {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(express.urlencoded({ extended: true }));

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
    Genre.find({})
        .then((genres) => {
            res.json({genres});
        }, (e)=> {
            res.status(400).json(e);
        });
});

// GET Books
app.get('/api/books', (req, res) => {
    Book.find({})
        .then((books) => {
            res.send({books});
        }, (e) => {
            res.status(400).send(e);
        });
});

// GET Book
app.get('/api/book/:id', (req, res) => {
    const bookId = req.params.id;

    if (!ObjectID.isValid(bookId)) {
        return res.status(404).send();
    }

    Book.findOne({
        _id: bookId
    }).then((book) => {
        if (!book) {
            return res.status(404).send();
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
