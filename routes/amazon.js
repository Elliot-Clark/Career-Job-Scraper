const express = require('express');
const puppeteer = require('puppeteer');

const router = express.Router();

router.post('/amazon', function(req, res) {
	let jobSearchInput = req.query;
		(async () => {
			const companyName = "Amazon"
			const browser = await puppeteer.launch();
			const page = await browser.newPage(); 
			await page.setRequestInterception(true);
			page.on('request', (req) => {
				if (req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image') {
				req.abort();
				} else {
				req.continue();
				}
			});

			
			//Each URL has to be customized to fit each individual website
			const URL = "https://www.amazon.jobs/en/search?base_query=" 
				+ jobSearchInput.jobTitleSearch.split(' ').join("+")
				+ "&loc_query=&latitude=&longitude=&loc_group_id=&invalid_location=false&country=&city=&region=&county=USA&city=&region="
				+ jobSearchInput.USstate.split(' ').join("+")
				+ "&county="
			await page.goto(URL, {
				waitUntil: "networkidle2",
			});


			let jobTitles = await page.$$eval('.job-title', links => {
				links = links.map(element => element.textContent)
				let arr = []
				for (let i = 0; i < 5; i++) {
					if(!links[i]) {
						break
					}
					arr.push(links[i]);
				}
				return arr
			});

			//Escape function if the scraped results return nothing from targeted site
			if(!jobTitles[0]) {
				let results = [companyName, URL, ["No Results. Note: This company's search works only for certain and exact city locations OR no City input entered at all"]]
				res.json(results)
				return
			}

			let jobLinks = await page.$$eval('.job-link', links => {
				links = links.map(element => element.href)
				let arr = []
				for (let i = 0; i < 5; i++) {
					arr.push(links[i]);
				}
				return arr
			});

			let jobLocations = await page.$$eval('.location-and-id', links => {
				links = links.map(element => element.textContent)
				let arr = []
				for (let i = 0; i < 5; i++) {
					arr.push(links[i]);
				}
				return arr
			});

			let jobPostDate = await page.$$eval('.posting-date', links => {
				links = links.map(element => element.textContent)
				console.log(links);
				let arr = []
				for (let i = 0; i < 5; i++) {
					arr.push(links[i]);
				}
				return arr
			});

			let results = [companyName, URL, ""];
			for (i = 0; i <jobTitles.length; i++) {
				results.push([jobTitles[i], jobLinks[i], jobLocations[i], jobPostDate[i]])
			}
			console.log(results);
			res.json(results);
		})();
	});

module.exports = router


