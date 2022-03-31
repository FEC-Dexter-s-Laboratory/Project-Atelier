import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const DivContainer = styled.div`
  border: 6px ridge darkblue;
  background-image: linear-gradient(to bottom right, cyan, deepskyblue);
  display: grid;
  width: 100vw;
`;

const MainImage = styled.img`
  grid-column: 1;
  width: 65vw;
  height: 80vh;
`;

const SelectStyleDiv = styled.div`
  grid-column: 2;
  width: 35vw;
  height: 80vh;
`;

const ProductTitle = styled.h1`
  justify-content: center;
  text-align: center;
`;

function Overview(props) {
  // function handlers, state, hooks, general javascript all goes here

  const [isClicked, setIsClicked] = useState(false);

  // useEffect(() => {
  //   // implement desired hook effects here
  // }, [isClicked]);

  return (
    <DivContainer>
      <MainImage src="https://media.gq.com/photos/61ae8b790d615a23f08b5a25/master/w_2000,h_1333,c_limit/Jordan-11-Retro-sneakers.jpg" />
      <SelectStyleDiv>
        <ProductTitle><b>Product Title Goes Here</b></ProductTitle>
      </SelectStyleDiv>
    </DivContainer>
  );
}

export default Overview;
