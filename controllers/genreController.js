const _ = require('lodash');
const {ObjectID} = require('mongodb');

const Genre = require('../models/genre');

// Add Genre
exports.add_genre = (req, res) => {
    let genre = new Genre({
        name: req.body.name
    });

    genre.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
};

// Display all genres
exports.genre_list = (req, res) => {
    Genre.find({}).then((genres) => {
        res.json({genres});
    }, (e)=> {
            res.status(400).json(e);
    });
};

// Display detail for one genre
exports.genre_detail = (req, res) => {
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
};

// Update genre
exports.update_genre = (req, res) => {
    let genreId = req.params.id;
    let body = _.pick(req.body, ['name']);

    if (!ObjectID.isValid(genreId)) {
        return res.status(404).send('Invalid ID');
    }

    Genre.findOneAndUpdate({_id: genreId}, {$set: body}, {new: true}).then((genre) => {
        if (!genre) {
            return res.status(404).send('Genre does not exist');
        }

        res.send({genre});
    }).catch((e) => {
        res.status(400).send();
    });
};

// Delete genre 
exports.delete_genre = (req, res) => {
    let genreId = req.params.id;

    if (!ObjectID.isValid(genreId)) {
        return res.status(404).send('Invalid ID');
    }

    Genre.findOneAndRemove({_id: genreId}).then((genre) => {
        if (!genre) {
            return res.status(404).send('Genre does not exist');
        }

        res.send({genre});
    }).catch((e) => {
        res.status(400).send();
    });
};