import React from 'react';
import styled from 'styled-components';

const SortReviews = function({ count }) {


  return (
    <div className="sort-reviews">
      <label for="reviews">{count} reviews, sorted by</label>
      <select id="reviews">
        <option value="relevance" selected>relevance</option>
        <option value="newest">newest</option>
        <option value="helpful">helpful</option>
      </select>
    </div>
  );
};

export default SortReviews;