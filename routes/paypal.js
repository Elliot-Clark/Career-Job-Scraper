const express = require('express');
const puppeteer = require('puppeteer');

const router = express.Router();

router.post('/paypal', function(req, res) {
	let jobSearchInput = req.query;
		(async () => {
			const companyName = "Paypal"
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
			+ jobSearchInput.city
			+ "&facetcountry=us"
			await page.goto(URL, {
				waitUntil: "networkidle2",
			});

            let jobTitles = await page.$$eval('td > a, .job-result-title', links => {
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

			if(!jobTitles[0]) {
				let results = [companyName, URL]
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

			let jobLocations = await page.$$eval('.job-location-line', links => {
				links = links.map(element => element.textContent)
				let arr = []
				for (let i = 0; i < 5; i++) {
					arr.push(links[i]);
				}
				return arr
			});


			let jobPostDate = await page.$$eval('.job-result-date-posted-cell', links => {
				links = links.map(element => element.textContent)
				let arr = []
				for (let i = 0; i < 5; i++) {
					arr.push(links[i].replace(/(\s\s\s*)/g, ''));
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