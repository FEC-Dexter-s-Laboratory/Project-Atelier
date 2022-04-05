import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import StarButtons from './library/StarButtons.jsx';
import StarDisplay from './library/StarDisplay.jsx';

// const DivContainer = styled.div`
//   border: 6px ridge darkblue;
//   background-image: linear-gradient(to bottom right, cyan, deepskyblue);
//   display: grid;
// `;

class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="reviews-module">
        Hello World!
        <StarButtons fontSize={100}/>
        <StarDisplay fontSize={100} rating={3.63}/>
      </div>
    );
  }
}

export default RatingsAndReviews;
