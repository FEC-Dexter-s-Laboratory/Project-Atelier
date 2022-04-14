import React from 'react';
import styled from 'styled-components';

const NavContainer = styled.div`
`;

const NavButton = styled.button`
  font-family: Comfortaa;
  font-weight: bold;
  font-size: 15px;
  background: none;
  border: 1px solid #353935;
  border-radius: 30px;
  margin-right: 10px;
  padding: 15px;
  cursor: pointer;
  box-shadow: 1px 1px 5px #5d5d5d;
  transition: 0.2s;
  &:hover {
    background-color: gray;
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
