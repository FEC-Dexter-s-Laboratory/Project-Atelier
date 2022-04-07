import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Comparison from './Comparison.jsx';

const ModalStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 50px;
  z-index: 1000;
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
  top: 0;
  right: 0;
  background-color: white;
  font-size: 20px;
`;

const Modal = (props) => {
  let {open, onClose} = props;
  if (!open) {
    return null;
  }
  return ReactDOM.createPortal(
    <Overlay>
      <ModalStyle>
        <Button onClick={onClose} >X</Button>
        <Comparison currentId={65632} comparedId={props.comparedId} />
      </ModalStyle>
    </Overlay>,
    document.getElementById('compare_portal')
  );
};

export default Modal;
