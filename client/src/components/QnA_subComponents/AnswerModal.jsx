import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import { Modalbackground, Modalform, Titlelabel, Modaltitle, Modalinput, Disclaimer, Modalsubmit, Xmodalbutton, Modalborder } from './QnAStyledComponents.style.js';
import getHostedURL from '../library/getHostedURL.js';

class AnswerModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      name: '',
      email: '',
      photos: [],
    };
    this.handleBChange = this.handleBChange.bind(this);
    this.handleNChange = this.handleNChange.bind(this);
    this.handleEChange = this.handleEChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePChange = this.handlePChange.bind(this);
  }

  handleBChange (e) {
    e.preventDefault();
    this.setState({body: e.target.value});
  }

  handleNChange (e) {
    e.preventDefault();
    this.setState({name: e.target.value});
  }

  handleEChange (e) {
    e.preventDefault();
    this.setState({email: e.target.value});
  }

  handlePChange (e) {
    e.preventDefault();
    if (e.target.files.length > 5) {
      alert ('Please select up to five photos');
      e.target.value = '';
      return;
    }
    this.setState({photos: [ ...e.target.files]});
  }

  handleSubmit(e) {
    e.preventDefault();
    let photoUrls = [];
    for (let photo of this.state.photos) {
      photoUrls.push(getHostedURL(photo));
    }

    Promise.all(photoUrls)
      .then((res) => {
        let inputData = {
          body: this.state.body,
          name: this.state.name,
          email: this.state.email,
          photos: res,
        };

        this.props.submitAnswer(inputData);
      });
  }

  render () {
    if (!this.props.active) {
      return null;
    } else {
      return ReactDom.createPortal(
        <>
          <Modalbackground></Modalbackground>
          <Modalborder>
            <Modalform onSubmit={this.handleSubmit}>
              <Xmodalbutton onClick={this.props.close} aria-label='Closs the Answer Modal'>X</Xmodalbutton>
              <Modaltitle>Submit your Answer</Modaltitle><br/>
              <Titlelabel>Your Answer:</Titlelabel><br/>
              <Modalinput type='text' value={this.state.body} onChange={this.handleBChange} required></Modalinput><br/>
              <Titlelabel>What is your nickname:</Titlelabel><br/>
              <Modalinput type='text' value={this.state.name} onChange={this.handleNChange} placeholder='Example: jack543!!' required></Modalinput><br/>
              <Disclaimer>For privacy reasons, do not use your full name or email address</Disclaimer><br/>
              <Titlelabel>Your email:</Titlelabel><br/>
              <Modalinput type='email' value={this.state.email} onChange={this.handleEChange} placeholder='Example: jack@email.com' required></Modalinput><br/>
              <Disclaimer>For authentication reasons, you will not be emailed</Disclaimer>
              <Titlelabel>Upload Photos</Titlelabel>
              <Modalinput type='file' multiple onChange={this.handlePChange} accept='.jpg,.png'></Modalinput>
              <Modalsubmit onClick={this.handleSubmit}>Submit</Modalsubmit>
            </Modalform>
          </Modalborder>
        </>,
        document.getElementById('QnA_portal')
      );
    }
  }

}

export default AnswerModal;