import React from 'react';
import styled from 'styled-components';

const RatingBar = styled.progress`
  height: 10px;
  background-color: #eee;
`;

const StarFilter = function({ratings, toggleFilterReviews, resetFilters}) {

  // Total reviews
  let countReviews = 0;
  for (let key in ratings) {
    countReviews += Number(ratings[key]);
  }

  const resetFiltersLink = resetFilters
    ? <span onClick={() => toggleFilterReviews('reset')}>reset all filters</span>
    : null;

  return (
    <div>
      <span onClick={() => toggleFilterReviews(5)}>
        <span>5 Stars </span>
        <RatingBar max="1" value={ ratings['5'] / countReviews || 0 } />
        <label> { ratings['5'] || 0 }</label>
      </span>
      <br/>
      <span onClick={() => toggleFilterReviews(4)}>
        <span>4 Stars </span>
        <RatingBar max="1" value={ ratings['4'] / countReviews || 0 } />
        <label> { ratings['4'] || 0 }</label>
      </span>
      <br/>
      <span onClick={() => toggleFilterReviews(3)}>
        <span>3 Stars </span>
        <RatingBar max="1" value={ ratings['3'] / countReviews || 0 } />
        <label> { ratings['3'] || 0 }</label>
      </span>
      <br/>
      <span onClick={() => toggleFilterReviews(2)}>
        <span>2 Stars </span>
        <RatingBar max="1" value={ ratings['2'] / countReviews || 0 } />
        <label> { ratings['2'] || 0 }</label>
      </span>
      <br/>
      <span onClick={() => toggleFilterReviews(1)}>
        <span>1 Stars </span>
        <RatingBar max="1" value={ ratings['1'] / countReviews || 0 } />
        <label> { ratings['1'] || 0 }</label>
      </span>
      <br/>
      {resetFiltersLink}
    </div>
  );
};


export default StarFilter;