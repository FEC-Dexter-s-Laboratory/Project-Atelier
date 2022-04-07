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
  const averageRating = sumRatings / countRatings;

  // % Total Recommended
  const totalRecommended = Number(recommended['true']) / (Number(recommended['true']) + Number(recommended['false']));

  // Render average rating, average star rating, % total recommended...
  return (
    <div className="rating-breakdown">
      <h3>
        {averageRating.toFixed(1)}
        <StarDisplay font={30} rating={averageRating} />
      </h3>

      <span>{(totalRecommended * 100).toFixed(0)}% of reviews recommend this product</span>
    </div>
  );
};

export default RatingBreakdown;
