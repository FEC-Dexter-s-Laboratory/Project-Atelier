import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
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
      loading: true,
      productId: this.props.currentId,
      sort: 'relevant',
      reviews: reviewData,
      meta: reviewMetaData,
      addReview: false,
      count: 2,
      reviewsToDisplay: 2,
      filterReviews: [1, 2, 3, 4, 5],
      resetFilters: false // temp state management
    };

    this.fetchReviews = this.fetchReviews.bind(this);
    this.fetchMeta = this.fetchMeta.bind(this);
    this.filterReviewList = this.filterReviewList.bind(this);
    this.displayMoreReviews = this.displayMoreReviews.bind(this);
    this.setSort = this.setSort.bind(this);
    this.toggleFilterReviews = this.toggleFilterReviews.bind(this);
    this.toggleModal = this.toggleModal.bind(this);


  }

  componentDidMount() {
    this.fetchMeta();
    this.fetchReviews();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.productId !== this.state.productId) {
      this.fetchMeta();
      this.fetchReviews();
    } else if ( prevState.sort !== this.state.sort) {
      this.fetchReviews();
    } else {
      this.render();
    }
  }

  fetchReviews() {
    axios.get(`/reviews/${this.state.productId}`, {
      params: {
        count: this.state.count,
        sort: this.state.sort
      }
    })
      .then(({data}) => {
        this.setState({
          reviews: data.results
        });
      })
      .catch(err => console.log(err));
  }

  fetchMeta() {
    axios.get(`/reviews/meta/${this.state.productId}`)
      .then(({data}) => {
        let count = 0;
        for (let key in data.ratings) {
          count += Number(data.ratings[key]);
        }
        this.setState({
          meta: data,
          count: count,
          loading: false
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  filterReviewList(reviews) {
    let filtered = [];
    for (let review of reviews) {
      if (this.state.filterReviews.includes(review.rating)) {
        filtered.push(review);
      }
    }
    return filtered.slice(0, this.state.reviewsToDisplay);
  }

  displayMoreReviews() {
    let more = this.state.reviewsToDisplay + 2;
    this.setState({
      reviewsToDisplay: more
    });
    if (this.state.reviews.length === 2) {
      this.fetchReviews();
    }
  }

  setSort(e) {
    e.preventDefault();
    this.setState({
      sort: e.target.value
    });
  }

  toggleFilterReviews(stars) {

    if (stars === 'reset') {
      this.setState({
        filterReviews: [1, 2, 3, 4, 5],
        resetFilters: false
      });
      return;
    }

    let currentFilters = this.state.filterReviews.slice();
    if (currentFilters.length === 5) {
      currentFilters = [stars];
    } else if (currentFilters.includes(stars)) {
      currentFilters.splice(currentFilters.indexOf(stars), 1);
    } else {
      currentFilters.push(stars);
    }
    this.setState({
      filterReviews: currentFilters,
      resetFilters: true
    });

    // temp fix
    if (this.state.reviews.length === 2) {
      this.fetchReviews();
    }
  }

  toggleModal() {
    this.setState({
      addReview: !this.state.addReview
    });
  }

  render() {
    if (this.state.loading) {
      return <span>Loading reviews...</span>;
    }

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
              toggleFilterReviews={this.toggleFilterReviews}
              ratings={this.state.meta.ratings}
              resetFilters={this.state.resetFilters}
            />
            <ProductBreakdown
              chars={this.state.meta.characteristics}
            />
          </LeftColumn>
          <RightColumn>
            <SortReviews
              count={this.state.count}
              setSort={this.setSort}
            />
            <ReviewList
              reviews={this.filterReviewList(this.state.reviews)}
            />
            <ReviewNav
              remainingReviews={this.state.count > this.state.reviewsToDisplay}
              displayMoreReviews={this.displayMoreReviews}
              toggleModal={this.toggleModal}
            />
          </RightColumn>
          <ReviewModal
            productId={this.state.productId}
            meta={this.state.meta}
            visible={this.state.addReview}
            toggleModal={this.toggleModal} />
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