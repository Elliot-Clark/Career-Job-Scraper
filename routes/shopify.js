const express = require('express');
const puppeteer = require('puppeteer');

const router = express.Router();

router.post('/shopify', function(req, res) {
	let jobSearchInput = req.query;
		(async () => {
			const companyName = "Shopify"
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

			if (jobSearchInput.country.toLowerCase() === "united states of america" || jobSearchInput.country.toLowerCase() === 'usa' || jobSearchInput.country.toLowerCase() === "america") {
                jobSearchInput.country = "United States"
            }
			//https://www.shopify.com/careers/search?keywords=Front%20End&sort=
			//https://www.shopify.com/careers/search?locations%5B%5D=United%20States&keywords=Front%20End&sort=
			//https://www.shopify.com/careers/search?locations%5B%5D=United%20Stateskeywords=Front%20End&sort=


			//Each URL has to be customized to fit each individual website
			const URL = "https://www.shopify.com/careers/search?"
			+ (jobSearchInput.country ? "locations%5B%5D=" + jobSearchInput.country.split(' ').join("%20") : '')
			+ "&keywords="
			+ jobSearchInput.jobTitleSearch.split(' ').join("%20")
			+ "&sort="
			await page.goto(URL, {
				waitUntil: "networkidle2",
			});

			let jobTitles = await page.$$eval('.jobs-table__cell > a', links => {
				links = links.map(element => element.textContent)
				let arr = []
				for (let i = 0; i < 5; i++) {
					arr.push(links[i]);
				}
				return arr
			});

			//Escape function if the scraped results return nothing from targeted site
			// if(!jobTitles[0]) {
			// 	let results = [companyName, URL, ["No Results. Note: This company's search works only for certain and exact city locations OR no City input entered at all"]]
			// 	res.json(results)
			// 	return
			// }

			let jobLinks = await page.$$eval('tr > td > a', links => {
				links = links.map(element => element.href)
				let arr = []
				for (let i = 0; i < 5; i++) {
					arr.push(links[i]);
				}
				return arr
			});

			let results = [companyName, URL, "Posting date not listed to be scraped. Click on individual jobs for further information."];
			for (i = 0; i <jobTitles.length; i++) {
				results.push([jobTitles[i], jobLinks[i]])
			}
			console.log(results);
			res.json(results);
		})();
	});

module.exports = router


