import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import CartItems from './CartItems.jsx';

const ModalStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 50px;
  zIndex: 1000;
  overflow-y: auto;
  width: 18%;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(128,128,128,0.7);
  zIndex: 1000;
`;

const Button = styled.button`
  position: fixed;
  top: 0;
  right: 0;
  background-color: white;
  font-size: 20px;
`;

const CartModal = (props) => {
  let {open, onClose} = props;
  if (!open) {
    return null;
  }
  return ReactDOM.createPortal(
    <Overlay>
      <ModalStyle>
        <Button onClick={onClose} >X</Button>
        <CartItems productId={props.productId} />
      </ModalStyle>
    </Overlay>,
    document.getElementById('compare_portal')
  );
};

export default CartModal;