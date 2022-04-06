import React from 'react';

const ReviewNav = function({ remainingReviews, toggle }) {

  const moreReviews = remainingReviews
    ? <button>MORE REVIEWS</button>
    : null;

  return (
    <div>
      {moreReviews}
      <button onClick={toggle}>ADD A REVIEW +</button>
    </div>
  );
};

export default ReviewNav;
