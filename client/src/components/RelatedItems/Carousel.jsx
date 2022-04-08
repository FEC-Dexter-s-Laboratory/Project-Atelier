import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Card from './Card.jsx';
import {CaroContainer, CaroWrapper, ContentWrapper, ContentStyle, Arrow, PreviewImage} from './Related&OutfitStyles.js';

const Carousel = (props) => {
  const { products } = props;
  const {images} = props;
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

  const [previewIndex, setPreviewIndex] = useState(0);
  const previewRight = () => {
    if (previewIndex < (images.length - 1)) {
      setPreviewIndex(previewIndex + 1);
    }
  };
  const previewLeft = () => {
    if (previewIndex > 0) {
      setPreviewIndex(previewIndex - 1);
    }
  };

  if (images) {
    if (images[0].thumbnail_url === null) {
      return <div style={{position: 'fixed', left: '50px', bottom: '80px', background: 'white'}}>No preview images available.</div>;
    }
    return (
      <CaroContainer>
        <CaroWrapper >
          {previewIndex > 0 &&
          <Arrow style={{left: '-40px', height: '30px', width: '30px'}} onClick={previewLeft}> &lt; </Arrow>
          }
          <ContentWrapper >
            {images.map(image =>
              <PreviewImage style={{transform: `translateX(-${previewIndex * (100)}%)`}}>
                <img src={image.thumbnail_url} height="100%" style={{overflow: 'hidden'}}/>
              </PreviewImage>
            )}
          </ContentWrapper>
          {previewIndex < (images.length - 1) &&
          <Arrow style={{right: '70x', height: '30px', width: '30px'}} onClick={previewRight}> &gt; </Arrow>
          }
        </CaroWrapper>
      </CaroContainer>
    );
  }

  return (
    <CaroContainer>
      <CaroWrapper>
        {currentIndex > 0 &&
        <Arrow style={{left: '-20px'}} onClick={backButton}> &lt; </Arrow>
        }
        <ContentWrapper>
          {products.map(product =>
            <ContentStyle key={product.id} style={{transform: `translateX(-${currentIndex * (100)}%)`}}>
              <Card product={product} handleDefaultClick={props.handleDefaultClick} use={props.use} handleOutfitClick={props.handleOutfitClick} handleCardClick={props.handleCardClick} mainId={props.mainId}/>
            </ContentStyle>
          )}
        </ContentWrapper>
        {currentIndex < (products.length - 3) &&
        <Arrow style={{right: '-55px'}} onClick={nextButton}> &gt; </Arrow>
        }
      </CaroWrapper>
    </CaroContainer>
  );
};

export default Carousel;