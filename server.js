const express = require('express');
const app = express();

const adobe = require('./routes/adobe.js');
app.use(adobe)

const amazon = require('./routes/amazon.js');
app.use(amazon);

const paypal = require('./routes/paypal.js');
app.use(paypal)

const apple = require('./routes/apple.js');
app.use(apple)

const uber = require('./routes/uber.js');
app.use(uber)

const crateandbarrel = require('./routes/crateandbarrel.js');
app.use(crateandbarrel)

const ebay = require('./routes/ebay.js');
app.use(ebay)

const microsoft = require('./routes/microsoft.js');
app.use(microsoft)

const facebook = require('./routes/facebook.js');
app.use(facebook)

const sap = require('./routes/sap.js');
app.use(sap)

const intuit = require('./routes/intuit.js');
app.use(intuit)

const shopify = require('./routes/shopify.js');
app.use(shopify)

const intel = require('./routes/intel.js');
app.use(intel)






const port = 5000;
app.listen(port, () => `Server running on port ${port}`);