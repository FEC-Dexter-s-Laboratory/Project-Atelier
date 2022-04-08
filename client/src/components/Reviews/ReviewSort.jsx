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
  &:hover {
    color: #7d7f7c;
  }
`;

const ReviewSort = function({ count, setSort }) {

  return (
    <SortContainer className="sort-reviews">
      <label>{count} reviews, sorted by </label>
      <Select id="reviews" defaultValue="relevant" onChange={(e) => setSort(e)}>
        <option value="relevant">relevance</option>
        <option value="newest">newest</option>
        <option value="helpful">helpfulness</option>
      </Select>
    </SortContainer>
  );
};

export default ReviewSort;