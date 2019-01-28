const _ = require('lodash');
const {ObjectID} = require('mongodb');

const Book = require('../models/book');

// Add Book
exports.add_book = (req, res) => {
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
};

// Display all books
exports.book_list = (req, res) => {
    Book.find({}).then((books) => {
        res.send({books});
    }, (e) => {
        res.status(400).send(e);
    });
};

// Display detail for one book
exports.book_detail = (req, res) => {
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
};

// Update book
exports.update_book = (req, res) => {
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
};

// Delete book
exports.delete_book = (req, res) => {
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
};