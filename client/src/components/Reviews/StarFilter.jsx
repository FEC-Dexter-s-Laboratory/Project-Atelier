import React from 'react';
import styled from 'styled-components';

const RatingBar = styled.progress`
  height: 10px;
  background-color: #eee;
`;

// IMPLEMENT FILTER CLICKS

const StarFilter = function({ratings}) {

  // Total reviews
  let countReviews = 0;
  for (let key in ratings) {
    countReviews += Number(ratings[key]);
  }

  return (
    <div>
      <div>
        <a>5 Stars </a>
        <RatingBar max="1" value={ ratings['5'] / countReviews || 0 } />
        <label> { ratings['5'] || 0 }</label>
      </div>
      <div>
        <a>4 Stars </a>
        <RatingBar max="1" value={ ratings['4'] / countReviews || 0 } />
        <label> { ratings['4'] || 0 }</label>
      </div>
      <div>
        <a>3 Stars </a>
        <RatingBar max="1" value={ ratings['3'] / countReviews || 0 } />
        <label> { ratings['3'] || 0 }</label>
      </div>
      <div>
        <a>2 Stars </a>
        <RatingBar max="1" value={ ratings['2'] / countReviews || 0 } />
        <label> { ratings['2'] || 0 }</label>
      </div>
      <div>
        <a>1 Stars </a>
        <RatingBar max="1" value={ ratings['1'] / countReviews || 0 } />
        <label> { ratings['1'] || 0 }</label>
      </div>
    </div>
  );
};


export default StarFilter;