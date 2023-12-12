module.exports = function(redisClient) {
    var request = require('request');
    var fetch = require('node-fetch');
    var express = require('express');
    var router = express.Router();

    function getJokeFromAPI(options) {
        return new Promise((resolve, reject) => {
            request.get(options, function(err, response, body) {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(body));
                }
            });
        });
    }

    // POST route using a promise
    router.post('/promise-random-joke', function(req, res) {
        const cacheKey = 'promise-random-joke';
        redisClient.get(cacheKey, async (err, cachedData) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (cachedData) {
                // Cache hit
                return res.json({ source: 'cache', data: JSON.parse(cachedData) });
            } else {
                // Cache miss
                const options = {
                    url: process.env.RAPIDAPI_URL,
                    headers: {
                        'X-RapidAPI-Key': process.env.JOKE_API_KEY,
                        'X-RapidAPI-Host': process.env.RAPIDAPI_HOST
                    }
                };

                try {
                    const data = await getJokeFromAPI(options);
                    redisClient.setex(cacheKey, 15, JSON.stringify(data));
                    res.json({ source: 'api', data });
                } catch (error) {
                    res.status(500).json({ error: error.message });
                }
            }
        });
    });

    // POST route using async/await
    router.post('/async-random-joke', async function(req, res) {
        const cacheKey = 'async-random-joke';
        redisClient.get(cacheKey, async (err, cachedData) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (cachedData) {
                // Cache hit
                return res.json({ source: 'cache', data: JSON.parse(cachedData) });
            } else {
                // Cache miss
                const url = process.env.RAPIDAPI_URL;
                const headers = {
                    'X-RapidAPI-Key': process.env.JOKE_API_KEY,
                    'X-RapidAPI-Host': process.env.RAPIDAPI_HOST
                };

                try {
                    const response = await fetch(url, { headers });
                    const data = await response.json();
                    redisClient.setex(cacheKey, 15, JSON.stringify(data));
                    res.json({ source: 'api', data });
                } catch (error) {
                    res.status(500).json({ error: error.message });
                }
            }
        });
    });

    // POST route that uses a callback to handle the async API call
    router.post('/callback-random-joke', function(req, res) {
        const cacheKey = 'callback-random-joke';
        redisClient.get(cacheKey, (err, cachedData) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (cachedData) {
                // Cache hit
                return res.json({ source: 'cache', data: JSON.parse(cachedData) });
            } else {
                // Cache miss
                const options = {
                    url: process.env.RAPIDAPI_URL,
                    headers: {
                        'X-RapidAPI-Key': process.env.JOKE_API_KEY,
                        'X-RapidAPI-Host': process.env.RAPIDAPI_HOST
                    }
                };

                request.get(options, function(err, response, body) {
                    if (err) {
                        res.status(500).json({ error: 'Error fetching joke' });
                    } else {
                        const data = JSON.parse(body);
                        redisClient.setex(cacheKey, 15, JSON.stringify(data));
                        res.json({ source: 'api', data });
                    }
                });
            }
        });
    });

    return router;
};
