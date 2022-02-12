const express = require('express');
const puppeteer = require('puppeteer');

const router = express.Router();

router.post('/facebook', function(req, res) {
	let jobSearchInput = req.query;
		(async () => {
			const companyName = "Facebook"
			
			//Each URL has to be customized to fit each individual website
			const URL = "https://www.metacareers.com/jobs?q="
            + jobSearchInput.jobTitleSearch.split(' ').join("%20")
			+ (jobSearchInput.USstate ? "%20" + jobSearchInput.USstate.split(' ').join("%20") : '' )
			+ (jobSearchInput.city ? "%20" + jobSearchInput.city.split(' ').join("%20") : '' )

			let results = [companyName, URL, "Results cannot be displayed. Click above to view the search results directly"];
			console.log(results);
			res.json(results);
		})();
	});

module.exports = router


