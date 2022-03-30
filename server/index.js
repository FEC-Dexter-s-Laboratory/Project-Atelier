const express = require('express');
const path = require('path');
const router = require('./routes.js');

const app = express();

// serve static files
app.use(express.static(path.join(__dirname, "../client/dist")));

// JSON middleware
app.use(express.json());

// All incoming requests run through the routes.js file
app.use(router);

const port = 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
