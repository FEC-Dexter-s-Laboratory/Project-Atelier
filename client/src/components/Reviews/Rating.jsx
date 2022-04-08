import React from 'react';
import styled from 'styled-components';
import StarDisplay from '../library/StarDisplay.jsx';

const RatingContainer = styled.h3`
  grid-row-start: 1;
  line-height: 2;
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
      {averageRating ? averageRating.toFixed(1) : null}
      <span>
        <StarDisplay font={30} rating={averageRating} />
      </span>
      <span>{(totalRecommended * 100).toFixed(0)}% recommend</span>
    </RatingContainer>
  );
};

export default Rating;
