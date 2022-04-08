import React from 'react';
import styled from 'styled-components';

const SortContainer = styled.h3`
  grid-row-start: 1;
`;

const SortReviews = function({ count, setSort }) {

  return (
    <SortContainer className="sort-reviews">
      <label>{count} reviews, sorted by </label>
      <select id="reviews" defaultValue="relevant" onChange={(e) => setSort(e)}>
        <option value="relevant">relevance</option>
        <option value="newest">newest</option>
        <option value="helpful">helpfulness</option>
      </select>
    </SortContainer>
  );
};

export default SortReviews;