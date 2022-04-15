import React from 'react';
import styled from 'styled-components';
import StarDisplay from '../library/StarDisplay.jsx';

const RatingContainer = styled.div`
  grid-row-start: 1;
  display: grid;
  grid-template-columns: 25% 75%;
  grid-template-rows: 70% 30%;
  color: #393433;
`;

const Average = styled.div`
  font-size: 60px;
  font-weight: bold;
  grid-column-start: 1;
  grid-row-start: 1;
  `;

const Recommended = styled.div`
  grid-column-start: 1;
  grid-column-end: -1;
  grid-row-start: 2;
  font-size: 15px;
`;

const Rating = function({ ratings, recommended }) {
  let sumRatings = 0;
  let countRatings = 0;
  for (let key in ratings) {
    sumRatings += Number(key) * Number(ratings[key]);
    countRatings += Number(ratings[key]);
  }
  let averageRating = sumRatings / countRatings;
  if ((sumRatings || countRatings) === 0) {
    averageRating = null;
  }

  let totalRecommended = 1;
  if (recommended.true === undefined) {
    totalRecommended = 0;
  } else if (recommended.false === undefined) {
    totalRecommended = 1;
  } else {
    totalRecommended = Number(recommended.true) / (Number(recommended.true) + Number(recommended.false));
  }

  return (
    <RatingContainer className="rating-breakdown">
      <Average>{averageRating ? averageRating.toFixed(1) : null}</Average>
      <StarDisplay fontSize="25" rating={averageRating} />
      <Recommended>{(totalRecommended * 100).toFixed(0)}% of reviews recommend this product</Recommended>
    </RatingContainer>
  );
};

export default Rating;
