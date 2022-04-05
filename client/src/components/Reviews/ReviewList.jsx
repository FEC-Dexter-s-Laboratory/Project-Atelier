import React from 'react';
import styled from 'styled-components';
import ReviewListEntry from './ReviewListEntry.jsx';

// ReviewList only receives the correct number of reviews (2, 4, etc.), but should have infinite scroll (y overflow) and set height through CSS at all times.

const ReviewList = function ({ reviews }) {

  return (
    <div className="review-list">
      {reviews.map((review) => {
        return (
          <ReviewListEntry
            review={review}
            key = {review.review_id}
          />
        );
      })}
    </div>
  );
};

export default ReviewList;