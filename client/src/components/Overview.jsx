import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const DivContainer = styled.div`
  border: 6px ridge darkblue;
  background-image: linear-gradient(to bottom right, cyan, deepskyblue);
  display: grid;
`;

const MainImage = styled.img`
  grid-column: 1;
  width: 65vw;
  height: 80vh;
`;

const TestDiv = styled.div`
  background-color: black;
  color: white;
  height: 60vh;
  width: 15vw;
  overflow-wrap: break-word;
  z-index: 10;
`;

const SelectStyleDiv = styled.div`
  grid-column: 2;
  width: 30vw;
  height: 80vh;
`;

const ProductCategory = styled.h3`
  color: white;
`;

const ProductTitle = styled.h1`
  color: white;
`;

const Price = styled.h4`
  color: white;
`;

function Overview(props) {
  // function handlers, state, hooks, general javascript all goes here

  const [isClicked, setIsClicked] = useState(false);

  // useEffect(() => {
  //   // implement desired hook effects here
  // }, [isClicked]);

  return (
    <DivContainer>
      <TestDiv>This is a test...</TestDiv>
      <MainImage src="https://media.gq.com/photos/61ae8b790d615a23f08b5a25/master/w_2000,h_1333,c_limit/Jordan-11-Retro-sneakers.jpg" />
      <SelectStyleDiv>
        <ProductCategory>Product Category Goes Here</ProductCategory>
        <ProductTitle><b>Product Title Goes Here</b></ProductTitle>
        <Price>$369</Price>
      </SelectStyleDiv>
    </DivContainer>
  );
}

export default Overview;
