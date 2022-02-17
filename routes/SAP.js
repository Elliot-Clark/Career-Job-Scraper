const express = require('express');
const puppeteer = require('puppeteer');

const router = express.Router();

router.post('/sap', function(req, res) {
	let jobSearchInput = req.query;
		(async () => {
			const companyName = "SAP"
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
			const URL = "https://jobs.sap.com/search/?createNewAlert=false&q="
            + jobSearchInput.jobTitleSearch.split(' ').join("+")
            + "&optionsFacetsDD_department=&optionsFacetsDD_customfield3=&optionsFacetsDD_country=&locationsearch="
            + (jobSearchInput.USstate ? "+" + jobSearchInput.USstate.split(' ').join("+") : '')
            + (jobSearchInput.city ? "+" + jobSearchInput.city.split(' ').join("+") : '')
			await page.goto(URL, {
				waitUntil: "networkidle2",
			});


			let jobTitles = await page.$$eval('.jobTitle-link', links => {
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
				let results = [companyName, URL, ["No Results"]]
				res.json(results)
				return
			}

			let jobLinks = await page.$$eval('.jobTitle-link', links => {
				links = links.map(element => element.href)
				let arr = []
				for (let i = 0; i < 5; i++) {
					arr.push(links[i]);
				}
				return arr
			});

            //First two results for this particular class name need to be skipped with the for loop
			let jobLocations = await page.$$eval('.jobLocation', links => {
				links = links.map(element => element.textContent)
				let arr = []
				for (let i = 2; i < 7; i++) {
					arr.push(links[i]);
				}
				return arr
			});

			let results = [companyName, URL, "Posting date not listed to be scraped. Click on individual jobs for further information."];
			for (i = 0; i <jobTitles.length; i++) {
				results.push([jobTitles[i], jobLinks[i], jobLocations[i]])
			}
			console.log(results);
			res.json(results);
		})();
	});

module.exports = router
