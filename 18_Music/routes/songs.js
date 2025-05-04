const express = require('express');
const router = express.Router();
const Song = require('../models/Song');

// Insert 5 songs
router.get('/insert', async (req, res) => {
    await Song.insertMany([
        { songName: "ABC", film: "DEF", musicDirector: "GHI", singer: "JKL" },
        { songName: "XYZ", film: "DEF", musicDirector: "GHI", singer: "JKL" },
        { songName: "Love Song", film: "Heartbeats", musicDirector: "AR Rahman", singer: "Arijit Singh" },
        { songName: "Joy Ride", film: "Trip", musicDirector: "Pritam", singer: "Neha Kakkar" },
        { songName: "Thunder", film: "Storm", musicDirector: "Pritam", singer: "Arijit Singh" },
    ]);
    res.send("5 Songs Inserted");
});

// Total count and list all
router.get('/', async (req, res) => {
    const songs = await Song.find();
    const count = await Song.countDocuments();
    res.render('index', { songs, count });
});

// Filter: Music Director
router.get('/director/:name', async (req, res) => {
    const songs = await Song.find({ musicDirector: req.params.name });
    res.json(songs);
});

// Filter: Director + Singer
router.get('/director/:director/singer/:singer', async (req, res) => {
    const songs = await Song.find({
        musicDirector: req.params.director,
        singer: req.params.singer,
    });
    res.json(songs);
});

// Delete a song
router.get('/delete/:name', async (req, res) => {
    await Song.deleteOne({ songName: req.params.name });
    res.send("Deleted song: " + req.params.name);
});

// Add a new song
router.post('/add', async (req, res) => {
    const newSong = new Song(req.body);
    await newSong.save();
    res.redirect('/songs');
});

// Update with Actor/Actress
router.get('/update/:name', async (req, res) => {
    await Song.updateOne(
        { songName: req.params.name },
        { actor: "MNO", actress: "PQR" }
    );
    res.send("Updated song with actor/actress");
});

// Filter by singer and film
router.get('/film/:film/singer/:singer', async (req, res) => {
    const songs = await Song.find({
        film: req.params.film,
        singer: req.params.singer,
    });
    res.json(songs);
});

module.exports = router;
