require('dotenv').config();
var express = require('express');
var app = express();
var redis = require('redis');

// Create a Redis client
var redisClient = redis.createClient();
redisClient.connect().catch(console.error);


redisClient.on('connect', function () {
  console.log('Redis client connected');
}).on('error', function (error) {
  console.log('Redis error: ', error);
});

// Use the router on the path '/ps4', passing in Redis client to the router
var ps4Router = require('./ps4')(redisClient);
app.use('/ps4', ps4Router);

// Listen on port 3000
app.listen(3000, function () {
    console.log('App listening on port 3000!');
  });


// Setting up Pug as the view engine
app.set('view engine', 'pug');
app.set('views', './views');

// GET form for getting a joke
app.get('/', function (req, res) {
    res.render('form');
});
