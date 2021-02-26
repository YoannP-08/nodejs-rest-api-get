const express = require('express');
require('dotenv/config');

// Assign environment variables
const port = process.env.PORT || 4242;

// Initiliase express server
const app = express();

// Add express.text() to support text/plain content-type
app.use(express.json(), express.text());

// Import Routes
const annexe1 = require('../routes/api/annexe1');
const annexe2 = require('../routes/api/annexe2');

// Define Routes
app.use('/api/p1', annexe1);
app.use('/api/p2', annexe2)


// Run server
app.listen(port, () => console.log(`Started on server port ${port}.`));
