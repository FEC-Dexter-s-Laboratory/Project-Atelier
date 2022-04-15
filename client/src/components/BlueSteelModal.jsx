import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const ModalStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #b0c4de;
  padding: 50px;
  z-index: 1000;
  opacity: 1;
  width: 35%;
  height: 80%;
  border-radius: 12px;
  display: flex;
  justify-content: center;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  /* background-color: rgba(128,128,128,0.7); */
  background-color: #000;
  opacity: 0.75;
  z-index: 800;
`;

const Button = styled.button`
  position: fixed;
  top: 5%;
  right: 5%;
  background-color: white;
  font-size: 20px;
  border: 2px ridge grey;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 10px 5px 5px black;
`;

const BlueSteel = styled.img`
  height: 90%;
  width: 80%;
  grid-row: 2;
  margin-left: 10%;
  box-shadow: 10px 5px 5px black;
  border: 1px solid black;
  border-radius: 12px;
`;

const Title = styled.h1`
  font-family: 'Lobster-Two', cursive;
  color: #3d3c3c;
  text-align: center;
  grid-row: 1;
`;

const ModalDiv = styled.div`
  display: grid;
  background-color: white;
  border-radius: 12px;
  box-shadow: 10px 5px 5px black;
`;

const BlueSteelModal = (props) => {
  let { modal, onClose, modalImage } = props;
  if (!modal) {
    return null;
  }
  // Mouseover animation functions
  const enterButton = (e) => {
    e.target.style.transition = '.2s';
    e.target.style.transform = 'scale(1.25)';
    e.target.style.zIndex = '20';
  };

  const leaveButton = (e) => {
    e.target.style.transition = '.2s';
    e.target.style.transform = 'scale(1.00)';
  };

  return ReactDOM.createPortal(
    <>
      <Overlay onClick={() => {
        onClose();
      }}>
      </Overlay>
      <ModalStyle>
        <Button onClick={() => {
          onClose();
        }} onMouseEnter={enterButton} onMouseLeave={leaveButton}>X</Button>
        <ModalDiv>
          <Title>Welcome to Blue Steel Brand</Title>
          <BlueSteel src={modalImage} />
        </ModalDiv>
      </ModalStyle>
    </>,
    document.getElementById('blue_steel_portal')
  );
};

export default BlueSteelModal;