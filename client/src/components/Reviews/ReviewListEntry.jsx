import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import StarDisplay from '../library/StarDisplay.jsx';

//grid-template-columns: 25% 25% 25% 25%;

const EntryContainer = styled.div`
  display: grid;
  padding: 5px 0 5px 0;
  border-bottom: 1px solid #353935;
  font-family: Comfortaa;
`;

class ReviewListEntry extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isBodyTruncated: true
    };

    this.toggleTruncation = this.toggleTruncation.bind(this);
  }

  toggleTruncation() {
    this.setState({
      isBodyTruncated: !this.state.isBodyTruncated
    });
  }

  // verified check, next to reviewer_name?

  // ## review.summary (truncate to eliminate next-line?)

  // handle body text  full length (1000chars)

  // photo thubmnails & modal

  // Helpful?
  // Yes link -> send API call
  // (review.helpfulness) | Report link -> send API call

  // CSS border between reviews (skip first top border)
  render () {
    const { review } = this.props;

    const reviewBody = this.state.isBodyTruncated
      ? review.body.substring(0, 250)
      : review.body;

    const showMore = review.body.length > 250 && this.state.isBodyTruncated
      ? <button onClick={this.toggleTruncation}>Show more</button>
      : null;

    // thumbnail click launches full page modal
    const reviewPhotos = review.photos.length > 0
      ? <div>Photo Thumbnails Here</div>
      : null;

    const reviewerRecommends = review.recommend
      ? <div>&#10003;  I recommend this product</div>
      : null;

    const reviewResponse = review.response !== null && review.response.length > 0
      ? <div>
        <h5>Response from seller:</h5>
        <p>{review.response}</p>
      </div>
      : null;

    return (
      <EntryContainer className="review-list-entry">
        <StarDisplay font={30} rating={review.rating} />
        <span>{review.reviewer_name}, {moment(review.date).format('LL')}</span>
        <h4>{review.summary}</h4>
        {reviewBody}
        {showMore}
        {reviewPhotos}
        {reviewerRecommends}
        {reviewResponse}
        <div>
          Helpful? <button>Yes</button> &#40;{review.helpfulness}&#41;
        </div>
        <span>report review</span>

      </EntryContainer>
    );
  }
}

export default ReviewListEntry;