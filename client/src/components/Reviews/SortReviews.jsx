import React from 'react';
import styled from 'styled-components';

const SortReviews = function({ count }) {


  return (
    <div className="sort-reviews">
<<<<<<< HEAD
      <label>{count} reviews, sorted by </label>
      <select id="reviews" defaultValue="relevance">
        <option value="relevance">relevance</option>
=======
      <label for="reviews">{count} reviews, sorted by</label>
      <select id="reviews">
        <option value="relevance" selected>relevance</option>
>>>>>>> befae24b9894004a5d108f3171090896a3e6f925
        <option value="newest">newest</option>
        <option value="helpful">helpful</option>
      </select>
    </div>
  );
};

export default SortReviews;