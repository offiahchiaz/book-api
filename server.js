const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/bookapi', {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, (err) => {
    if (err) return console.log(err);
    console.log(`Server running on port ${port}`);
})
