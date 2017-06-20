const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    manaCost: String,
    cmc: Number,
    colors: String,
    colorIdentity: String,
    cType: String,
    sType: String,
    types: String,
    rarity: String,
    xSet: String,
    text: String,
    flavor: String,
    artist: String,
    number: String,
    power: String,
    toughness: String,
    layout: String,
    multiverseId: {type: Number, required: true, unique: true},
    imgUrl: {type: String, required: true}
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;