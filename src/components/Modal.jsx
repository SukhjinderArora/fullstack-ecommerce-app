import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { X } from 'react-feather';

import Backdrop from './Backdrop';

const Modal = ({ showModal, onModalClose, children }) => {
  return createPortal(
    <div>
      <Backdrop showBackdrop={showModal} onBackdropClick={onModalClose} />
      <ModalContainer>
        <StyledModal>{children}</StyledModal>
        <ModalCloseButton>
          <X />
        </ModalCloseButton>
      </ModalContainer>
    </div>,
    document.body
  );
};

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 400;
`;

const StyledModal = styled.div``;

const ModalCloseButton = styled.button``;

export default Modal;
