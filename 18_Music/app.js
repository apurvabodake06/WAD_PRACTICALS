const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const songRoutes = require('./routes/songs');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

mongoose.connect("mongodb://127.0.0.1:27017/music");


app.use('/songs', songRoutes);

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
