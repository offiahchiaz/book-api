const express = require('express');
const mongoose = require('mongoose');
const Genre = require('./models/genre');

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/bookapi', {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello World!');
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

app.listen(port, (err) => {
    if (err) return console.log(err);
    console.log(`Server running on port ${port}`);
})
