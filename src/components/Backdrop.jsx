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
  transition: all cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.3s;
  opacity: ${(props) => (props.showBackdrop ? 0.6 : 0)};
  visibility: ${(props) => (props.showBackdrop ? 'visible' : 'hidden')};
`;

Backdrop.propTypes = {
  showBackdrop: PropTypes.bool.isRequired,
  onBackdropClick: PropTypes.func.isRequired,
};

export default Backdrop;
