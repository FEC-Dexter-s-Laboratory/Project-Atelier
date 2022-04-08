import React from 'react';
import styled from 'styled-components';
import ReviewListEntry from './ReviewListEntry.jsx';

// ReviewList only receives the correct number of reviews (2, 4, etc.), but should have infinite scroll (y overflow) and set height through CSS at all times.

const ListContainer = styled.div`
  height: 500px;
  overflow-y: auto;
  font-family: Comfortaa;
  grid-row-start: 2;
`;

const ReviewList = function ({ reviews }) {

  return (
    <ListContainer className="review-list">
      {reviews.map((review) => {
        return (
          <ReviewListEntry
            review={review}
            key = {review.review_id}
          />
        );
      })}
    </ListContainer>
  );
};

export default ReviewList;