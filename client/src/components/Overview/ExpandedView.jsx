import React, { useState, useEffect } from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import styled from 'styled-components';

const ModalStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #9f9f9f;
  padding: 50px;
  z-index: 1000;
  opacity: 1;
  width: 80%;
  height: 80%;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  overflow-y: auto;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #000;
  opacity: 0.75;
  z-index: 800;
`;

const Button = styled.button`
  position: absolute;
  top: 2%;
  right: 2%;
  background-color: white;
  font-size: 20px;
  border: 2px ridge grey;
  border-radius: 12px;
  z-index: 2000;
  box-shadow: 10px 5px 5px black;
  transition: .2s;
  &:hover {
    transform: scale(1.25);
  }
`;

const ExpandedImageDiv = styled.div`
  position: fixed;
  z-index: 1001;
  width: auto;
  height: auto;
`;

const ExpandedImage = styled.img`
  position: relative;
  z-index:14;
  transition: .2s;
  top: 0;
  box-shadow: 10px 5px 5px black;
`;

const LeftButton = styled.button`
  height: 75px;
  width: 75px;
  top: 50%;
  left: 100%;
  font-size: 4rem;
  z-index: 1001;
`;

const ImageDiv = styled.div`
  position: absolute;
  z-index: 1002;
  border: 20px solid green;
  height: fit-content;
  width: fit-content;
`;

// const LeftArrow = styled.span`
//   height: 150px;
//   width: 50px;
// `;

const ExpandedView = (props) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageCursor, setImageCursor] = useState('zoom-in');
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const [top, setTop] = useState(null);
  const [bottom, setBottom] = useState(null);
  const [left, setLeft] = useState(null);
  const [right, setRight] = useState(null);
  const [element, setElement] = useState(null);
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);
  let { open, onClose, mainImage } = props;
  if (!open) {
    return null;
  }

  const toggleZoom = (e) => {
    if (!isZoomed) {
      e.target.style.transform = 'scale(2.50)';
      e.target.style.top = '110%';
      setIsZoomed(true);
      setImageCursor('zoom-out');
    } else {
      e.target.style.transform = 'scale(1.00)';
      e.target.style.top = '0';
      setIsZoomed(false);
      setImageCursor('zoom-in');
    }
  };

  const handleImgEnter = (e) => {
    console.log('onImageEnter ', e.clientX, e.clientY);
    let bodyRect = document.getElementById('getExpandedImageCoords').getBoundingClientRect();
    setWidth(bodyRect.width);
    setHeight(bodyRect.height);
    setTop(bodyRect.top);
    setBottom(bodyRect.bottom);
    setLeft(bodyRect.left);
    setRight(bodyRect.right);
    setElement(bodyRect);
  };

  const handleImgMove = (e) => {
    console.log('onImageMove ', e.nativeEvent.clientX, e.nativeEvent.clientY);
    if (e.nativeEvent.clientX > x) {
      // translate x
      document.getElementById('getExpandedImageCoords').style.transform = 'translate-x(10%)';
    } else if (e.nativeEvent.clientX < x) {
      // translate x
      document.getElementById('getExpandedImageCoords').style.transform = 'translate-x(-10%)';
    }
    if (e.nativeEvent.clientY > y) {
      // translate y
      document.getElementById('getExpandedImageCoords').style.transform = 'translate-y(10%)';
    } else if (e.nativeEvent.clientY < y) {
      // translate y
      document.getElementById('getExpandedImageCoords').style.transform = 'translate-y(-10%)';
    }
    setX(e.nativeEvent.clientX);
    setY(e.nativeEvent.clientY);
  };

  const handleImgLeave = (e) => {
    console.log('onImageLeave ', e.clientX, e.clientY);
  };

  // useEffect(() => {
  //   let bodyRect = document.getElementById('getExpandedImageCoords').getBoundingClientRect();
  //   setWidth(bodyRect.width);
  //   console.log('bodyReact width be like ', bodyRect.width)
  // }, [props]);

  return ReactDOM.createPortal(
    <>
      <Overlay>
      </Overlay>
      <ModalStyle>
        <Button onClick={() => {
          onClose();
        }}>
          X
        </Button>
        <ExpandedImage src={!mainImage ? 'url(https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg)' : mainImage}
          style={{cursor: imageCursor}}
          onClick={toggleZoom}
          onMouseMove={handleImgMove}
          onMouseEnter={handleImgEnter}
          onMouseLeave={handleImgLeave}
          id="getExpandedImageCoords" />
        {/* <LeftButton> ⬅️ </LeftButton> */}
      </ModalStyle>
    </>,
    document.getElementById('expanded_view_portal')
  );
};

export default ExpandedView;