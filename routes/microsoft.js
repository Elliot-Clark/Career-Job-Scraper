const express = require('express');
const puppeteer = require('puppeteer');

const router = express.Router();

router.post('/microsoft', function(req, res) {
	let jobSearchInput = req.query;
		(async () => {
			const companyName = "Microsoft"
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
			const URL = "https://careers.microsoft.com/us/en/search-results?keywords="
            + jobSearchInput.jobTitleSearch.split(' ').join("%20")
            + (jobSearchInput.USstate ? "%20" + jobSearchInput.USstate.split(' ').join("%20") : '')
            + (jobSearchInput.city ? "%20" + jobSearchInput.city.split(' ').join("%20") : '')
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

			let jobLinks = await page.$$eval('div > h2 > a', links => {
				links = links.map(element => element.href)
				let arr = []
				for (let i = 0; i < 5; i++) {
					arr.push(links[i]);
				}
				return arr
			});

			let jobLocations = await page.$$eval('.job-location', links => {
				links = links.map(element => element.textContent)
				let arr = []
				for (let i = 0; i < 5; i++) {
					arr.push(links[i]);
				}
				return arr
			});

			let jobPostDate = await page.$$eval('.job-date', links => {
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


