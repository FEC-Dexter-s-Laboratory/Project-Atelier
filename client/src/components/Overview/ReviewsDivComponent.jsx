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

  return (
    <>
      <ReviewsDiv>
        <StarDisplay rating={rating} style={{gridColumn: '1'}} />
        <ReadReviewsLink href="#reviews-module">{`Read All ${totalReviews} Reviews`}</ReadReviewsLink>
      </ReviewsDiv>
    </>
  );
};

export default ReviewsDivComponent;