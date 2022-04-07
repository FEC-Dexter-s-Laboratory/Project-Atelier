import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import CartItems from './CartItems.jsx';

const ModalStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #3d3c3c;
  padding: 50px;
  z-index: 1000;
  overflow-y: auto;
  width: 35%;
  border-radius: 12px;
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
`;

const CartModal = (props) => {
  let {open, onClose} = props;
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
    <Overlay>
      <ModalStyle>
        <Button onClick={() => {
          props.onClose();
        }} onMouseEnter={enterButton} onMouseLeave={leaveButton}>X</Button>
        <CartItems productId={props.productId} />
      </ModalStyle>
    </Overlay>,
    document.getElementById('compare_portal')
  );
};

export default CartModal;