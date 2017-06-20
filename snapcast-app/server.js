const express = require("express");
const app = express();
const fs = require("fs");
const mtg = require('mtgsdk');

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use('/', express.static('public'));

app.get('/', function(req,res) {

    fs.readFile("articlesIn.txt", "utf8", function(err, data) {
        if (err) throw err;

        response = data;

            const arts = {
            articles: JSON.parse(response)
        };

        res.render('index', arts);
    });
});

app.get('/about', function(req,res) {
    res.render('about');
});

app.get('/standard', function(req,res) {
    res.render('standard');
});

app.get('/modern', function(req,res) {
    res.render('test-index');
});

app.get('/legacy', function(req,res) {
    res.render('legacy');
});

app.listen(8080, () => {
    console.log("App is listening on Port 8080");
});

/*mtg.card.find(3).then(result => {
    var newCard = result.card;
    console.log(newCard);
});*/


