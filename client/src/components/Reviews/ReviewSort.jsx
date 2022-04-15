import React from 'react';
import styled from 'styled-components';

const SortContainer = styled.div`
  grid-row-start: 1;
  font-size: 18px;
`;

const Select = styled.select`
  font-family: Comfortaa;
  font-size: 18px;
  text-decoration: underline;
  height: 30px;
  border: none;
  cursor: pointer;
  background: transparent;
  &:hover {
    color: #98a2cc;
  }
`;

const ReviewSort = function({ reviews, setSort }) {

  return (
    <SortContainer className="sort-reviews">
      <label>{reviews.length} reviews, sorted by </label>
      <Select id="reviews" defaultValue="relevant" onChange={(e) => setSort(e)}>
        <option value="relevant">relevance</option>
        <option value="newest">newest</option>
        <option value="helpful">helpfulness</option>
      </Select>
    </SortContainer>
  );
};

export default ReviewSort;
