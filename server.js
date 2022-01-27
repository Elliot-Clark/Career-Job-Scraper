const express = require('express');
const request = require('request');
const cheerio = require('cheerio');

const app = express();
//fewfdvfdbdfdvdffaedfd
app.get('/api/test', (req, res) => {
  function scrapingRequest() {
    return new Promise(resolve => {
        request('https://www.marketwatch.com/investing/stock/gme?mod=quote_search', (error, response, html) => {
          if (!error && response.statusCode == 200) {} {
            const $ = cheerio.load(response.body);
            let data = $('h2 bg-quote').text();
            resolve(data);
          }
        });
    });
  }
  async function asyncCall() {
    const result = await scrapingRequest();
    res.json(result);
  }
  asyncCall();
}); 


const port = 5000;

app.listen(port, () => `Server running on port ${port}`);