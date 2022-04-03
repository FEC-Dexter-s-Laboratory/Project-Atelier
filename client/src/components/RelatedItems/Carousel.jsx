import React from 'react';
import styled from 'styled-components';
import RelatedCard from './RelatedCard.jsx';

const CaroContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CaroWrapper = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`;

const ContentWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const ContentStyle = styled.div`
  display: flex;
  transition: all 250ms linear;
  width: 100%;
  flex-shrink: 0;
  flex-grow: 1;
`;

const ArrowLeft = styled.button`
  position: absolute;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: white;
  border: 1px solid #ddd;
  left: 24px;
`

const ArrowRight = styled.button`
  position: absolute;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: white;
  border: 1px solid #ddd;
  right: 24px;
`

const Carousel = (props) => {
  const { children } = props;
  return (
    <CaroContainer>
      <CaroWrapper>
        <ArrowLeft> &lt; </ArrowLeft>
        <ContentWrapper>
          <ContentStyle>
            {children}
          </ContentStyle>
        </ContentWrapper>
        <ArrowRight> &gt; </ArrowRight>
      </CaroWrapper>
    </CaroContainer>
  )
}

export default Carousel;
