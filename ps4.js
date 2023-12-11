var express = require('express');
var request = require('request');
var fetch = require('node-fetch');
var router = express.Router();


// POST route using a promise
router.post('/promise-random-joke', function(req, res) {
    const options = {
        url: process.env.RAPIDAPI_URL,
        headers: {
            'X-RapidAPI-Key': process.env.JOKE_API_KEY,
            'X-RapidAPI-Host': process.env.RAPIDAPI_HOST
        }
    };

    // Promise wrapping the request
    new Promise(function(resolve, reject) {
        request.get(options, function(err, response, body) {
            if (err) {
                res.render('joke', { joke: null, error: 'Error fetching joke' })
            } else {
                const data = JSON.parse(body);
                res.render('joke', { joke: data.body[0], error: null})
            }
        });
    })
    .then(body => {
        res.json(JSON.parse(body));
    })
    .catch(error => {
        res.status(500).json({ error });
    });
});

// POST route using async/await
router.post('/async-random-joke', async function(req, res) {
    const url = process.env.RAPIDAPI_URL;
    const headers = {
        'X-RapidAPI-Key': process.env.JOKE_API_KEY,
        'X-RapidAPI-Host': process.env.RAPIDAPI_HOST
    };

    try {
        const response = await fetch(url, { headers: headers });
        const data = await response.json();
        // res.json(data);
        res.render('joke', { joke: data.body[0], error: null})
    } catch (error) {
        // res.status(500).json({ error: error.message });
        res.render('joke', { joke: null, error: 'Error fetching joke' })
    }
});

// POST route that uses a callback to handle the async API call
router.post('/callback-random-joke', function(req, res) {
    const options = {
        url: process.env.RAPIDAPI_URL,
        headers: {
            'X-RapidAPI-Key': process.env.JOKE_API_KEY,
            'X-RapidAPI-Host': process.env.RAPIDAPI_HOST
        }
    };
    
    // Callback
    request.get(options, function(err, response, body) {
        if (err) {
            res.render('joke', { joke: null, error: 'Error fetching joke' })
        } else {
            const parsedBody = JSON.parse(body);
            res.render('joke', { joke: parsedBody.body[0], error: null });
        }
    });
});

module.exports = router;
