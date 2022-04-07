import React from 'react';
import ReactDom from 'react-dom';
import { Modalbackground, Questionform, Titlelabel, Modaltitle, Xmodalbutton } from './QnAStyledComponents.style.js';

const QuestionModal = ({ active, close }) => {

  if (!active) {
    return null;
  } else {
    return ReactDom.createPortal(
      <Modalbackground>
        <Questionform>
          <Xmodalbutton onClick={close}>X</Xmodalbutton>
          <Modaltitle>Ask Your Question</Modaltitle><br/>
          <Titlelabel>Your Question:</Titlelabel><br/>
          <input type='text' required></input><br/>
          <Titlelabel>What is your nickname:</Titlelabel><br/>
          <input type='text' placeholder='Example: jackson11!' required></input><br/>
          <label>For privacy reasons, do not use your full name or email address</label><br/>
          <Titlelabel>Your email:</Titlelabel><br/>
          <input type='email' placeholder='Why did you like the product or not?' required></input><br/>
          <label>For authentication reasons, you will not be emailed</label>
          <button>Submit</button>
        </Questionform>
      </Modalbackground>,
      document.getElementById('QnA_portal')
    );
  }

};

export default QuestionModal;