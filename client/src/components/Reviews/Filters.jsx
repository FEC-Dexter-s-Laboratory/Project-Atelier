import React from 'react';
import styled from 'styled-components';

const FiltersContainer = styled.div`
  grid-row-start: 2;
  display: grid;
  grid-template-rows: 15% 15% 15% 15% 15% 25%;
`;

const Reset = styled.button`
  font-family: Comfortaa;
	font-size: 1em;
	text-align: center;
	color: blue;
	background: none;
	margin: 0;
	padding: 0;
	border: none;
	cursor: pointer;
  &:hover {
    color: orange;
  }
`;

const Label = styled.button`
font-family: Comfortaa;
font-size: 1em;
text-align: left;
color: black;
background: none;
margin: 0;
padding: 0;
border: none;
cursor: pointer;
&:hover {
  color: orange;
}
`;

const Filter = styled.span`
  color: black;
  display: grid;
  grid-template-columns: 20% 60% 20%;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: orange;
  }
`;

const RatingBar = styled.progress`
  -webkit-appearance: none;
  appearance: none;
  background-color: #eee;
  border-radius: 2px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
  height: 15px;
  grid-column-start: 2;
  background-color: gray;
  width: 95%;
  `;

const Filters = function({ ratings, toggleReviewFilters, currentFilters }) {

  let countReviews = 0;
  for (let key in ratings) {
    countReviews += Number(ratings[key]);
  }

  const filtersList = currentFilters.length > 0
    ? <div>
      <span>filtering </span>
      {[5, 4, 3, 2, 1].map((star) => {
        return currentFilters.includes(star)
          ? <span>&#183; {star} </span>
          : null;
      })}
      <span>stars  </span>
      <Reset onClick={() => toggleReviewFilters('reset')}>reset</Reset>
    </div>
    : <div/>;

  return (
    <FiltersContainer>
      {[5, 4, 3, 2, 1].map((star) => {
        return (
          <Filter key={`${star}-star-filter`} onClick={() => toggleReviewFilters(star)}>
            <Label>{star} Stars </Label>
            <RatingBar max="1" value={ ratings[`${star}`] / countReviews || 0 } />
            <Label> { ratings[`${star}`] || 0 }</Label>
          </Filter>
        );
      })}
      {filtersList}
    </FiltersContainer>
  );
};

export default Filters;

// TODO

// improve naming for styled components, for when we remove them from the file.