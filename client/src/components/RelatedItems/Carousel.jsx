import React, {useState, useEffect} from 'react';
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
  display: flex;
  flex-direction: row;
`;

const ContentStyle = styled.div`
  display: flex;
  transition: all 250ms linear;
  width: 50%;
  flex-shrink: 0;
  flex-grow: 1;
  justify-content: left;
  align-items: center;
`;

const Arrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: white;
  border: 1px solid #ddd;
`;

const Carousel = (props) => {
  const { products } = props;
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextButton = () => {
    if (currentIndex < (products.length - 1)) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const backButton = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <CaroContainer>
      <CaroWrapper>
        {currentIndex > 0 &&
        <Arrow style={{left: '-70px'}} onClick={backButton}> &lt; </Arrow>
        }
        <ContentWrapper>
          {products.map(product =>
            <ContentStyle style={{transform: `translateX(-${currentIndex * (100)}%)`}}>
              <RelatedCard product={product} key={product.id} handleDefaultClick={props.handleDefaultClick} use={props.use} handleOutfitClick={props.handleOutfitClick} />
            </ContentStyle>
          )}
        </ContentWrapper>
        {currentIndex < (products.length - 2) &&
        <Arrow style={{right: '24px'}} onClick={nextButton}> &gt; </Arrow>
        }
      </CaroWrapper>
    </CaroContainer>
  );
};

export default Carousel;
