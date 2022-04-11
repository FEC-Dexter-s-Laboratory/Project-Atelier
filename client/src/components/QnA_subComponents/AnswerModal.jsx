import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import { Modalbackground, Modalform, Titlelabel, Modaltitle, Modalinput, Disclaimer, Modalsubmit, Xmodalbutton } from './QnAStyledComponents.style.js';

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

  handleSubmit() {
    axios.post('/qa/questions/:question_id/answers',
      this.state,
      {
        params: {
          question_id: this.props.id,
        }
      })
      .then(() => {
        this.props.close();
        alert('successfully posted your answer');
      })
      .catch(() => {
        alert('there was a problem with your request');
      });
  }

  render () {
    if (!this.props.active) {
      return null;
    } else {
      return ReactDom.createPortal(
        <Modalbackground>
          <Modalform onSubmit={this.handleSubmit}>
            <Xmodalbutton onClick={this.props.close}>X</Xmodalbutton>
            <Modaltitle>Submit your Answer</Modaltitle><br/>
            <Titlelabel>Your Answer:</Titlelabel><br/>
            <Modalinput type='text' value={this.state.body} onChange={this.handleBChange} required></Modalinput><br/>
            <Titlelabel>What is your nickname:</Titlelabel><br/>
            <Modalinput type='text' value={this.state.name} onChange={this.handleNChange} placeholder='Example: jack543!!' required></Modalinput><br/>
            <Disclaimer>For privacy reasons, do not use your full name or email address</Disclaimer><br/>
            <Titlelabel>Your email:</Titlelabel><br/>
            <Modalinput type='email' value={this.state.email} onChange={this.handleEChange} placeholder='Example: jack@email.com' required></Modalinput><br/>
            <Disclaimer>For authentication reasons, you will not be emailed</Disclaimer>
            <Modalsubmit onClick={this.handleSubmit}>Submit</Modalsubmit>
          </Modalform>
        </Modalbackground>,
        document.getElementById('QnA_portal')
      );
    }
  }

}

export default AnswerModal;