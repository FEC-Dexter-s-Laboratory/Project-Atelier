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

const Carousel = (props) => {
  const { children } = props;
  return (
    <CaroContainer>
      <CaroWrapper>
        <button> &lt; </button>
        <ContentWrapper>
          <ContentStyle>
            {children}
          </ContentStyle>
        </ContentWrapper>
        <button> &gt; </button>
      </CaroWrapper>
    </CaroContainer>
  )
}

export default Carousel;
