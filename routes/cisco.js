const express = require('express');
const puppeteer = require('puppeteer');

const router = express.Router();

router.post('/cisco', function(req, res) {
	let jobSearchInput = req.query;
		(async () => {
			const companyName = "Cisco"
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
 
			const URL = "https://jobs.cisco.com/jobs/SearchJobs/"
            + jobSearchInput.jobTitleSearch.split(' ').join("%20")
            + (jobSearchInput.USstate ? "%20" +  jobSearchInput.USstate.split(' ').join("%20") : "" )
            + "?21178=%5B169482%5D&21178_format=6020&listFilterMode=1"
			await page.goto(URL, {
				waitUntil: "networkidle2",
			});

            let jobTitles = await page.$$eval('tr > td > a', links => {
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

			let jobLinks = await page.$$eval('tr > td > a', links => {
				links = links.map(element => element.href)
				let arr = []
				for (let i = 0; i < 5; i++) {
					arr.push(links[i]);
				}
				return arr
			});

			let jobLocations = await page.$$eval('tr > td', links => {
				links = links.map(element => element.textContent)
				let arr = []
				for (let i = 0; i < 24; i++) {
					arr.push(links[i]);
				}
                let arr2 = [arr[3], arr[8], arr[13], arr[18], arr[23]]
				return arr2
			});

			let results = [companyName, URL, ""];
			for (i = 0; i <jobTitles.length; i++) {
				results.push([jobTitles[i], jobLinks[i], jobLocations[i]])
			}
			console.log(results);
			res.json(results);
		})();
	});

module.exports = router