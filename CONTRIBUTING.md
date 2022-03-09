## To contribute new companies to this project: 

The first step is obviously finding a company that is not already included in the project and said company must have a compatible career page. With how this app functions, these career pages have to have URLs that change to match your search input. I.e company.com/?search=text%20I%20typed%20In. The search results page will also need to be compatible with Puppeteer's web scraping. The ones with dynamically created classNames on their HTML elements usually are not compatible.

After you have found your working career page to add there are 4 existing files in this project that need small adjustments as well as you will need to create on addition file. Details below. Change the "New Company" placeholder to match the name of the company you are adding. Be sure to match upper and lowercase from the examples provided. 


client -> src -> components -> clientInput -> checkbox.js  
Add a label with the existing collection of labels in alphabetical order.
```
<label htmlFor="NewCompany"><input className="comapnyCheckbox" type="checkbox" id="newcompany" defaultChecked/>New Company</label>
```


client -> src -> components -> clientInput -> clientInput.js  
Add this if statement under the existing statements. Order does not matter this time.
```
if (document.getElementById("newcompany").checked) {
    axios.post('/newcompany', {}, {
        params: { jobTitleSearch: jobSearchInput, city: city, USstate: USstate,}
    }).then(response => {
        this.props.handleCallBack(response.data);
    });
} 
```

client -> src -> components -> clientInput -> jobDisplay -> logos
Add a simple png image containing the logo of new company.  
  
server.js  
Add simple route statement below the rest.
```
const newcompany = require('./routes/newcompany.js');
app.use(newcompany)
```