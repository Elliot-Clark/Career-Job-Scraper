const express = require('express');
const puppeteer = require('puppeteer');

const router = express.Router();

router.post('/paypal', function(req, res) {
	let jobSearchInput = req.query;
		(async () => {
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


			const URL = "https://jobsearch.paypal-corp.com/en-US/search?keywords="
			+ jobSearchInput.jobTitleSearch.split(' ').join("%20")
			+ "&location="
			+ jobSearchInput.zipCode
			+ "&facetcountry=us"
			await page.goto(URL, {
				waitUntil: "networkidle2",
			});

            let jobTitles = await page.$$eval('td > a, .job-result-title', links => {
				links = links.map(element => element.textContent)
				let arr = []
				for (let i = 0; i < 5; i++) {
					arr.push(links[i]);
				}
				return arr
			});
			console.log(jobTitles);

			if(!jobTitles[0]) {
				console.log("Quitting");
				let results = ["Paypal", URL]
				res.json(results)
				return
			}

			let jobLinks = await page.$$eval('td > a, .job-result-title', links => {
				links = links.map(element => element.href)
				let arr = []
				for (let i = 0; i < 5; i++) {
					arr.push(links[i]);
				}
				return arr
			});
			console.log(jobLinks);

			let jobLocations = await page.$$eval('.job-location-line', links => {
				links = links.map(element => element.textContent)
				let arr = []
				for (let i = 0; i < 5; i++) {
					arr.push(links[i]);
				}
				return arr
			});
			console.log(jobLocations);


			let jobPostDate = await page.$$eval('.job-result-date-posted-cell', links => {
				links = links.map(element => element.textContent)
				let arr = []
				for (let i = 0; i < 5; i++) {
					arr.push(links[i].replace(/(\s\s\s*)/g, ''));
				}
				return arr
			});
			console.log(jobPostDate);

			let results = ["Paypal", URL];
			for (i = 0; i <jobTitles.length; i++) {
				results.push([jobTitles[i], jobLinks[i], jobLocations[i], jobPostDate[i]])
			}

			res.json(results);
		})();
	});

module.exports = router





