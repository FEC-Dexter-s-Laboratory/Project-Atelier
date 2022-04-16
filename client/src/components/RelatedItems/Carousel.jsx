import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Card from './Card.jsx';
import {CaroContainer, CaroWrapper, ContentWrapper, ContentStyle, Arrow, PreviewContainer, PreviewImage} from './Related&OutfitStyles.js';

const Carousel = (props) => {
  const { products } = props;
  const {images} = props;
  const [currentIndex, setCurrentIndex] = useState(0);

  // next and back buttons for carousels
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

  // next and back cuttons for preview carousels
  const [previewIndex, setPreviewIndex] = useState(0);
  const previewRight = (event) => {
    event.stopPropagation();
    if (previewIndex < (images.length - 1)) {
      setPreviewIndex(previewIndex + 1);
    }
  };

  const previewLeft = (event) => {
    event.stopPropagation();
    if (previewIndex > 0) {
      setPreviewIndex(previewIndex - 1);
    }
  };

  // if we get images as props, render preview carousel
  if (images) {
    if (images[0].thumbnail_url === null) {
      return <div style={{position: 'fixed', left: '20%', bottom: '30%', background: 'white'}}>No preview images available.</div>;
    }
    return (
      <PreviewContainer>
        <CaroWrapper >
          <PreviewContainer>
            {previewIndex > 0 &&
            <Arrow aria-label='Left scroll button' style={{left: '0', top: '-5%', height: '100%', width: '10%', zIndex: '999'}} onClick={(e) => previewLeft(e)}> &lt; </Arrow>
            }
            {images.map(image =>
              <PreviewImage key={image.thumbnail_url} style={{transform: `translateX(-${previewIndex * (100)}%)`}}>
                <img src={image.thumbnail_url} onClick={(event) => {
                  event.stopPropagation();
                  props.setCurrentImage(image.thumbnail_url);
                }} width="70px" style={{overflow: 'hidden', borderRadius: '12px'}}/>
              </PreviewImage>
            )}
            {previewIndex < (images.length - 4) &&
            <Arrow aria-label='Right scroll button' style={{right: '0', top: '-5%', height: '100%', width: '10%', zIndex: '999'}} onClick={(e) => previewRight(e)}> &gt; </Arrow>
            }
          </PreviewContainer>
        </CaroWrapper>
      </PreviewContainer>
    );
  }

  // else return normal carousel
  return (
    <CaroContainer>
      <CaroWrapper>
        {currentIndex > 0 &&
        <Arrow aria-label='Left scroll button' style={{left: '-1%'}} onClick={backButton}> &lt; </Arrow>
        }
        <ContentWrapper>
          {products.map(product =>
            <ContentStyle key={product.id} style={{transform: `translateX(-${currentIndex * (100)}%)`}}>
              <Card product={product} handleDefaultClick={props.handleDefaultClick} use={props.use} handleOutfitClick={props.handleOutfitClick}
                handleCardClick={props.handleCardClick} mainId={props.mainId} />
            </ContentStyle>
          )}
        </ContentWrapper>
        {currentIndex < (products.length - 3) &&
        <Arrow aria-label='Right scroll button' style={{right: '-5%'}} onClick={nextButton}> &gt; </Arrow>
        }
      </CaroWrapper>
    </CaroContainer>
  );
};

export default Carousel;