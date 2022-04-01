const express = require('express');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();

<<<<<<< HEAD
//configure router file

//example route for /products

=======
// configure router file

// example route for /products
>>>>>>> main
router.get('/products', (req, res) => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products', {
    headers: {
      Authorization: process.env.AUTH_TOKEN,
    },
  })
    .then(({ data }) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(404);
    });
});

// other routes here
// route to get related products
router.get('/products/:product_id/related', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${req.params.product_id}/related`, {
    headers: {
      Authorization: process.env.AUTH_TOKEN,
    },
  })
    .then(({ data }) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(404);
    });
});

// route to get product info by id
router.get('/products/:product_id', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${req.params.product_id}`, {
    headers: {
      Authorization: process.env.AUTH_TOKEN,
    },
  })
    .then(({ data }) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(404);
    });
});

// route to get styles by product id
router.get('/products/:product_id/styles', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${req.params.product_id}/styles`, {
    headers: {
      Authorization: process.env.AUTH_TOKEN,
    },
  })
    .then(({ data }) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(404);
    });
});
module.exports = router;
