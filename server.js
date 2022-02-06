const express = require('express');
const puppeteer = require('puppeteer');

const app = express();


app.post('/jobSearch', function(req, res) {
	let jobSearchInput = req.query;
		(async () => {
			const browser = await puppeteer.launch();
			const page = await browser.newPage(); 
			const URL = "https://www.amazon.jobs/en/search?offset=0&result_limit=10&sort=relevant&" 
				+ (jobSearchInput.country ? 'country%5B%5D=' + jobSearchInput.country : '')
				+ (jobSearchInput.USstate ? '&state%5B%5D=' + jobSearchInput.USstate.split(' ').join("%20") : '')
				+ (jobSearchInput.city ? '&city%5B%5D=' + jobSearchInput.city.split(' ').join("%20") : '')
				+ "&distanceType=Mi&radius=24km&latitude=&longitude=&loc_group_id=&loc_query="
				+ "&base_query=" + jobSearchInput.jobTitleSearch.split(' ').join("%20")
				+ "&city=&country=&region=&county=&query_options=&"
			await page.goto(URL, {
				waitUntil: "networkidle2",
			});


			let jobTitles = await page.$$eval('.job-title', links => {
				links = links.map(element => element.textContent)
				let eleArr = []
				for (let i = 0; i < 5; i++) {
					eleArr.push(links[i]);
				}
				return eleArr
			});
			console.log(jobTitles);

			let jobLinks = await page.$$eval('.job-link', links => {
				links = links.map(element => element.href)
				let eleArr = []
				for (let i = 0; i < 5; i++) {
					eleArr.push(links[i]);
				}
				return eleArr
			});
			console.log(jobLinks);

			let jobLocations = await page.$$eval('.location-and-id', links => {
				links = links.map(element => element.textContent)
				let eleArr = []
				for (let i = 0; i < 5; i++) {
					eleArr.push(links[i]);
				}
				return eleArr
			});
			console.log(jobLocations);

			let results = ["Amazon", URL];
			for (i = 0; i <jobTitles.length; i++) {
				results.push([jobTitles[i], jobLinks[i], jobLocations[i]])
			}
			res.json(results);
		})();
  });



// app.get('/api/test', (req, res) => {
// 	(async () => {
// 		const browser = await puppeteer.launch();
// 		const page = await browser.newPage(); 
// 		await page.goto("https://www.amazon.jobs/en/search?offset=0&result_limit=10&sort=relevant&job_type%5B%5D=Full-Time&country%5B%5D=USA&state%5B%5D=Arizona&distanceType=Mi&radius=24km&latitude=&longitude=&loc_group_id=&loc_query=&base_query=front%20end&city=&country=&region=&county=&query_options=&", {
// 			waitUntil: "networkidle2",
// 		  });
// 		let data = await page.$$eval('.job-title', links => {
// 			links = links.map(element => element.textContent)
// 			return links[0]
// 		});
// 		console.log(data);
// 		res.json(data);
// 	})();
// }); 


const port = 5000;

app.listen(port, () => `Server running on port ${port}`);