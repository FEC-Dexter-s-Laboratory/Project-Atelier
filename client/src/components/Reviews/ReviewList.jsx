import React from 'react';
import styled from 'styled-components';
import ReviewListEntry from './ReviewListEntry.jsx';

const ListContainer = styled.div`
  grid-row-start: 2;
  height: 100%;
  padding-right: 2%;
  overflow-y: auto;
`;

const ReviewList = function ({ reviews }) {

  if (reviews.length === 0) {
    return null;
  }
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