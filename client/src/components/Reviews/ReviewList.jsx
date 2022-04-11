import React from 'react';
import styled from 'styled-components';
import ReviewListEntry from './ReviewListEntry.jsx';

const ListContainer = styled.div`
  grid-row-start: 2;
  height: 100%;
  padding-right: 2%;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &:-webkit-scrollbar {
    width: 0;
    height: 0;
  }
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
