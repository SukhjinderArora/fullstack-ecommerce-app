import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { X } from 'react-feather';

import Backdrop from './Backdrop';

const Modal = ({ showModal, onModalClose, children }) => {
  return createPortal(
    <div>
      <Backdrop showBackdrop={showModal} onBackdropClick={onModalClose} />
      <ModalContainer showModal={showModal}>
        <StyledModal>{children}</StyledModal>
        <ModalCloseButton onClick={onModalClose}>
          <X />
        </ModalCloseButton>
      </ModalContainer>
    </div>,
    document.body
  );
};

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 400;
  display: ${(props) => !props.showModal && 'none'};
`;

const StyledModal = styled.div``;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 0;
  left: 101%;
  background-color: transparent;
  border: none;
  cursor: pointer;
  & svg {
    stroke: #fff;
    width: 32px;
    height: 32px;
  }
`;

export default Modal;
