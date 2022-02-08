const express = require('express');
const app = express();


const router = require('./routes/amazon.js')


app.use(router);




const port = 5000;

app.listen(port, () => `Server running on port ${port}`);