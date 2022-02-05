const express = require('express');
const puppeteer = require('puppeteer');

const app = express();


app.post('/aaa', function(req, res) {
	let yes = req.query
	console.log(yes);
  });



app.get('/api/test', (req, res) => {
	(async () => {
		const browser = await puppeteer.launch();
		const page = await browser.newPage(); 
		await page.goto("https://www.amazon.jobs/en/search?offset=0&result_limit=10&sort=relevant&job_type%5B%5D=Full-Time&country%5B%5D=USA&state%5B%5D=Arizona&distanceType=Mi&radius=24km&latitude=&longitude=&loc_group_id=&loc_query=&base_query=front%20end&city=&country=&region=&county=&query_options=&", {
			waitUntil: "networkidle2",
		  });
		let data = await page.$$eval('.job-title', links => {
			links = links.map(element => element.textContent)
			return links[0]
		});
		console.log(data);
		res.json(data);
	})();
}); 


const port = 5000;

app.listen(port, () => `Server running on port ${port}`);