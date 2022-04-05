import React, {useState} from 'react';
import styled from 'styled-components';

const StarContainer = styled.span`
  position: relative;
  width: 10px;
  font-size: ${props => props.fontSize}px;
`;

const EmptyStar = styled.span`
  color: #ddd;
  z-index: 1;
`;

const FilledStar = styled.span`
  position: absolute;
  width: ${ props => props.fill * 100 }%;
  overflow: hidden;
  color: black;
  z-index: 2;
`;

const StarDisplay = function(props) {

  const rating = props.rating || 0;

  let stars = [];
  let index = 0;
  while (index < 5) {
    const empty = Math.abs(index - rating);
    const oneQuarter = Math.abs(index - rating + 0.25);
    const oneHalf = Math.abs(index - rating + 0.5);
    const threeQuarters = Math.abs(index - rating + 0.75);
    const full = Math.abs(index - rating + 1);
    const closestRating = Math.min(empty, oneQuarter, oneHalf, threeQuarters, full);
    switch (closestRating) {
    case empty:
      stars.push(0);
      break;
    case oneQuarter:
      stars.push(0.35); // used 0.35 for better display quality
      break;
    case oneHalf:
      stars.push(0.5);
      break;
    case threeQuarters:
      stars.push(0.65); // used 0.65 for better display quality
      break;
    case full:
      stars.push(1);
      break;
    default:
      console.error('problem with rating input');
      stars.push(0);
    }
    index += 1;
  }

  return (
    <div className="star-display">
      {stars.map((star, index) => {
        return (
          <StarContainer fontSize={props.fontSize} key={index}>
            <FilledStar fill={star}>&#9733;</FilledStar>
            <EmptyStar>&#9733;</EmptyStar>
          </StarContainer>
        );
      })}
    </div>
  );
};

export default StarDisplay;
