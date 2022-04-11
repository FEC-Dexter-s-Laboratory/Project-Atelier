import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Card from './Card.jsx';
import {CaroContainer, CaroWrapper, ContentWrapper, ContentStyle, Arrow, PreviewContainer, PreviewImage} from './Related&OutfitStyles.js';

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

  if (images) {
    if (images[0].thumbnail_url === null) {
      return <div style={{position: 'fixed', left: '20%', bottom: '80px', background: 'white'}}>No preview images available.</div>;
    }
    return (
      <PreviewContainer>
        <CaroWrapper >
          <PreviewContainer>
            {previewIndex > 0 &&
            <Arrow style={{left: '0', height: '100%', borderRadius: '0px', width: '30px', zIndex: '999'}} onClick={(e) => previewLeft(e)}> &lt; </Arrow>
            }
            {images.map(image =>
              <PreviewImage key={image.thumbnail_url} style={{transform: `translateX(-${previewIndex * (100)}%)`}}>
                <img src={image.thumbnail_url} onClick={(event) => {
                  event.stopPropagation();
                  props.setCurrentImage(image.thumbnail_url);
                }} width="70px" style={{overflow: 'hidden'}}/>
              </PreviewImage>
            )}
            {previewIndex < (images.length - 4) &&
            <Arrow style={{right: '-5px', height: '100%', borderRadius: '0px', width: '30px', zIndex: '999'}} onClick={(e) => previewRight(e)}> &gt; </Arrow>
            }
          </PreviewContainer>
        </CaroWrapper>
      </PreviewContainer>
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
              <Card product={product} handleDefaultClick={props.handleDefaultClick} use={props.use} handleOutfitClick={props.handleOutfitClick}
                handleCardClick={props.handleCardClick} mainId={props.mainId}/>
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