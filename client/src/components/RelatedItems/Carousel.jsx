import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import RelatedCard from './RelatedCard.jsx';

const CaroContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  overflow: hidden;
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

const PreviewImage = styled.div`
  background: white;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  z-index: 2;
  padding: 2px;
  width: 25%;
`;

const Carousel = (props) => {
  const { products } = props;
  const {images} = props;
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextButton = () => {
    if (currentIndex < (products.length - 1)) {
      setCurrentIndex(currentIndex + 1);
    }
    console.log(currentIndex)
  };

  const backButton = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // const [previewIndex, setPreviewIndex] = useState(0);
  // const previewRight = () => {
  //   if (previewIndex < (images.length - 1)) {
  //     setPreviewIndex(previewIndex + 1);
  //   }
  // };
  // const previewLeft = () => {
  //   if (previewIndex > 0) {
  //     setPreviewIndex(previewIndex - 1);
  //   }
  // };

  // if (images) {
  //   return (
  //     <CaroContainer>
  //       <CaroWrapper >
  //         {previewIndex > 0 &&
  //         <Arrow style={{left: '-20px'}} onClick={previewLeft}> &lt; </Arrow>
  //         }
  //         <ContentWrapper >
  //           {images.map(image =>
  //             <PreviewImage style={{transform: `translateX(-${previewIndex * (100 / 4)}%)`}}>
  //               <img src={image.thumbnail_url} height="100px" width="auto"/>
  //             </PreviewImage>
  //           )}
  //         </ContentWrapper>
  //         {previewIndex < (images.length - 1) &&
  //         <Arrow style={{right: '30px'}} onClick={previewRight}> &gt; </Arrow>
  //         }
  //       </CaroWrapper>
  //     </CaroContainer>
  //   );
  // }

  return (
    <CaroContainer>
      <CaroWrapper>
        {currentIndex > 0 &&
        <Arrow style={{left: '-70px'}} onClick={backButton}> &lt; </Arrow>
        }
        <ContentWrapper>
          {products.map(product =>
            <ContentStyle style={{transform: `translateX(-${currentIndex * (100)}%)`}}>
              <RelatedCard product={product} key={product.id} handleDefaultClick={props.handleDefaultClick} use={props.use} handleOutfitClick={props.handleOutfitClick} handleCardClick={props.handleCardClick} mainId={props.mainId}/>
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
