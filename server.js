const express = require('express');
const puppeteer = require('puppeteer');

const app = express();


app.get('/api/test', (req, res) => {
	(async () => {
		const browser = await puppeteer.launch();
		const page = await browser.newPage(); 
		await page.goto("https://elliot-clark.com/", {
			waitUntil: "networkidle2",
		  });
		let data = await page.$$eval('section div li', links => {
			links = links.map(element => element.textContent)
			return links
		});
		console.log(data);
		res.json(data);
	})();
}); 


const port = 5000;

app.listen(port, () => `Server running on port ${port}`);