const express = require('express');
const path = require('path');
const router = require('./routes');
const compression = require('compression');

const app = express();

// compression of files
app.use(compression());

// serve static files
app.use(express.static(path.join(__dirname, '../client/dist')));

// JSON middleware
app.use(express.json());

// All incoming requests run through the routes.js file
app.use(router);

const port = 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
