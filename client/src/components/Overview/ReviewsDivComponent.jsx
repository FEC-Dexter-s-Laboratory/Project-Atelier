import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import StarDisplay from '../library/StarDisplay.jsx';

const ReviewsDiv = styled.div`
  display: flex;
  justify-content: start;
  margin-top: 13%;
`;

const ReadReviewsLink = styled.a`
  margin-left: 2%;
  margin-top: 1%;
`;

const ReviewsDivComponent = (props) => {
  const { rating, totalReviews } = props;
  let reviewDisplay;
  if (totalReviews > 0) {
    reviewDisplay = 'block';
  } else {
    reviewDisplay = 'none';
  }

  return (
    <>
      <ReviewsDiv>
        <StarDisplay rating={rating} style={{gridColumn: '1'}} />
        <ReadReviewsLink style={{display: reviewDisplay}} href="#reviews-module">{`Read All ${totalReviews} Reviews`}</ReadReviewsLink>
      </ReviewsDiv>
    </>
  );
};

export default ReviewsDivComponent;