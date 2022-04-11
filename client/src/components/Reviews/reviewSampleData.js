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

const dummyBody = 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.';

const dummyPhotos = [...Array(5)].map((each) => {
  return 'https://www.rd.com/wp-content/uploads/2021/03/pug-s-head-leaning-on-tabletop.jpg?resize=1536,1024';
});

export const fullFeatureReview = {
  "review_id": 9999999,
  "rating": 4,
  "summary": dummyBody.substring(0, 60),
  "recommend": true,
  "response": dummyBody.substring(0, 250),
  "body": dummyBody,
  "date": "2019-03-12T00:00:00.000Z",
  "reviewer_name": "best reviewer",
  "helpfulness": 151,
  "photos": dummyPhotos
};