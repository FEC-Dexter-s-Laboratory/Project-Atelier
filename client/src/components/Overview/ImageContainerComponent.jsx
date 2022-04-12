import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ExpandedView from './ExpandedView.jsx';

// For images and thumbnails
const ImageContainer = styled.div`
  position: relative;
  grid-column: 1;
  grid-row: 1;
  width: 60vw;
  height: 100vh;
  background-image: linear-gradient(to right, grey, #ebe9e9);
`;

const ExpandIcon = styled.img`
  height: 50px;
  width: 50px;
  position: absolute;
  z-index: 13;
  top: 2%;
  right: 18%;
  cursor: pointer;
`;

const MainImage = styled.img`
  position: absolute;
  grid-column: 1;
  width: 50vw;
  height: 100vh;
  cursor: zoom-in;
  object-fit: contain;
`;

const ThumbDiv = styled.div`
  position: absolute;
  overflow: hidden;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 25% 25% 25% 25%;
  background-color: transparent;
  height: 65vh;
  width: 15vw;
  overflow-wrap: break-word;
  z-index: 10;
  top: 15%;
  left: 0;
  margin-left: 1%;
`;

const ThumbUpArrow = styled.button`
  font-size: 2rem;
  color: black;
  border-radius: 12px;
  border: 2px ridge black;
  position: absolute;
  z-index: 12;
  width: fit-content;
  top: 5%;
  left: 5%;
  display: none;
  cursor: pointer;
`;

const ThumbDownArrow = styled.button`
  font-size: 2rem;
  color: black;
  border-radius: 12px;
  border: 2px ridge black;
  position: absolute;
  z-index: 12;
  width: fit-content;
  bottom: 11%;
  left: 5%;
  display: block;
  cursor: pointer;
`;

