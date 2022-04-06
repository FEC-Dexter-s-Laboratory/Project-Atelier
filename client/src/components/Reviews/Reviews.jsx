import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import RatingBreakdown from './RatingBreakdown.jsx';
import StarFilter from './StarFilter.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import SortReviews from './SortReviews.jsx';
import ReviewList from './ReviewList.jsx';

import StarButtons from '../library/StarButtons.jsx';
import StarDisplay from '../library/StarDisplay.jsx';
import { reviewData, reviewMetaData } from './reviewSampleData';


// const DivContainer = styled.div`
//   border: 6px ridge darkblue;
//   background-image: linear-gradient(to bottom right, cyan, deepskyblue);
//   display: grid;
// `;

const ReviewsContainer = styled.div`
  display: grid;
  grid-template-columns: 33% 33% 33%;
  margin: 2% 20% 2% 20%;
`;

const LeftColumn = styled.div`
  grid-column-start: 1;
`;

const RightColumn = styled.div`
  grid-column-start: 2;
  grid-column-end: -1;
`;

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: this.props.currentId,
      sort: 'relevant',
      reviews: reviewData.results,
      meta: reviewMetaData
    };
  }

  render() {
    return (
      <div className="reviews-module">

        <ReviewsContainer>
          <div>Ratings &amp; Reviews</div>
          <LeftColumn>
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
          </LeftColumn>
          <RightColumn>
            <SortReviews
              count={this.state.reviews.length}
            />
            <ReviewList
              reviews={this.state.reviews}
            />
          </RightColumn>
        </ReviewsContainer>



        {/* <ReviewsNav /> */}

        {/* <h1>Star Components:</h1>
        <StarButtons fontSize={50}/>
        <StarDisplay fontSize={50} rating={3.14}/> */}
      </div>
    );
  }
}

export default Reviews;
