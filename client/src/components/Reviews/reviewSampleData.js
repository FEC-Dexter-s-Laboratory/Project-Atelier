// results from GET  /reviews
// count determines number of results per page

// ** List does not include any reported reviews --??--
export const reviewData = [
  {
    "review_id": 1136188,
    "rating": 4,
    "summary": "I am liking these glasses",
    "recommend": true,
    "response": "Glad you're enjoying the product!",
    "body": "They are very dark. But that's good because I'm in very sunny spots",
    "date": "2019-06-23T00:00:00.000Z",
    "reviewer_name": "bigbrotherbenjamin",
    "helpfulness": 13,
    "photos": []
  },
  {
    "review_id": 1136189,
    "rating": 4,
    "summary": "They look good on me",
    "recommend": true,
    "response": "",
    "body": "I so stylish and just my aesthetic.",
    "date": "2019-03-12T00:00:00.000Z",
    "reviewer_name": "fashionperson",
    "helpfulness": 5,
    "photos": []
  }
];


// results from GET  /reviews/meta
export const reviewMetaData = {
  "product_id": "65632",
  "ratings": {
    "2": "1",
    "3": "1",
    "4": "2",
    "5": "9"
  },
  "recommended": {
    "false": "2",
    "true": "11"
  },
  "characteristics": {
    "Quality": {
      "id": 220234,
      "value": "4.2000000000000000"
    }
  }
};

// POST review to /reviews
export const examplePost = {
  product_id: 65632,
  rating: 4,
  summary: 'The very best!',
  body: 'I really enjoyed this product, and I hope that everyone else will love it too!',
  recommend: true,
  name: 'kamasood',
  email: 'yuss@gmail.com',
  photos: [],
  characteristics: {
    id: 220234,
    value: 4
  }
};

// PUT to /reviews/:review_id/helpful (Mark review as helpful)

// PUT to /reviews/:review_id/report (Report review)

// Characteristics example:

// "characteristics": {
//   "Fit": {
//       "id": 220230,
//       "value": "4.7916666666666667"
//   },
//   "Length": {
//       "id": 220231,
//       "value": "4.7708333333333333"
//   },
//   "Comfort": {
//       "id": 220232,
//       "value": "4.8333333333333333"
//   },
//   "Quality": {
//       "id": 220233,
//       "value": "4.7916666666666667"
//   }
// }