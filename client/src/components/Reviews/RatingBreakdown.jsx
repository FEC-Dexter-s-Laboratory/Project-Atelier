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
      <span>{averageRating.toFixed(1)}</span>
      <StarDisplay font={30} rating={averageRating} />
      <span>{(totalRecommended * 100).toFixed(0)}% of reviews recommend this product</span>
    </div>
  );
};

export default RatingBreakdown;

// SAMPLE DATA:
//
// export const reviewMetaData = {
//   "product_id": "65632",
//   "ratings": {
//     "2": "1",
//     "3": "1",
//     "4": "2",
//     "5": "9"
//   },
//   "recommended": {
//     "false": "2",
//     "true": "11"
//   },
//   "characteristics": {
//     "Quality": {
//       "id": 220234,
//       "value": "4.2000000000000000"
//     }
//   }
// };