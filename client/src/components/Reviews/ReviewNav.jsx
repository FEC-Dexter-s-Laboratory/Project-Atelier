import React from 'react';
import styled from 'styled-components';

const NavContainer = styled.div`
`;

const NavButton = styled.button`
  font-size: 15px;
  background: none;
  border: 1px solid #353935;
  margin-right: 10px;
  padding: 15px;
  cursor: pointer;
  &:hover {
    color: teal;
  }
`;

const ReviewNav = function({ remainingReviews, displayMoreReviews, toggleModal }) {

  const moreReviews = remainingReviews
    ? <NavButton onClick={displayMoreReviews}>MORE REVIEWS</NavButton>
    : null;

  return (
    <NavContainer>
      {moreReviews}
      <NavButton onClick={toggleModal}>ADD A REVIEW +</NavButton>
    </NavContainer>
  );
};

export default ReviewNav;