const ImageContainerComponent = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  let { styles, mainImage, isHighlighted, styleResults, setMainImage, setCurrentThumb, enterThumb, leaveThumb } = props;
  let stylesColCounter = 0;
  let stylesRowCounter = 0;
  let thumbDisplay = 'flex';

  const displayThumb = (e) => {
    let newE;
    if (typeof e === 'object') {
      newE = Number(e.target.classList[0]);
    } else {
      newE = e;
    }
    setCurrentThumb(newE);
    let newImage = '';
    styles.forEach((style, index) => {
      if (newE > 0) {
        document.getElementById('thumbUpArrow').style.display = 'block';
      }
      if (style.id === newE) {
        if (newE === 0) {
          document.getElementById('thumbUpArrow').style.display = 'none';
        }
        newImage = style.srcUrl;
        document.getElementById(`${index}thumb`).style.border = '4px solid white';
      } else {
        document.getElementById(`${index}thumb`).style.border = null;
      }
    });
    setMainImage(newImage);
  };

  // for highlighting selected thumbnail
  const highlight = (e) => {
    if (!isHighlighted) {
      setIsHighlighted(true);
      e.target.style.border = '2px ridge white';
      displayImage(e);
    } else {
      setIsHighlighted(false);
      e.target.style.border = null;
    }
  };

  const thumbUp = (e) => {
    // move up through thumbnails
    if (document.getElementById(`${styles.length - 1}thumb`).style.border === '4px solid white') {
      document.getElementById('thumbDownArrow').style.display === 'block';
    } else if (document.getElementById('1thumb').style.border === '4px solid white') {
      document.getElementById('thumbUpArrow').style.display = 'none';
      displayThumb(0);
    } else if (document.getElementById('2thumb').style.border === '4px solid white') {
      displayThumb(1);
      document.getElementById('0thumb').style.transform = 'translateY(10%)';
      document.getElementById('1thumb').style.transform = 'translateY(10%)';
      document.getElementById('2thumb').style.transform = 'translateY(10%)';
      document.getElementById('3thumb').style.transform = 'translateY(10%)';
      document.getElementById('4thumb').style.transform = 'translateY(50%)';
      document.getElementById('4thumbDiv').style.display = 'flex';
      document.getElementById('4thumbDiv').style.alignItems = 'center';
    } else if (document.getElementById('3thumb').style.border === '4px solid white') {
      displayThumb(2);
    } else if (document.getElementById('4thumb').style.border === '4px solid white') {
      displayThumb(3);
    } else if (document.getElementById('5thumb').style.border === '4px solid white') {
      displayThumb(4);
    }
  };

  const thumbDown = (e) => {
    // move down through thumbnails
    if (document.getElementById('0thumb').style.border === '4px solid white') {
      document.getElementById('thumbUpArrow').style.display = 'block';
      displayThumb(1);
    } else if (document.getElementById('1thumb').style.border === '4px solid white') {
      displayThumb(2);
    } else if (document.getElementById('2thumb').style.border === '4px solid white') {
      displayThumb(3);
    } else if (document.getElementById('3thumb').style.border === '4px solid white') {
      displayThumb(4);
      document.getElementById('0thumb').style.transform = 'translateY(-120%)';
      document.getElementById('0thumb').style.display = 'none';
      document.getElementById('1thumb').style.transform = 'translateY(-120%)';
      document.getElementById('2thumb').style.transform = 'translateY(-120%)';
      document.getElementById('3thumb').style.transform = 'translateY(-120%)';
      document.getElementById('4thumb').style.transform = 'translateY(-50%)';
      document.getElementById('4thumbDiv').style.display = 'flex';
      document.getElementById('4thumbDiv').style.alignItems = 'center';
    } else if (document.getElementById('4thumb').style.border === '4px solid white') {
      displayThumb(5);
      document.getElementById('0thumb').style.transform = 'translateY(-120%)';
      document.getElementById('1thumb').style.transform = 'translateY(-120%)';
      document.getElementById('1thumb').style.display = 'none';
      document.getElementById('2thumb').style.transform = 'translateY(-120%)';
      document.getElementById('3thumb').style.transform = 'translateY(-120%)';
      document.getElementById('4thumb').style.transform = 'translateY(-120%)';
      document.getElementById('4thumb').style.transform = 'translateY(-50%)';
      document.getElementById('5thumbDiv').style.display = 'flex';
      document.getElementById('5thumbDiv').style.alignItems = 'center';
    }
  };

  useEffect(() => {
    // watch props
  }, [props]);

  return (
    <>
      <ExpandedView mainImage={mainImage} open={isOpen} onClose={() => setIsOpen(false)} />
      <ImageContainer>
        <ThumbUpArrow id="thumbUpArrow" onMouseEnter={enterThumb} onMouseLeave={leaveThumb} onClick={thumbUp}> 🔼 </ThumbUpArrow>
        <ThumbDiv>
          {
            styles.map((style, index) => {
              stylesRowCounter += 1;
              stylesColCounter = 1;
              if (stylesRowCounter === 5) {
                thumbDisplay = 'none';
              }
              return (
                <div key={index} style={{gridColumn: stylesColCounter, gridRow: stylesRowCounter, display: thumbDisplay, justifyContent: 'end', alignItems: 'center'}} id={`${style.id}thumbDiv`}>
                  <img
                    style={{height: '100px', width: '100px', position: 'absolute', zIndex: '12', border: '1px solid black', float: 'right', border: index === 0 ? '4px solid white' : null, transition: '.2s', cursor: 'pointer'}}
                    src={!style.srcThumb ? 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg' : style.srcThumb}
                    alt="Thumb"
                    className={style.id}
                    id={`${style.id}thumb`}
                    onClick={displayThumb} />
                </div>
              );
            })
          }
        </ThumbDiv>
        <ThumbDownArrow id="thumbDownArrow" onMouseEnter={enterThumb} onMouseLeave={leaveThumb} onClick={thumbDown}> 🔽 </ThumbDownArrow>
        <ExpandIcon src="https://media.istockphoto.com/vectors/expand-view-icon-vector-id1171638614?k=20&m=1171638614&s=170667a&w=0&h=-TrQvj3L0_QQeqWgNRHOlpgtLp3vYkGLegLqDbj5aW8=" alt="Expand" onMouseEnter={enterThumb} onMouseLeave={leaveThumb}
          onClick={() => { setIsOpen(true); }} />
        <MainImage src={!mainImage ? 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg' : mainImage} alt="Main"
          onClick={() => { setIsOpen(true); }} />
      </ImageContainer>
    </>
  );
};

export default ImageContainerComponent;