import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const DivContainer = styled.div`
  border: 6px ridge darkblue;
  background-image: linear-gradient(to bottom right, cyan, deepskyblue);
  display: grid;
`;

const ImageContainer = styled.div`
  position: relative;
  grid-column: 1;
  width: 65vw;
  height: 80vh;
`;

const MainImage = styled.img`
  position: absolute;
  grid-column: 1;
  width: 65vw;
  height: 80vh;
`;

const TestDiv = styled.div`
  position: absolute;
  background-color: black;
  color: black;
  height: 60vh;
  width: 15vw;
  overflow-wrap: break-word;
  z-index: 10;
  top: 0;
  left: 0;
  margin-top: 6%;
  margin-left: 1%;
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

const TestButton = styled.button`
  border: 1px solid black;
  border-radius: 12px;
  color: black;
  background-color: red;
  transition: .2s;

  &:hover {
    transform: scale(1.25);
    background-color: blue;
  }
`;

function Overview(props) {
  // function handlers, state, hooks, general javascript all goes here

  const [isClicked, setIsClicked] = useState(false);
  const [category, setCategory] = useState('Category');
  const [title, setTitle] = useState('Title');
  const [price, setPrice] = useState('Price');

  const getData = () => {
    axios({
      url: 'http://localhost:3000/products',
      method: 'GET',
    })
      .then(res => {
        console.log('result data -> ', res.data);
        console.log('before -> ', category);
        setCategory(res.data[0].category);
        setTitle(res.data[0].name);
        setPrice(res.data[0].default_price);
        console.log('after -> ', category);
      })
      .catch(err => console.error(err));
  };

  // useEffect(() => {
  //   getData();
  // }, [isClicked]);

  return (
    <DivContainer>
      <ImageContainer>
        <TestDiv>This is a test...</TestDiv>
        <MainImage src="https://media.gq.com/photos/61ae8b790d615a23f08b5a25/master/w_2000,h_1333,c_limit/Jordan-11-Retro-sneakers.jpg" />
      </ImageContainer>
      <SelectStyleDiv>
        <ProductCategory>{category}</ProductCategory>
        <ProductTitle><b>{title}</b></ProductTitle>
        <Price>{`$${price}`}</Price>
        <TestButton onClick={getData}>GET info</TestButton>
      </SelectStyleDiv>
    </DivContainer>
  );
}

export default Overview;
