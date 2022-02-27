const express = require('express');
const puppeteer = require('puppeteer');

const router = express.Router();

router.post('/intel', function(req, res) {
	let jobSearchInput = req.query;
    
    console.log(jobSearchInput);
		(async () => {
			const companyName = "Intel"
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
            //&f:@city=[Phoenix]

		
			//Each URL has to be customized to fit each individual website
			const URL = "https://jobs.intel.com/page/show/search-results#q="
            + jobSearchInput.jobTitleSearch.split(' ').join("%20")
            + "&t=Jobs&sort=relevancy&layout=table&f:@countryfullname=[United%20States]"
            + (jobSearchInput.city ? "&f:@city=[" + jobSearchInput.city.split(' ').join("%20") + "]" : '')
			await page.goto(URL, {
				waitUntil: "networkidle2",
			});


			let jobTitles = await page.$$eval('.CoveoResultLink', links => {
				links = links.map(element => element.textContent)
				let arr = []
				for (let i = 0; i < 10; i++) {
					if(!links[i]) {
						break
					}
					arr.push(links[i]);
				}
                let arr2 = [arr[0], arr[2], arr[4], arr[6], arr[8]]
				return arr2
			});

			//Escape function if the scraped results return nothing from targeted site
			if(!jobTitles[0]) {
				let results = [companyName, URL, ["No Results."]]
				res.json(results)
				return
			}

			let jobLinks = await page.$$eval('.CoveoResultLink', links => {
				links = links.map(element => element.href)
				let arr = []
				for (let i = 0; i < 10; i++) {
                    arr.push(links[i]);
				}
                let arr2 = [arr[0], arr[2], arr[4], arr[6], arr[8]]

				return arr2
			});

            let jobLocations = await page.$$eval('.CoveoFieldValue', links => {
				links = links.map(element => element.textContent)
				let arr = []
				for (let i = 0; i < 20; i++) {
					arr.push(links[i]);
				}
                let arr2 = [arr[1], arr[5], arr[9], arr[13], arr[17]]
				return arr2
			});


			let results = [companyName, URL, ""];
			for (i = 0; i <jobTitles.length; i++) {
				results.push([jobTitles[i], jobLinks[i], jobLocations[i],])
			}
			console.log(results);
			res.json(results);
		})();
	});

module.exports = router


