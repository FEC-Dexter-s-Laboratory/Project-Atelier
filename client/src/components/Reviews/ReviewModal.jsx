import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import axios from 'axios';
import StarButtons from '../library/StarButtons.jsx';
import getHostedURL from '../library/getHostedURL.js';

const ModalPop = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 1em;
  height: 85%;
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
`;

const Close = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 30px;
  background: none;
  border: none;
  cursor: pointer;
  color: #d3d3d3;
  &:hover {
    color: teal;
  }
`;

const Back = styled.button`
  font-size: 15px;
  background: none;
  border: 1px solid #353935;
  margin-right: 10px;
  padding: 10px;
  width: 100px;
  cursor: pointer;
  &:hover {
    color: teal;
  }
`;

const Submit = styled.input`
  font-size: 15px;
  background: none;
  border: 1px solid #353935;
  margin-right: 10px;
  padding: 10px;
  width: 100px;
  cursor: pointer;
  &:hover {
    color: teal;
  }
`;

const CharRadio = styled.input`
  margin-right: 10px;
`

const CharLabel = styled.label`
  font-size: 12px;
`

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
      characteristics: {},
    };

    this.setPhotos = this.setPhotos.bind(this);
    this.setRating = this.setRating.bind(this);
    this.setRecommend = this.setRecommend.bind(this);
    this.setCharacteristic = this.setCharacteristic.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setPhotos(e) {
    if (e.target.files.length > 5) {
      alert('Please select up to 5 photos to upload');
      e.target.value = '';
      return;
    }

    this.setState({
      photos: [...e.target.files]
    });
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

  setCharacteristic(e) {
    let updatedChars = {...this.state.characteristics, [e.target.id]: Number(e.target.value)};
    this.setState({
      characteristics: updatedChars
    });
  }

  handleInputChange(e, field) {
    if (field === 'summary') {
      this.setState({
        summary: e.target.value.slice(0, 60)
      });
    }
    if (field === 'body') {
      this.setState({
        body: e.target.value.slice(0, 1000)
      });
    }
    if (field === 'name') {
      this.setState({
        name: e.target.value.slice(0, 60)
      });
    }
    if (field === 'email') {
      this.setState({
        email: e.target.value.slice(0, 60)
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.rating === null) {
      alert('Please select a star rating');
      return;
    }
    if (this.state.recommend === null) {
      alert('Please provide your recommendation of this product');
      return;
    }
    if (Object.keys(this.state.characteristics).length !== Object.keys(this.props.meta.characteristics).length) {
      alert('Please rate all of the product characteristics');
      return;
    }
    if (this.state.body.length < 50) {
      alert('Please write a longer review body (min 50 chars)');
      return;
    }
    if (this.state.name.length < 1) {
      alert('Please provide your nickname');
      return;
    }
    if (this.state.email.length < 1 || !this.state.email.includes('@')) {
      alert('Please provide a valid email address');
      return;
    }

    this.props.toggleModal();

    const newReview = {
      product_id: Number(this.props.productId),
      rating: this.state.rating,
      summary: this.state.summary,
      body: this.state.body,
      recommend: this.state.recommend,
      name: this.state.name,
      email: this.state.email,
      photos: [],
      characteristics: this.state.characteristics
    };

    let photoURLs = []
    for (let photo of this.state.photos) {
      photoURLs.push(getHostedURL(photo));
    }

    Promise.all(photoURLs)
      .then((photoURLs) => {
        newReview.photos = photoURLs;
        this.props.submitReview(newReview);
      });
  }

  render() {
    const {meta, visible, toggleModal} = this.props;

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

    const bodyCounter = this.state.body.length < 50
      ? <span style={{fontSize: "12px"}}>
        Minimum required characters left &#91;{50 - this.state.body.length}&#93;
      </span>
      : <span style={{fontSize: "12px"}}>Minimum reached</span>;

    const charLabels = {
      Size: ['a size too small', '1/2 size too small', 'perfect', '1/2 size too big', 'a size too big'],
      Width: ['too narrow', 'slightly narrow', 'perfect', 'slightly wide', 'too wide'],
      Comfort: ['uncomfortable', 'slightly uncomfortable', 'ok', 'comfortable', 'perfect'],
      Quality: ['poor', 'below average', 'average', 'pretty great', 'perfect'],
      Length: ['runs short', 'slightly short', 'perfect', 'slightly long', 'runs long'],
      Fit: ['very tight', 'tight', 'perfect', 'loose', 'very loose']
    };

    let charsArray = [];
    for (let char in meta.characteristics) {
      charsArray.push({
        name: char,
        id: meta.characteristics[char].id,
        labels: charLabels[char]
      });
    }

    // TODO:
    // product name from API or App
    // lock background scroll

    if (visible) {
      return ReactDOM.createPortal(
        <div className="add-review-modal">
          <ModalOverlay />
          <ModalPop role="dialog" aria-modal="true">
            <Close onClick={toggleModal}>&times;</Close>
            <div>
              <h2>Write Your Review</h2>
              <strong>about the **Product Name**</strong>
            </div>
            <br/>
            <div>
              <strong>Overall Rating*</strong>
              &nbsp;&nbsp;
              <StarButtons reportRating={this.setRating}/>
              <span>{parseRating}</span>
            </div>
            <br/>
            <div onChange={this.setRecommend}>
              <strong>Do You Recommend?*</strong>
              &nbsp;&nbsp;
              <input type="radio" name="recommend" value="true" />Yes
              <input type="radio" name="recommend" value="false" />No
            </div>
            <br/>
            <div>
              <strong>Characteristics*</strong>
              <br/><br/>
              {charsArray.map((char) => {
                return (
                  <div onChange={this.setCharacteristic}>
                    <div>{char.name}</div>
                    <div>
                      <CharLabel>{char.labels[0]}</CharLabel>
                      {[...Array(5)].map((button, index) => {
                        index += 1;
                        return (
                          <CharRadio type="radio" key={index} name={char.name} id={char.id} value={index}></CharRadio>
                        );
                      })}
                      <CharLabel>{char.labels[4]}</CharLabel>
                    </div>
                    <br/>
                  </div>
                );
              })}
            </div>
            <div>
              <strong>Review Summary</strong>
              <br/>
              <input
                type="text"
                size="60"
                placeholder="Example: Best purchase ever!"
                value={this.state.summary}
                onChange={e => this.handleInputChange(e, 'summary')}
              />
            </div>
            <br/>
            <div>
              <strong>Review Body*</strong>
              <br/>
              <textarea
                placeholder="Why did you like the product or not?"
                wrap="soft"
                cols="60"
                rows="10"
                style={{resize: "none", fontFamily: "Comfortaa"}}
                value={this.state.body}
                onChange={e => this.handleInputChange(e, 'body')}
              />
              <br/>{bodyCounter}
            </div>
            <br/>
            <div>
              <strong>Upload Your Photos  </strong>
              <input
                multiple
                type="file"
                accept=".jpg,.png"
                onChange={this.setPhotos}
              />
            </div>
            <br/>
            <div>
              <strong>Nickname*</strong>
              <br/>
              <input
                type="text"
                size="60"
                placeholder="Example: jackson11!"
                value={this.state.name}
                onChange={e => this.handleInputChange(e, 'name')}
              />
            </div>
            <br/>
            <div>
              <strong>Email*</strong>
              <span style={{fontSize: "12px"}}>&nbsp;&nbsp;&#91;authentication purposes only, you will not be emailed&#93;</span>
              <br/>
              <input
                type="email"
                size="60"
                placeholder="Example: jackson11@email.com"
                value={this.state.email}
                onChange={e => this.handleInputChange(e, 'email')}
              />
            </div>
            <br/>
            <Submit type="submit" onClick={this.handleSubmit}/>
            <Back type="button" onClick={toggleModal}>Back</Back>
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
