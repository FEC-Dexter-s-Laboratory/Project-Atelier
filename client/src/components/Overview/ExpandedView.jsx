import React, { useState, useEffect } from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import styled from 'styled-components';

const ModalStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #3d3c3c;
  padding: 50px;
  z-index: 1000;
  width: 90%;
  height: 80%;
  border-radius: 12px;
  border: 12px ridge white;
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
  background-color: rgba(128,128,128,0.7);
  z-index: 1000;
`;

const Button = styled.button`
  position: fixed;
  top: 2%;
  right: 2%;
  background-color: white;
  font-size: 20px;
  border: 2px ridge grey;
  border-radius: 12px;
  z-index: 14;
`;

const ExpandedImageDiv = styled.div`
  position: fixed;
  z-index: 1001;
  overflow-y: auto;
`;

const ExpandedImage = styled.img`
  position: absolute;
  z-index:14;
  transition: .2s;
  top: 0;
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
  const [left, setLeft] = useState(null);
  const [element, setElement] = useState(null);
  let { open, onClose, mainImage } = props;
  if (!open) {
    return null;
  }

  // useEffect(() => {
  //   setElement(findDOMNode(this));
  // });

  const enterButton = (e) => {
    e.target.style.transition = '.2s';
    e.target.style.transform = 'scale(1.25)';
    e.target.style.zIndex = '20';
  };

  const leaveButton = (e) => {
    e.target.style.transition = '.2s';
    e.target.style.transform = 'scale(1.00)';
  };

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
  };

  const handleImgMove = (e) => {
    console.log('onImageMove ', e.nativeEvent.clientX, e.nativeEvent.clientY);
  };

  const handleImgLeave = (e) => {
    console.log('onImageLeave ', e.clientX, e.clientY);
  };

  return ReactDOM.createPortal(
    <Overlay>
      <ModalStyle>
        <Button onClick={() => {
          props.onClose();
        }} onMouseEnter={enterButton} onMouseLeave={leaveButton}>
          X
        </Button>
        <ExpandedImage src={!mainImage ? 'url(https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg)' : mainImage}
          style={{cursor: imageCursor}}
          onClick={toggleZoom} />
        {/* <LeftButton> ⬅️ </LeftButton> */}
      </ModalStyle>
    </Overlay>,
    document.getElementById('expanded_view_portal')
  );
};

export default ExpandedView;