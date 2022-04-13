import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import axios from 'axios';
import StarDisplay from '../library/StarDisplay.jsx';
import PhotoModal from './PhotoModal.jsx';

const EntryContainer = styled.div`
  display: grid;
  grid-template-rows: 5% 5% 10% 75% 5%;
  margin: 3% 0;
  min-height: 45%;
  border-bottom: 1px solid #353935;
`;

const Header = styled.div`
  grid-row-start: 1;
  display: grid;
  grid-template-columns: 50% 50%;
`;

const Recommend = styled.div`
  grid-row-start: 2;
  text-align: right;
  font-size: 12px;
`;

const Title = styled.div`
  grid-row-start: 3;
  font-size: 20px;
  font-weight: bold;
  align-self: center;
`;

const Body = styled.div`
  grid-row-start: 4;
  grid-row-end: -2;
  font-size: 14px;
  margin: 1% 2% 5% 1%;
`;

const Response = styled.div`
  background-color: #d3d3d3;
  margin: 2% 0;
  padding: 2% 2% 1% 2%;
`;

const Photos = styled.div`
  margin: 10px 0;
`;

const Thumbnail = styled.img`
  object-fit: contain;
  height: 60px;
  width: auto;
  margin-right: 5px;
  cursor: pointer;
  border: .5px solid gray;
`;

const Footer = styled.div`
  grid-row-start: 5;
  height: 12px;
  font-size: 12px;
  text-align: right;
`;

const Button = styled.button`
  font-family: Comfortaa;
	text-align: center;
	background: none;
	margin: 0;
	padding: 0;
	border: none;
	cursor: pointer;
  &:hover {
    color: teal;
  }
`;

class ReviewListEntry extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isBodyTruncated: true,
      photoModal: false,
      photo: {},
      helpfulness: this.props.review.helpfulness,
      reported: false
    };

    this.markReviewHelpful = this.markReviewHelpful.bind(this);
    this.reportReview = this.reportReview.bind(this);
    this.toggleTruncation = this.toggleTruncation.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  markReviewHelpful() {
    axios.put(`/reviews/${this.props.review.review_id}/helpful`)
      .catch(err => console.log(err));
    this.setState({
      helpfulness: this.state.helpfulness + 1
    });
  }

  reportReview() {
    axios.put(`/reviews/${this.props.review.review_id}/report`)
      .catch(err => console.log(err));
    this.setState({
      reported: true
    });
  }

  toggleTruncation() {
    this.setState({
      isBodyTruncated: !this.state.isBodyTruncated
    });
  }

  toggleModal(photo) {
    this.setState({
      photo: photo,
      photoModal: !this.state.photoModal
    });
  }

  // TODO
  // verified check, next to reviewer_name?

  render () {
    const { review } = this.props;

    const reviewBody = this.state.isBodyTruncated
      ? review.body.substring(0, 250)
      : review.body;

    const showMore = review.body.length > 250 && this.state.isBodyTruncated
      ? <Button onClick={this.toggleTruncation}>&nbsp;&nbsp;&nbsp;...show more</Button>
      : null;

    const reviewPhotos = review.photos.length > 0
      ? <Photos>
        {review.photos.map((photo, index) => {
          return (
            <Thumbnail
              key={index}
              src={photo.url}
              onClick={() => this.toggleModal(photo)}
            >
            </Thumbnail>
          );
        })}
      </Photos>
      : null;

    const reviewerRecommends = review.recommend
      ? '\u2713  I recommend this product'
      : null;

    const reviewResponse = review.response !== null && review.response.length > 0
      ? <Response>
        <strong>Response from seller:</strong>
        <p>{review.response}</p>
      </Response>
      : null;

    const helpfulYes = this.state.helpfulness === this.props.review.helpfulness
      ? <Button onClick={this.markReviewHelpful}>Yes</Button>
      : <span style={{textDecoration: 'underline'}}>Yes</span>;

    const reportReview = !this.state.reported
      ? <span>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <Button onClick={this.reportReview}>report</Button>
      </span>
      : null;

    return (
      <EntryContainer className="review-list-entry">
        <Header>
          <StarDisplay rating={review.rating} />
          <span style={{textAlign: 'right'}}>
            {review.reviewer_name}, {moment(review.date).format('LL')}
          </span>
        </Header>
        <Recommend>
          {reviewerRecommends}
        </Recommend>
        <Title>
          {review.summary}
        </Title>
        <Body>
          {reviewBody}
          {showMore}
          {reviewResponse}
          {reviewPhotos}
        </Body>
        <Footer>
          Helpful?&nbsp;&nbsp;
          {helpfulYes}
          <span>&nbsp;&nbsp;&#40;{this.state.helpfulness}&#41;</span>
          {reportReview}
        </Footer>
        <PhotoModal
          photo={this.state.photo}
          visible={this.state.photoModal}
          toggleModal={this.toggleModal}
        />
      </EntryContainer>
    );
  }
}

export default ReviewListEntry;
