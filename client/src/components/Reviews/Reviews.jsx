import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Rating from './Rating.jsx';
import Filters from './Filters.jsx';
import Characteristics from './Characteristics.jsx';
import ReviewSort from './ReviewSort.jsx';
import ReviewList from './ReviewList.jsx';
import ReviewNav from './ReviewNav.jsx';
import ReviewModal from './ReviewModal.jsx';
import StarDisplay from '../library/StarDisplay.jsx';

const ReviewsContainer = styled.div`
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: 5% 95%;
  margin: 2% 15% 2% 15%;
  font-family: Comfortaa;
  height: 95vh;
`;

const LeftColumn = styled.div`
  grid-column-start: 1;
  grid-row-start: 2;
  display: grid;
  grid-template-rows: 15% 25% 60%;
  margin: 2%;
  height: 90vh;
`;

const RightColumn = styled.div`
  grid-column-start: 2;
  grid-column-end: -1;
  grid-row-start: 2;
  display: grid;
  grid-template-rows: 5% 90% 5%;
  margin: 2%;
  height: 90vh;
`;

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      productId: null,
      meta: {},
      reviews: [],
      count: null,
      reviewsToDisplay: 2,
      sort: 'relevant',
      currentFilters: [],
      addReviewModalModal: false
    };

    this.fetchMeta = this.fetchMeta.bind(this);
    this.fetchReviews = this.fetchReviews.bind(this);

    this.setSort = this.setSort.bind(this);
    this.filterReviewList = this.filterReviewList.bind(this);
    this.displayMoreReviews = this.displayMoreReviews.bind(this);
    this.submitReview = this.submitReview.bind(this);
    this.toggleReviewFilters = this.toggleReviewFilters.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    this.fetchMeta()
      .then(() => this.fetchReviews())
      .catch(err => console.log(err));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentId !== this.props.currentId) { // if passed in product id changes, fetch new metadata and reviews
      this.fetchMeta()
        .then(() => this.fetchReviews())
        .catch(err => console.log(err));
    } else if ( prevState.sort !== this.state.sort) { // if sort changes, fetch reviews with new sort parameter
      this.fetchReviews();
    }
  }

  fetchMeta() {
    return axios.get(`/reviews/meta/${this.props.currentId}`)
      .then(({data}) => {
        let count = 0;
        for (let key in data.ratings) {
          count += Number(data.ratings[key]);
        }
        this.setState({
          productId: this.props.currentId,
          meta: data,
          count: count,
          sort: 'relevant'
        });
      })
      .catch(err => console.log(err));
  }

  fetchReviews() {
    return axios.get(`/reviews/${this.props.currentId}`, {
      params: {
        productId: this.props.currentId,
        count: this.state.count,
        sort: this.state.sort
      }
    })
      .then(({data}) => {
        this.setState({
          reviews: data.results,
          loading: false
        });
      })
      .catch(err => console.log(err));
  }

  setSort(e) {
    e.preventDefault();
    this.setState({
      sort: e.target.value
    });
  }

  filterReviewList(reviews) {
    let filtered = [];

    if (this.state.currentFilters.length === 0) {
      return reviews.slice(0, this.state.reviewsToDisplay);
    }

    for (let review of reviews) {
      if (this.state.currentFilters.includes(review.rating)) {
        filtered.push(review);
      }
    }
    return filtered.slice(0, this.state.reviewsToDisplay);
  }

  displayMoreReviews() {
    let moreReviews = this.state.reviewsToDisplay + 2;
    this.setState({
      reviewsToDisplay: moreReviews
    });
  }

  submitReview(review) {
    axios.post('/reviews', review)
      .then(() => (this.fetchMeta()))
      .then(() => (this.fetchReviews()))
      .catch(err => console.log(err));
  }

  toggleReviewFilters(stars) {
    if (stars === 'reset') {
      this.setState({
        currentFilters: [],
        resetFilters: false
      });
      return;
    }

    const currentFilters = this.state.currentFilters.slice();
    if (currentFilters.includes(stars)) {
      currentFilters.splice(currentFilters.indexOf(stars), 1);
    } else {
      currentFilters.push(stars);
    }

    let resetFlag = currentFilters.length === 0 ? false : true;
    this.setState({
      currentFilters: currentFilters,
      resetFilters: resetFlag
    });
  }

  toggleModal() {
    this.setState({
      addReviewModal: !this.state.addReviewModal
    });
  }

  render() {

    if (this.state.reviews.length === 0) {
      return (
        <ReviewsContainer className="reviews-module" id="reviews-module">
          <h4>RATINGS &amp; REVIEWS</h4>
          <ReviewNav
            remainingReviews={false}
            toggleModal={this.toggleModal}
          />
          <ReviewModal
            productId={this.state.productId}
            meta={this.state.meta}
            visible={this.state.addReviewModal}
            toggleModal={this.toggleModal}
            submitReview={this.submitReview} />
        </ReviewsContainer>
      );
    }
    return (

      <ReviewsContainer className="reviews-module" id="reviews-module">
        <h4>RATINGS &amp; REVIEWS</h4>
        <LeftColumn id="reviews-column-left">
          <Rating
            ratings={this.state.meta.ratings}
            recommended={this.state.meta.recommended}
          />
          <Filters
            toggleReviewFilters={this.toggleReviewFilters}
            ratings={this.state.meta.ratings}
            currentFilters={this.state.currentFilters}
          />
          <Characteristics
            chars={this.state.meta.characteristics}
          />
        </LeftColumn>
        <RightColumn id="reviews-column-right">
          <ReviewSort
            reviews={this.state.reviews}
            setSort={this.setSort}
          />
          <ReviewList
            reviews={this.filterReviewList(this.state.reviews)}
          />
          <ReviewNav
            remainingReviews={this.state.reviews.length > this.state.reviewsToDisplay}
            displayMoreReviews={this.displayMoreReviews}
            toggleModal={this.toggleModal}
          />
        </RightColumn>
        <ReviewModal
          productId={this.state.productId}
          meta={this.state.meta}
          visible={this.state.addReviewModal}
          toggleModal={this.toggleModal}
          submitReview={this.submitReview} />
      </ReviewsContainer>
    );
  }
}

export default Reviews;
