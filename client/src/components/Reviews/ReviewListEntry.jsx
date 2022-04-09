import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import StarDisplay from '../library/StarDisplay.jsx';
import PhotoModal from './PhotoModal.jsx';

const EntryContainer = styled.div`
  display: grid;
  grid-template-rows: 5% 5% 10% 70% 5%;
  height: 45%;
  padding: 2.5% 0 2.5% 0;
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
  font-size: 14px;
  padding: 1% 2% 1% 1%;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &:-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

const Response = styled.div`
  background-color: #d3d3d3;
  margin: 2% 0;
  padding: 2% 2% 1% 2%;
`;

const Footer = styled.div`
  grid-row-start: -1;
  font-size: 12px;
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

const Photos = styled.div`
`;

const Thumbnail = styled.img`
  object-fit: contain;
  height: 70px;
  width: auto;
  margin-right: 5px;
  cursor: pointer;
`;


class ReviewListEntry extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isBodyTruncated: true,
      photoModal: false,
      photo: null
    };

    this.toggleTruncation = this.toggleTruncation.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
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

  // verified check, next to reviewer_name?

  // Helpful?
  // Yes link -> send API call
  // (review.helpfulness) | Report link -> send API call

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
              src={photo}
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
          <Button>Yes</Button>
          &nbsp;&nbsp;&#40;{review.helpfulness}&#41;&nbsp;&nbsp;|&nbsp;&nbsp;
          <Button>report</Button>
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
