const express = require('express');
const puppeteer = require('puppeteer');

const router = express.Router();

router.post('/adobe', function(req, res) {
	let jobSearchInput = req.query;
		(async () => {
			const companyName = "Adobe"
			

			//Each URL has to be customized to fit each individual website
			const URL = "https://adobe.wd5.myworkdayjobs.com/external_experienced?q="
            + jobSearchInput.jobTitleSearch.split(' ').join("+")
            + "+"
            + (jobSearchInput.USstate ? jobSearchInput.USstate + "+" : '')
            + (jobSearchInput.city ? jobSearchInput.city : '')

			let results = [companyName, URL, "Results cannot be displayed. Click above to view the search results directly"];
			console.log(results);
			res.json(results);
		})();
	});

module.exports = router


