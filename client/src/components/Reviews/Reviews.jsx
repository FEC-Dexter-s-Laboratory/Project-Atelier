import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import RatingBreakdown from './RatingBreakdown.jsx';
import StarFilter from './StarFilter.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';

import StarButtons from '../library/StarButtons.jsx';
import StarDisplay from '../library/StarDisplay.jsx';
import { reviewData, reviewMetaData } from './reviewSampleData';


// const DivContainer = styled.div`
//   border: 6px ridge darkblue;
//   background-image: linear-gradient(to bottom right, cyan, deepskyblue);
//   display: grid;
// `;

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: this.props.currentId,
      meta: reviewMetaData
    };
  }

  render() {
    return (
      <div className="reviews-module">
        Ratings &amp; Reviews

        <RatingBreakdown
          ratings={this.state.meta.ratings}
          recommended={this.state.meta.recommended}
        />
        <StarFilter
          ratings={this.state.meta.ratings}
        />
        <ProductBreakdown
          chars={this.state.meta.characteristics}
        />

        {/* <SortReviews />
        <ReviewsList />
        <ReviewsNav /> */}

        <h1>Star Components:</h1>
        <StarButtons fontSize={50}/>
        <StarDisplay fontSize={50} rating={3.14}/>
      </div>
    );
  }
}

export default Reviews;
