import styled from 'styled-components';
import PropTypes from 'prop-types';

const Backdrop = ({ showBackdrop, onBackdropClick }) => {
  return (
    <StyledBackdrop showBackdrop={showBackdrop} onClick={onBackdropClick} />
  );
};

const StyledBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 300;
  background-color: rgb(0, 0, 0);
  transition: opacity ease-in 0.3s, visibility ease-in 0.3s;
  opacity: ${(props) => (props.showBackdrop ? 0.3 : 0)};
  visibility: ${(props) => (props.showBackdrop ? 'visible' : 'hidden')};
`;

Backdrop.propTypes = {
  showBackdrop: PropTypes.bool.isRequired,
  onBackdropClick: PropTypes.func.isRequired,
};

export default Backdrop;
