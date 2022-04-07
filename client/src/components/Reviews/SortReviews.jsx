import React from 'react';
import styled from 'styled-components';

const SortReviews = function({ count, setSort }) {

  return (
    <h3 className="sort-reviews">
      <label>{count} reviews, sorted by </label>
      <select id="reviews" defaultValue="relevance" onChange={(e) => setSort(e)}>
        <option value="relevance">relevance</option>
        <option value="newest">newest</option>
        <option value="helpful">helpful</option>
      </select>
    </h3>
  );
};

export default SortReviews;