import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Comparison from './Comparison.jsx';
import {ModalStyle, Overlay, ModalButton} from './Related&OutfitStyles.js';


const Modal = (props) => {
  let {open, onClose} = props;
  if (!open) {
    return null;
  }
  return ReactDOM.createPortal(
    <Overlay>
      <ModalStyle>
        <ModalButton onClick={onClose} >X</ModalButton>
        <Comparison mainId={props.mainId} comparedId={props.comparedId} />
      </ModalStyle>
    </Overlay>,
    document.getElementById('compare_portal')
  );
};

export default Modal;
