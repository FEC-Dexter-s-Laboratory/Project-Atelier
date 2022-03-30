const express = require('express');
const axios = require('axios');

const router = express.Router();

// configure router file

// example route for /products
router.get('/products', (req, res) => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products')
    .then(({ data }) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(404);
    });
});

// other routes here

module.exports = router;
