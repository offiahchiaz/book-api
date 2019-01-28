const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const async = require('async');
const _ = require('lodash');

// const Genre = require('./models/genre');
// const Book = require('./models/book');

const genre_controller = require('./controllers/genreController');

const app = express();
const port = process.env.PORT || 5000;

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
app.get('/api/books/:id', (req, res) => {
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

// PATCH BOOK
app.patch('/api/books/:id', (req, res) => {
    let bookId = req.params.id;
    let body = _.pick(req.body, ['title', 'genre', 'author', 'price', 'image_url', 'buy_url']);

    if (!ObjectID.isValid(bookId)) {
        return res.status(400).send('Invalid ID');
    }

    Book.findOneAndUpdate({_id: bookId}, {$set: body}, {new: true}).then((book) => {
        if (!book) {
            return res.status(404).send('Book with this ID not found');
        }

        res.send({book});
    }).catch((e) => {
        res.status(400).send();
    });
});

// DELETE Book
app.delete('/api/books/:id', (req, res) => {
    let bookId = req.params.id;

    if (!ObjectID.isValid(bookId)) {
        return res.status(404).send('Invalid ID');
    }

    Book.findOneAndRemove({_id: bookId}).then((book) => {
        if (!book) {
            return res.status(404).send('Book does not exist');
        }

        res.send({book});
    }).catch((e) => {
        res.status(400).send();
    });
});



app.listen(port, (err) => {
    if (err) return console.log(err);
    console.log(`Server running on port ${port}`);
})
