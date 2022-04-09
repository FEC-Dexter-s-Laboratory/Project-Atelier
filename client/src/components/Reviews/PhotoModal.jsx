import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const ModalPop = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f5f5f5;
  padding: 1em;
  height: 75%;
  width: auto;
  z-index: 999;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
  opacity: 0.75;
  z-index: 99;
`;

const Image = styled.img`
  height: 100%;
  width: auto;
  justify-self: center;
  object-fit: contain;
`;

const Close = styled.button`
  position: absolute;
  top: 30px;
  right: 30px;
  font-size: 30px;
  background: none;
  border: none;
  cursor: pointer;
  color: #f5f5f5;
  &:hover {
    color: teal;
  }
`;

const PhotoModal = function({ photo, visible, toggleModal }) {

  if (visible) {
    return ReactDOM.createPortal(
      <div className="review-photo-modal">
        <ModalOverlay />
        <ModalPop role="dialog" aria-modal="true">
          <Close onClick={() => toggleModal()}>&times;</Close>
          <Image src={photo}></Image>
        </ModalPop>
      </div>
      , document.body
    );
  } else {
    return null;
  }
};

export default PhotoModal;
