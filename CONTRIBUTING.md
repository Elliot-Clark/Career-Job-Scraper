## To contribute new companies to this project: 

The first step is obviously finding a company that is not already included in the project and said company must have a compatible career page. With how this app functions, these career pages have to have URLs that change to match your search input. I.e company.com/?search=text%20I%20typed%20In. The search results page will also need to be compatible with Puppeteer's web scraping. The ones with dynamically created classNames on their HTML elements usually are not compatible.

After you have found your working career page to add there are 3 existing files in this project that need small adjustments as well as you will need to create 2 addition files. Details below. Change the "New Company" placeholder in bold to match the name of the company you are adding. Be sure to match upper and lowercase from the examples provided. 

1.  
client -> src -> components -> clientInput -> checkbox.js  
Add a label with the existing collection of labels in alphabetical order.
```
<label htmlFor="**NewCompany**"><input className="comapnyCheckbox" type="checkbox" id="**newcompany**" defaultChecked/>**New Company**</label>
```

2.  
client -> src -> components -> clientInput -> clientInput.js  
Add this if statement under the existing statements. Order does not matter this time.
```
if (document.getElementById("**newcompany**").checked) {
    axios.post('/**newcompany**', {}, {
        params: { jobTitleSearch: jobSearchInput, city: city, USstate: USstate,}
    }).then(response => {
        this.props.handleCallBack(response.data);
    });
} 
```  

3. 
server.js  
Add simple route statement below the rest.
```
const **newcompany** = require('./routes/**newcompany**.js');
app.use(**newcompany**)
```  

4. 
client -> src -> components -> clientInput -> jobDisplay -> logos
Add a simple png image containing the logo of new company.  

5. 
Finally you will have to add a custom made js file in the "routes" folder. Below is a sample template that you will need to customize to fit each new career page.
```
const express = require('express');
const puppeteer = require('puppeteer');

const router = express.Router();

router.post('/**newcompany**', function(req, res) {
	let jobSearchInput = req.query;
		(async () => {
			const companyName = "**New Company**"
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

			
			//Each URL string has to be customized to fit each individual website
            //You will need to do a few sample searches on your company's career page and analyze how the URL changes to match your inputted parameters.
            //Example: URL = "company.com/page/show/search-results#q=**MY%20SEARCH%20PARAMS**&t=Jobs&sort=relevancy&layout=table&f:@countryfullname=[United%20States]&f:@city=[**CITY**]"
            //Once you have the logic behind making their URLs it is a simple matter of designing your own string by taking the params inputted into this web app's search that were sent from the Front End.
            //  The main search param the user typed in will be: jobSearchInput.jobSearchInput
            //  The city the user input. If there is any: jobSearchInput.city
            //  The state the user select. If there is any: jobSearchInput.USstate
            // Remember there are no spaces in URLs, so split the text and join it with either "+" or "%20", depending on what they use.
            // Some career pages don't have a custom place for cities or states like the example above. In that case, simply append the city (if none, then append state) to the end of the search. I.e. Web Developer Los Angeles. That will work fine to narrow done most searches.
            //Definitely recommend seeing how this was done in other files in the route folder.

			const URL = 
            
			await page.goto(URL, {
				waitUntil: "networkidle2",
			});

            //The code below tells the web scraper to target specific HTML elements and grab their text content. 
            //This part can be tricky. Suggest you look in other files in the routes folder for examples
            //Or visit https://github.com/puppeteer/puppeteer/blob/main/docs/api.md#pageevalselector-pagefunction-args

			let jobTitles = await page.$$eval('**CLASS NAME FOR HTML ELEMENTS CONTAINING JOB TITLES AS THEIR INNER TEXT**', links => {
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
            //Suggest you comment out the 5 lines below temporarily if you want better feedback from your debugging. Otherwise null results will not be console logged to your terminal.
			if(!jobTitles[0]) {
				let results = [companyName, URL, ["No Results. Note: This company's search works only for certain and exact city locations OR no City input entered at all"]]
				res.json(results)
				return
			}

			let jobLinks = await page.$$eval('**CLASS NAME FOR HTML ELEMENTS CONTAINING JOB TITLES AS THEIR INNER TEXT. SAME AS ABOVE**', links => {
				links = links.map(element => element.href)
				let arr = []
				for (let i = 0; i < 5; i++) {
					arr.push(links[i]);
				}
				return arr
			});

            //A few career pages don't have any locations listed on their search results. If that's the case, simply remove the below block of code below, as well as "jobLocations[i]" in the results.push statement below.
			let jobLocations = await page.$$eval('**CLASS NAME FOR HTML ELEMENTS CONTAINING JOB TITLES AS THEIR INNER TEXT. SAME AS ABOVE**', links => {
				links = links.map(element => element.textContent)
				let arr = []
				for (let i = 0; i < 5; i++) {
					arr.push(links[i]);
				}
				return arr
			});

            //Most career pages don't have their posting dates listed on their search results. If that's the case, simply remove the below block of code below, as well as "jobPostDate[i]" in the results.push statement below.
			let jobPostDate = await page.$$eval('.posting-date', links => {
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
```
