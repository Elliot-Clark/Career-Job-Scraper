const express = require('express');
const puppeteer = require('puppeteer');

const router = express.Router();

router.post('/crateandbarrel', function(req, res) {
	let jobSearchInput = req.query;
		(async () => {
			const companyName = "Crate and Barrel"
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
			const URL = "https://jobs.crateandbarrel.com/search-jobs/"
            + jobSearchInput.jobTitleSearch 
            + "/"
            + (jobSearchInput.city ? 
                jobSearchInput.city.split(' ').join("%20")
                + "%2C%20AZ/351/1/4/6252001-5551752-5303754-5308655/33x44838/-112x07404/50/2"
                :
                "/351/1?fl=6252001,6251999"
              )
			await page.goto(URL, {
				waitUntil: "networkidle2",
			});


			let jobTitles = await page.$$eval('li > a > h3', links => {
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

			let jobLinks = await page.$$eval('li > a', links => {
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

			let jobPostDate = await page.$$eval('.job-date-posted', links => {
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


