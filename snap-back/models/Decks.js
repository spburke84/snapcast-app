const mongoose = require('mongoose');

const deckSchema = new mongoose.Schema({
    name: {type: String, required: true},
    author: String,
    format: String,
    cards: Array,
    isPublished: Boolean
});

const Deck = mongoose.model('Deck', deckSchema);

module.exports = Deck;