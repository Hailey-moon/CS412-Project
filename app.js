require('dotenv').config();
var express = require('express');
var app = express();
var ps4Router = require('./ps4');

// Use the router on the path '/ps4'
app.use('/ps4', ps4Router);

// Listen on port 3000
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });


// Setting up Pug as the view engine
app.set('view engine', 'pug');
app.set('views', './views');

// GET form for getting a joke
app.get('/', function (req, res) {
    res.render('form');
});
