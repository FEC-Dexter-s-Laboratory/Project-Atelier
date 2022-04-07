const express = require('express');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();

// example route for /products
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

// route to get reviews data by product id, count & sort
router.get('/reviews/:product_id', (req, res) => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews', {
    headers: {
      Authorization: process.env.AUTH_TOKEN
    },
    params: {
      // eslint-disable-next-line camelcase
      product_id: req.params.product_id,
      count: req.query.count,
      sort: req.query.sort
    }
  })
    .then(({data}) => res.send(data))
    .catch(err => res.sendStatus(404));
});

// route to get reviews metadata by product id
router.get('/reviews/meta/:product_id', (req, res) => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews/meta', {
    headers: {
      Authorization: process.env.AUTH_TOKEN
    },
    // eslint-disable-next-line camelcase
    params: {product_id: req.params.product_id}
  })
    .then(({data}) => {
      res.send(data);
    })
    .catch((err) => {
      res.sendStatus(404);
    });
});

router.get('/cart', (req, res) => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/rfp/cart', {
    headers: {
      Authorization: process.env.AUTH_TOKEN,
    },
  })
    .then(({ data }) => {
      res.send(data);
    })
    .catch((err) => {
      res.sendStatus(404);
    });
});

router.post('/cart', (req, res) => {
  console.log('testing POST ', req.body);
  axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/rfp/cart', {
    headers: {
      Authorization: process.env.AUTH_TOKEN,
    },
    data: {
      item: {
        'sku_id': req.body.sku,
      },
    }
  })
    .then(({ data }) => {
      console.log('Successful cart post!');
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
    });
});

// route to questions
router.get('/qa/questions', (req, res) => {
  // console.log(req.query);
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/rfp/qa/questions', {
    headers: {
      Authorization: process.env.AUTH_TOKEN,
    }, params: req.query
  })
    .then(({ data }) => {
      // console.log(data.results);
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
