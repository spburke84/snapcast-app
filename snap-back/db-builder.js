const express = require('express'),
      app = express();

const mtg = require('mtgsdk');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Card = require('./models/Cards');

mongoose.connect('mongodb://localhost:27017/data/db');
const db = mongoose.connection;

db.on('open', () => {
    console.log('connected to mongo');
});


app.get('/', (req,res) => {
    let getCards = 'https://api.magicthegathering.io/v1/cards?page=1';
    
    mtg.card.all()
    .on('data', (card) => {
        console.log(card.name);
        seedDatabase(card);
    });

    /*mtg.card.find(94)
       .then(result => {
           console.log(result);
           seedDatabase(result);
       });*/

    /*mtg.card.where({page: 4, pageSize: 100})
       .then(cards => {
           //console.log(card)
           console.log(cards[1]);
           seedDatabase(cards);           
       });*/
       res.send('success');
});


app.listen(8080, () => {
    console.log('db-builder is listening on port 8080');
});

function seedDatabase(result) {
    //for(let i=0; i < result.length; i++) {
        let newCard = new Card({
            /*name: result[i].name,
            manaCost: result[i].manaCost,
            cmc: result[i].cmc,
            colors: result[i].colors,
            colorIdentity: result[i].colorIdentity,
            cType: result[i].type,
            sType: result[i].supertypes,
            types: result[i].types,
            rarity: result[i].rarity,
            xSet: result[i].set,
            text: result[i].text,
            artist: result[i].artist,
            number: result[i].number,
            power: result[i].power,
            toughness: result[i].toughness,
            layout: result[i].layout,
            multiverseId: result[i].multiverseid,
            imgUrl: result[i].imageUrl*/
            
            name: result.name,
            manaCost: result.manaCost,
            cmc: result.cmc,
            colors: result.colors,
            colorIdentity: result.colorIdentity,
            cType: result.type,
            sType: result.subtypes,
            types: result.types,
            rarity: result.rarity,
            xSet: result.setName,
            text: result.text,
            flavor: result.flavor,
            artist: result.artist,
            number: result.number,
            power: result.power,
            toughness: result.toughness,
            layout: result.layout,
            multiverseId: result.multiverseid,
            imgUrl: result.imageUrl
       });
        newCard.save().then(savedCard => {
            console.log(savedCard);
        });
   // }
}