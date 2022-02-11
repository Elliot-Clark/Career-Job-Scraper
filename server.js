const express = require('express');
const app = express();

const routers = require('./routes/amazon.js');
app.use(routers);

const router = require('./routes/paypal.js');
app.use(router)




const port = 5000;

app.listen(port, () => `Server running on port ${port}`);