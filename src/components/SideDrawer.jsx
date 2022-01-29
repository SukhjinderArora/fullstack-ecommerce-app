import { createPortal } from 'react-dom';
import styled from 'styled-components';

import Backdrop from './Backdrop';

const SideDrawer = ({
  children,
  direction,
  showSideDrawer,
  onSideDrawerClose,
}) => {
  return createPortal(
    <>
      <Backdrop
        showBackdrop={showSideDrawer}
        onBackdropClick={onSideDrawerClose}
      />
      <StyledSideDrawer direction={direction} showSideDrawer={showSideDrawer}>
        {children}
      </StyledSideDrawer>
    </>,
    document.getElementById('modal-root')
  );
};

const StyledSideDrawer = styled.div`
  max-width: 400px;
  width: 100%;
  height: 100vh;
  overflow: scroll;
  position: fixed;
  top: 0;
  right: ${(props) => (props.direction === 'right' ? 0 : '')};
  left: ${(props) => (props.direction === 'left' ? 0 : '')};
  z-index: 500;
  box-shadow: 0px 0 10px 3px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  transition: transform ease-in 0.3s;
  transform: translateX(
    ${(props) => {
      if (props.showSideDrawer) return '0';
      if (props.direction === 'right') return '100%';
      return '-100%';
    }}
  );
  @media (max-width: 499px) {
    max-width: 80%;
    width: 300px;
  }
`;

export default SideDrawer;
