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
    params: {product_id: req.params.product_id}
  })
    .then(({data}) => {
      res.send(data);
    })
    .catch((err) => {
      res.sendStatus(404);
    });
});

// route to mark a review as helpful
router.put('/reviews/:review_id/helpful', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews/${req.params.review_id}/helpful`, null, {
    headers: {
      Authorization: process.env.AUTH_TOKEN
    }
  })
    .then((response) => {
      res.sendStatus(204);
    })
    .catch((err) => {
      res.sendStatus(401);
    });
});

// route to report a review
router.put('/reviews/:review_id/report', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews/${req.params.review_id}/report`, null, {
    headers: {
      Authorization: process.env.AUTH_TOKEN
    }
  })
    .then((response) => {
      res.sendStatus(204);
    })
    .catch((err) => {
      res.sendStatus(401);
    });
});

// route to post a review
router.post('/reviews', (req, res) => {
  axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews',
    req.body,
    { headers: { Authorization: process.env.AUTH_TOKEN } }
  )
    .then(() => res.sendStatus(201))
    .catch((err) => res.sendStatus(404));
});

// cart routes
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
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/rfp/qa/questions', {
    headers: {
      Authorization: process.env.AUTH_TOKEN,
    }, params: req.query
  })
    .then(({ data }) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
    });
});

//route to answers
router.get('/qa/questions/:question_id/answers', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/qa/questions/${req.query.question_id}/answers`, {
    headers: {
      Authorization: process.env.AUTH_TOKEN,
    }, params: req.query
  })
    .then(({ data }) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
    });
});

//route to post questions
router.post('/qa/questions', (req, res) => {
  axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/rfp/qa/questions',
    req.body,
    {
      headers: {
        Authorization: process.env.AUTH_TOKEN,
      }
    })
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(400);
    });
});

//route to post answers
router.post('/qa/questions/:question_id/answers', (req, res) => {
  axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/qa/questions/${req.query.question_id}/answers`,
    req.body,
    {
      headers: {
        Authorization: process.env.AUTH_TOKEN,
      }
    })
    .then (() => {
      res.sendStatus(201);
    })
    .catch ((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

//route to update Question helpfulnes
router.put('/qa/questions/:question_id/helpful', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/qa/questions/${req.query.question_id}/helpful`,
    null,
    {
      headers: {
        Authorization: process.env.AUTH_TOKEN,
      },
      params: {
        question_id: req.query.question_id,
      }
    })
    .then ((resp) => {
      res.sendStatus(204);
    })
    .catch ((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

//route to update Answer helpfulness
router.put('/qa/answers/:answer_id/helpful', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/qa/answers/${req.query.answer_id}/helpful`,
    null,
    {
      headers: {
        Authorization: process.env.AUTH_TOKEN,
      },
      params: {
        answer_id: req.query.answer_id,
      }
    })
    .then ((resp) => {
      res.sendStatus(204);
    })
    .catch ((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

//route to report Question
router.put('/qa/answers/:answer_id/report', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/qa/answers/${req.query.answer_id}/report`,
    null,
    {
      headers: {
        Authorization: process.env.AUTH_TOKEN,
      },
      params: {
        answer_id: req.query.answer_id,
      }
    })
    .then ((resp) => {
      res.sendStatus(204);
    })
    .catch ((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

module.exports = router;
