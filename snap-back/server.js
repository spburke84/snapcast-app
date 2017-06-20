const express = require('express'),
      app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

const Card = require('./models/Cards');
const Deck = require('./models/Decks');

mongoose.connect('mongodb://localhost:27017/data/db');
const db = mongoose.connection;

app.listen(8080, () => {
    console.log('snapcaster-back is listening on Port 8080');
});

db.on('open', () => {
    console.log('mongo connection successful');
});

/*app.get('/create-deck', (req, res) => {
    let newDeck = Deck({
        name: 'Temur Marvel',
        author: 'Brad Nelson',
        format: 'Standard',
        cards:  [{card: "Rogue Refiner", qty: 4, sideboard: false},
                {card: "Ulamog, the Ceaseless Hunger", qty: 4, sideboard: false},
                {card: "Chandra, Flamecaller", qty: 2, sideboard: false},
                {card: "Attune with Aether", qty: 4, sideboard: false},
                {card: "Censor", qty: 3, sideboard: false},
                {card: "Dissenter's Deliverance", qty: 3, sideboard: false},
                {card: "Harnessed Lightning", qty: 4, sideboard: false},
                {card: "Negate", qty: 1, sideboard: false},
                {card: "Glimmer of Genius", qty: 4, sideboard: false},
                {card: "Woodweaver's Puzzleknot", qty: 4, sideboard: false},
                {card: "Aetherworks Marvel", qty: 4, sideboard: false},
                {card: "Aether Hub", qty: 4, sideboard: false},
                {card: "Botanical Sanctum", qty: 3, sideboard: false},
                {card: "Cinder Glade", qty: 2, sideboard: false},
                {card: "Forest", qty: 5, sideboard: false},
                {card: "Island", qty: 1, sideboard: false},
                {card: "Lumbering Falls", qty: 1, sideboard: false},
                {card: "Mountain", qty: 1, sideboard: false},
                {card: "Shrine of the Forsaken Gods", qty: 2, sideboard: false},
                {card: "Spirebluff Canal", qty: 4, sideboard: false},
                {card: "Shrine of the Forsaken Gods", qty: 1, sideboard: true},
                {card: "Dispel", qty: 2, sideboard: true},
                {card: "Aether Meltdown", qty: 3, sideboard: true},
                {card: "Negate", qty: 1, sideboard: true},
                {card: "Radiant Flames", qty: 2, sideboard: true},
                {card: "Tireless Tracker", qty: 3, sideboard: true},
                {card: "Confiscation Coup", qty: 1, sideboard: true},
                {card: "Ulvenwald Hydra", qty: 2, sideboard: true}],
        isPublished: false
    });
    newDeck.save()
           .then(deck => {
            res.send(deck);
           });
});*/

app.post('/save-deck', (req, res) => {
    let newDeck = Deck(req.body);
    newDeck.save()
           .then(deck => {
            res.send(deck);
           });
});

app.put('/save-deck/:deckId', (req, res) => {
    let newDeck = Deck(req.body);
    Deck.findOneAndUpdate({_id: req.params.deckId}, newDeck)
       .then(deck => {
           res.send(deck);
    });
});

app.post('/load', (req, res) => {
    let findAuthor = req.body.user;
    Deck.find({author: findAuthor})
        .then(decks => {
            res.send(decks);
        });
});

app.get('/lists/:format', (req, res) => {
    Deck.find({format: req.params.format})
        .then(result => {
            res.json(result);
        });
});

app.get('/decks/:deckId', (req, res) => {
    Deck.find({_id: req.params.deckId})
        .then(result => {
            res.json(result);
        });
});

app.get('/cardSearch', (req, res) => {
    Card.find({}).select('name')
        .then(result => {
            res.json(result);
        });
});

app.get('/get-card/:id', (req, res) => {
    Card.findById({_id: req.params.id})
        .then(result => {
            res.json(result);
        });
});