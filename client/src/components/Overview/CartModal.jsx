import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import CartItems from './CartItems.jsx';

const ModalStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #9f9f9f;
  padding: 50px;
  z-index: 1000;
  opacity: 1;
  width: 35%;
  height: 80%;
  border-radius: 12px;
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

const CartModal = (props) => {
  let { open, onClose } = props;
  if (!open) {
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
        props.onClose();
      }}>
      </Overlay>
      <ModalStyle>
        <Button onClick={() => {
          props.onClose();
        }} onMouseEnter={enterButton} onMouseLeave={leaveButton}>X</Button>
        <CartItems productId={props.productId} />
      </ModalStyle>
    </>,
    document.getElementById('blue_steel_portal')
  );
};

export default CartModal;