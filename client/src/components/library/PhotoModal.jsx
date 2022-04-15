import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const ModalPop = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #b0c4de;
  border-radius: 12px;
  padding: 50px;
  height: 75%;
  width: auto;
  min-width: 25%;
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
  border-radius: 12px;
  box-shadow: 10px 5px 5px black;
`;

const Close = styled.button`
  position: fixed;
  top: 40px;
  right: 40px;
  font-size: 20px;
  background-color: white;
  border: 2px ridge grey;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 10px 5px 5px black;
  transition: 0.2s;
  &:hover {
    transform: scale(1.25);
  }
`;

const PhotoModal = function({ photo, visible, toggleModal }) {

  if (visible) {
    return ReactDOM.createPortal(
      <div className="review-photo-modal">
        <ModalOverlay />
        <ModalPop role="dialog" aria-modal="true">
          <Close onClick={() => toggleModal()}>X</Close>
          <Image src={photo.url}></Image>
        </ModalPop>
      </div>
      , document.body
    );
  } else {
    return null;
  }
};

export default PhotoModal;
