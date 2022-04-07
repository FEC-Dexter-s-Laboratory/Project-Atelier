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

    this.fetchReviews = this.fetchReviews.bind(this);
    this.fetchMeta = this.fetchMeta.bind(this);
    this.filterReviewList = this.filterReviewList.bind(this);
    this.displayMoreReviews = this.displayMoreReviews.bind(this);
    this.setSort = this.setSort.bind(this);
    this.toggleFilterReviews = this.toggleFilterReviews.bind(this);
    this.toggleModal = this.toggleModal.bind(this);


  }

  componentDidMount() {
    this.fetchMeta()
      .then(() => {
        this.fetchReviews();
      })
      .then(() => {
        this.render();
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentId !== this.props.currentId) {
      this.fetchMeta()
        .then(() => {
          return this.fetchReviews();
        })
        .then(() => this.render());
    } else if (prevState.productId !== this.props.productId) {
      this.fetchMeta()
        .then(() => {
          return this.fetchReviews();
        })
        .then(() => this.render());
    } else if ( prevState.sort !== this.state.sort) {
      this.fetchReviews()
        .then(() => this.render());
    } else {
      this.render();
    }
  }

  fetchReviews() {
    return axios.get(`/reviews/${this.state.productId}`, {
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
    return axios.get(`/reviews/meta/${this.state.productId}`)
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
