const express = require('express');
const puppeteer = require('puppeteer');

const router = express.Router();

router.post('/jobSearch', function(req, res) {
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

			let jobLinks = await page.$$eval('.job-link', links => {
				links = links.map(element => element.href)
				let eleArr = []
				for (let i = 0; i < 5; i++) {
					eleArr.push(links[i]);
				}
				return eleArr
			});

			let jobLocations = await page.$$eval('.location-and-id', links => {
				links = links.map(element => element.textContent)
				let eleArr = []
				for (let i = 0; i < 5; i++) {
					eleArr.push(links[i]);
				}
				return eleArr
			});

			let results = ["Amazon", URL];
			for (i = 0; i <jobTitles.length; i++) {
				results.push([jobTitles[i], jobLinks[i], jobLocations[i]])
			}
			console.log(results);
			res.json(results);
		})();
	});

module.exports = router




















// router.get('/jobSearch', (req, res) => {
// 	console.log("Hello");
// 	test.post('/jobSearch', function(req, res) {
// 		let jobSearchInput = req.query;
// 			(async () => {
// 				const browser = await puppeteer.launch();
// 				const page = await browser.newPage(); 
// 				const URL = "https://www.amazon.jobs/en/search?offset=0&result_limit=10&sort=relevant&" 
// 					+ (jobSearchInput.country ? 'country%5B%5D=' + jobSearchInput.country : '')
// 					+ (jobSearchInput.USstate ? '&state%5B%5D=' + jobSearchInput.USstate.split(' ').join("%20") : '')
// 					+ (jobSearchInput.city ? '&city%5B%5D=' + jobSearchInput.city.split(' ').join("%20") : '')
// 					+ "&distanceType=Mi&radius=24km&latitude=&longitude=&loc_group_id=&loc_query="
// 					+ "&base_query=" + jobSearchInput.jobTitleSearch.split(' ').join("%20")
// 					+ "&city=&country=&region=&county=&query_options=&"
// 				await page.goto(URL, {
// 					waitUntil: "networkidle2",
// 				});
	
	
// 				let jobTitles = await page.$$eval('.job-title', links => {
// 					links = links.map(element => element.textContent)
// 					let eleArr = []
// 					for (let i = 0; i < 5; i++) {
// 						eleArr.push(links[i]);
// 					}
// 					return eleArr
// 				});
// 				console.log(jobTitles);
	
// 				let jobLinks = await page.$$eval('.job-link', links => {
// 					links = links.map(element => element.href)
// 					let eleArr = []
// 					for (let i = 0; i < 5; i++) {
// 						eleArr.push(links[i]);
// 					}
// 					return eleArr
// 				});
// 				console.log(jobLinks);
	
// 				let jobLocations = await page.$$eval('.location-and-id', links => {
// 					links = links.map(element => element.textContent)
// 					let eleArr = []
// 					for (let i = 0; i < 5; i++) {
// 						eleArr.push(links[i]);
// 					}
// 					return eleArr
// 				});
// 				console.log(jobLocations);
	
// 				let results = ["Amazon", URL];
// 				for (i = 0; i <jobTitles.length; i++) {
// 					results.push([jobTitles[i], jobLinks[i], jobLocations[i]])
// 				}
// 				res.json(results);
// 			})();
// 	  });
// })





