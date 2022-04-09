import React from 'react';
import styled from 'styled-components';

const NavContainer = styled.div`
`;

const ReviewNav = function({ remainingReviews, displayMoreReviews, toggleModal }) {

  const moreReviews = remainingReviews
    ? <button onClick={displayMoreReviews}>MORE REVIEWS</button>
    : null;

  return (
    <NavContainer>
      {moreReviews}
      <button onClick={toggleModal}>ADD A REVIEW +</button>
    </NavContainer>
  );
};

export default ReviewNav;
