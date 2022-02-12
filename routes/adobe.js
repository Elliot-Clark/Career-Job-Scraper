const express = require('express');
const puppeteer = require('puppeteer');

const router = express.Router();

router.post('/adobe', function(req, res) {
	let jobSearchInput = req.query;
		(async () => {
			const companyName = "Adobe"
			
			if (jobSearchInput.country.toLowerCase() === "united states of america" || jobSearchInput.country.toLowerCase() === 'usa' || jobSearchInput.country.toLowerCase() === "america") {
                jobSearchInput.country = "United States"
            }

			//Each URL has to be customized to fit each individual website
			const URL = "https://adobe.wd5.myworkdayjobs.com/external_experienced?q="
            + jobSearchInput.jobTitleSearch.split(' ').join("+")
            + "+"
            + (jobSearchInput.country ? jobSearchInput.country + "+" : '')
            + (jobSearchInput.USstate ? jobSearchInput.USstate + "+" : '')
            + (jobSearchInput.city ? jobSearchInput.city : '')

			let results = [companyName, URL, "Results cannot be displayed. Click above to view the search results directly"];
			console.log(results);
			res.json(results);
		})();
	});

module.exports = router


