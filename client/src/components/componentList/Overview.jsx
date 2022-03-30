import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const DivContainer = styled.div`
  border: 6px ridge darkblue;
  background-image: linear-gradient(to bottom right, cyan, deepskyblue);
  display: grid;
`

const Overview = (props) => {
  // function handlers, state, hooks, general javascript all goes here

  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    // implement desired hook effects here
  });

  return (
    <DivContainer></DivContainer>
  )
}