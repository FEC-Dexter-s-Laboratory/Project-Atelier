import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import RatingBreakdown from './RatingBreakdown.jsx';
import StarFilter from './StarFilter.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import SortReviews from './SortReviews.jsx';
import ReviewList from './ReviewList.jsx';
import ReviewNav from './ReviewNav.jsx';
import ReviewModal from './ReviewModal.jsx';

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
      productId: this.props.currentId,
      sort: 'relevant',
      reviews: reviewData.results,
      meta: reviewMetaData,
      addReview: false
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      addReview: !this.state.addReview
    });
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
            <ReviewNav
              remainingReviews={true} // this is hard-coded atm
              toggle={this.toggleModal}
            />
          </RightColumn>
          <ReviewModal
            productId={this.state.productId}
            visible={this.state.addReview}
            toggle={this.toggleModal} />
        </ReviewsContainer>
      </div>
    );
  }
}

export default Reviews;

// metadata request
//
// axios.get(`/reviews/meta/${productId}`)
//   .then((response) => {
//     let ratings = response.data.ratings;
//     let sumRatings = 0;
//     let countRatings = 0;
//     for (let key in ratings) {
//       sumRatings += Number(key) * Number(ratings[key]);
//       countRatings += Number(ratings[key]);
//     }
//     const averageRating = sumRatings / countRatings;
//     // do something with averageRating here (return || setState || assign to global variable)
//   })
//   .catch((err) => {
//     console.log(err);
//   });