import React from 'react';
import StarDisplay from '../library/StarDisplay.jsx';

const RatingBreakdown = function({ratings, recommended}) {
  // Average Rating
  let sumRatings = 0;
  let countRatings = 0;
  for (let key in ratings) {
    sumRatings += Number(key) * Number(ratings[key]);
    countRatings += Number(ratings[key]);
  }
  let averageRating = sumRatings / countRatings;
  if (sumRatings === 0 || countRatings === 0) {
    averageRating = null;
  }

  // % Total Recommended
  let totalRecommended = 1;
  if (recommended['false'] === undefined) {
    totalRecommended = 1;
  } else if (recommended['true'] === undefined) {
    totalRecommended = 0;
  } else {
    totalRecommended = Number(recommended['true']) / (Number(recommended['true']) + Number(recommended['false']));
  }

  // Render average rating, average star rating, % total recommended...
  return (
    <div className="rating-breakdown">
      <h3>
        {averageRating ? averageRating.toFixed(1) : null}
        <StarDisplay font={30} rating={averageRating} />
      </h3>

      <span>{(totalRecommended * 100).toFixed(0)}% of reviews recommend this product</span>
    </div>
  );
};

export default RatingBreakdown;
