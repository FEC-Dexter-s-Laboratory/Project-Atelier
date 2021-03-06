import React from 'react';
import styled from 'styled-components';

const FiltersContainer = styled.div`
  grid-row-start: 2;
  display: grid;
  grid-template-rows: 15% 15% 15% 15% 15% 25%;
`;

const Filter = styled.span`
  color: black;
  display: grid;
  grid-template-columns: 15% 70% 15%;
  align-items: center;
  cursor: pointer;
  &:hover {
    font-weight: bold;
  }
`;

const List = styled.span`
  font-size: .9em;
`;

const Reset = styled.button`
  font-family: Comfortaa;
	text-align: center;
	color: #1151AB;
	background: none;
	margin: 0;
	padding: 0;
	border: none;
	cursor: pointer;
  &:hover {
    color: #98a2cc;
  }
`;

const Label = styled.button`
font-family: Comfortaa;
font-size: 1em;
font-weight: bold;
text-align: left;
color: black;
background: none;
margin: 0;
padding: 0;
border: none;
cursor: pointer;
transition: 0.5s;
&:hover {
  color: #1151AB;
  transform: rotate(-5deg) translateX(-1px);
}
`;

const RatingBar = styled.progress`
  appearance: none;
  height: 15px;

  grid-column-start: 2;
  margin: 2%;
  width: 95%;
  ::-webkit-progress-bar {
    border-radius: 5px;
    background-color: #ddd;
    box-shadow: 2px 2px 3px black;
  }
  ::-webkit-progress-value {
    border-radius: 5px;
    background-color: #1151AB;
    box-shadow: 1px 1px 2px black;
  }
  `;

const Filters = function({ ratings, toggleReviewFilters, currentFilters }) {

  let countReviews = 0;
  for (let key in ratings) {
    countReviews += Number(ratings[key]);
  }

  const filtersList = currentFilters.length > 0
    ? <List>
      <span>filtering </span>
      {[5, 4, 3, 2, 1].map((star) => {
        return currentFilters.includes(star)
          ? <span key={`${star} filter`}>&#183; {star} </span>
          : null;
      })}
      <span>stars  |&#32;</span>
      <Reset onClick={() => toggleReviewFilters('reset')}>reset</Reset>
    </List>
    : null;

  return (
    <FiltersContainer className="rating-breakdown-filters">
      {[5, 4, 3, 2, 1].map((star) => {
        return (
          <Filter key={`${star}-star-filter`} onClick={() => toggleReviewFilters(star)}>
            <Label>{star} Stars </Label>
            <RatingBar max="1" value={ ratings[`${star}`] / countReviews || 0 }>
            </RatingBar>
            <Label> { ratings[`${star}`] || 0 }</Label>
          </Filter>
        );
      })}
      {filtersList}
    </FiltersContainer>
  );
};

export default Filters;
