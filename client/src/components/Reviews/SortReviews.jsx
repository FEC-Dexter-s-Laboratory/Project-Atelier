import React from 'react';
import styled from 'styled-components';

const SortReviews = function({ ratings }) {

  let count = 0;
  for (let key in ratings) {
    count += Number(ratings[key]);
  }

  return (
    <h3 className="sort-reviews">
      <label>{count} reviews, sorted by </label>
      <select id="reviews" defaultValue="relevance">
        <option value="relevance">relevance</option>
        <option value="newest">newest</option>
        <option value="helpful">helpful</option>
      </select>
    </h3>
  );
};

export default SortReviews;