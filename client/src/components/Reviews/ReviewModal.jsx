import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import StarButtons from '../library/StarButtons.jsx';

const ModalPop = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 1em;
  height: 75%;
  width: 50%;
  overflow-y: auto;
  z-index: 999;
  font-family: Comfortaa;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
  opacity: 0.75;
  z-index: 99;
  font-family: Comfortaa;
`;

class ReviewModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rating: null,
      summary: '',
      body: '',
      recommend: null,
      name: '',
      email: '',
      photos: [],
      characteristics: {}
    };

    this.productId = Number(props.productId);

    this.setRating = this.setRating.bind(this);
    this.setRecommend = this.setRecommend.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setRating(rating) {
    this.setState({
      rating
    });
  }

  setRecommend(e) {
    this.setState({
      recommend: !!e.target.value
    });
  }

  handleInputChange(e, field) {
    if (field === 'summary') {
      this.setState({
        summary: e.target.value
      });
    }
    if (field === 'body') {
      this.setState({
        body: e.target.value
      });
    }
    if (field === 'name') {
      this.setState({
        name: e.target.value
      });
    }
    if (field === 'email') {
      this.setState({
        email: e.target.value
      });
    }
  }

  handleSubmit() {
    const newReview = {
      product_id: this.productId,
      rating: this.state.rating,
      summary: this.state.summary,
      body: this.state.body,
      recommend: this.state.recommend,
      name: this.state.name,
      email: this.state.email,
      photos: this.state.photos,
      characteristics: this.state.characteristics
    };

    console.log(newReview); // console log here, implement API 'POST'
  }

  render() {
    const {visible, toggleModal} = this.props;

    let parseRating = '';
    switch (this.state.rating) {
    case 5:
      parseRating = 'great';
      break;
    case 4:
      parseRating = 'good';
      break;
    case 3:
      parseRating = 'average';
      break;
    case 2:
      parseRating = 'fair';
      break;
    case 1:
      parseRating = 'poor';
      break;
    default:
      parseRating = '';
    }

    const bodyCounter = this.state.body.length >= 50
      ? <span>Minimum reached</span>
      : <span>Minimum required characters left &#91;{50 - this.state.body.length}&#93;</span>;

    if (visible) {
      return ReactDOM.createPortal(
        <div className="add-review-modal">
          <ModalOverlay />
          <ModalPop role="dialog" aria-modal="true">
            <div>
              <h3>Write Your Review</h3>
              <span>About the **Product Name**</span>
            </div>
            <br/>
            <div>
              <span>Overall Rating*</span>
              <br/>
              <StarButtons reportRating={this.setRating}/>
              <span>{parseRating}</span>
            </div>
            <br/>
            <div onChange={this.setRecommend}>
              <span>Do You Recommend?*</span>
              <br/>
              <input type="radio" name="recommend" value="true"/>Yes
              <input type="radio" name="recommend" value="false" />No
            </div>
            <br/>
            <div>
              <span>Characteristics*</span>
            </div>
            <br/>
            <div>
              <span>Review Summary</span>
              <br/>
              <input
                type="text"
                placeholder="Example: Best purchase ever!"
                size="60"
                value={this.state.summary}
                onChange={e => this.handleInputChange(e, 'summary')}
              />
            </div>
            <br/>
            <div>
              <span>Review Body*</span>
              <br/>
              <textarea
                placeholder="Why did you like the product or not?"
                maxLength="1000"
                wrap="soft"
                cols="50"
                rows="20"
                value={this.state.body}
                onChange={e => this.handleInputChange(e, 'body')}
              />
              <br/>{bodyCounter}
            </div>
            <br/>
            <div>
              <span>Upload Your Photos  </span>
              <button>upload</button>
            </div>
            <br/>
            <div>
              <span>What is Your Nickname?*</span>
              <br/>
              <input
                type="text"
                placeholder="Example: jackson11!"
                size="60"
                value={this.state.name}
                onChange={e => this.handleInputChange(e, 'name')}
              />
            </div>
            <br/>
            <div>
              <span>Your Email*</span>
              <br/>
              <input
                type="email"
                placeholder="Example: jackson11@email.com"
                size="60"
                value={this.state.email}
                onChange={e => this.handleInputChange(e, 'email')}
              />
              <br/>
              <span>for authentication purposes only, you will not be emailed</span>
            </div>
            <br/>
            <div>
              <button type="button" onClick={this.handleSubmit}>Submit Review</button>
              <button type="button" onClick={toggleModal}>Go Back</button>
            </div>
          </ModalPop>

        </div>
        , document.body
      );
    } else {
      return null;
    }
  }
}

export default ReviewModal;

// TODO

// Get product name from API?

// Characteristics
// loop through characteristics in metadata to render
// 5 radio buttons - see picture for each characteristic (will need a conditional)
// if characteristic is in characteristics, render radio button array with the correct labels

// Photo uploads (new page?)

// VALIDATE text fields on submit

// optional: lock document scroll when in Modal

// how should Characteristics look in our 'POST' body object?

// MetaData:
// {
//   "product_id": "65632",
//   "ratings": {
//     "2": "1",
//     "3": "1",
//     "4": "2",
//     "5": "9"
//   },
//   "recommended": {
//     "false": "2",
//     "true": "11"
//   },
//   "characteristics": {
//     "Quality": {
//       "id": 220234,
//       "value": "4.2000000000000000"
//     }
//   }
// }
