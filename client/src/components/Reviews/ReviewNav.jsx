import React from 'react';

const ReviewNav = function({ remainingReviews, displayMoreReviews, toggleModal }) {

  const moreReviews = remainingReviews
    ? <button onClick={displayMoreReviews}>MORE REVIEWS</button>
    : null;

  return (
    <div>
      {moreReviews}
      <button onClick={toggleModal}>ADD A REVIEW +</button>
    </div>
  );
};

export default ReviewNav;
