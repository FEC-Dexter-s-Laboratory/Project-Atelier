import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
<<<<<<< HEAD
import StarDisplay from '../library/StarDisplay.jsx';
=======
>>>>>>> befae24b9894004a5d108f3171090896a3e6f925

const ReviewListEntry = function({ review }) {

  // StarDisplay for review.rating
  // verified check?
  // review.reviewer_name, moment(review.date).format('LL')

  // ## review.summary (truncate to eliminate next-line?)

  // review.body
<<<<<<< HEAD
  // display first 250 characters
  // if longer, render link "Show more" -> expand body text to full length (1000chars)
=======
    // display first 250 characters
    // if longer, render link "Show more" -> expand body text to full length (1000chars)
>>>>>>> befae24b9894004a5d108f3171090896a3e6f925

  // if review.photos.length > 0, image thumbnails (click to launch full-screen modal)

  // if review.recommend
<<<<<<< HEAD
  // check mark, I recommend this product

  // review.response
  // different colored div background
  // <strong>Response from seller:
  // text below
=======
    // check mark, I recommend this product

  // review.response
    // different colored div background
    // <strong>Response from seller:
    // text below
>>>>>>> befae24b9894004a5d108f3171090896a3e6f925

  // Helpful?
  // Yes link -> send API call
  // (review.helpfulness) | Report link -> send API call

  // CSS border between reviews (skip first top border)

<<<<<<< HEAD
  return (
    <div className="review-list-entry">
      <StarDisplay font={30} rating={review.rating} />
      <div>ReviewListEntry</div>
    </div>
  );

=======
>>>>>>> befae24b9894004a5d108f3171090896a3e6f925
};

export default ReviewListEntry;

// SAMPLE DATA:
// {
//   "review_id": 1136188,
//   "rating": 4,
//   "summary": "I am liking these glasses",
//   "recommend": true,
//   "response": "Glad you're enjoying the product!",
//   "body": "They are very dark. But that's good because I'm in very sunny spots",
//   "date": "2019-06-23T00:00:00.000Z",
//   "reviewer_name": "bigbrotherbenjamin",
//   "helpfulness": 13,
//   "photos": []
// }