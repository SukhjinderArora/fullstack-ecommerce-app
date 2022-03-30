import styled from 'styled-components';
import PropTypes from 'prop-types';

const Dropdown = ({ showDropdown, children }) => {
  return <Container showDropdown={showDropdown}>{children}</Container>;
};

const Container = styled.div`
  width: 100%;
  position: absolute;
  top: ${(props) => (props.showDropdown ? '60px' : '-500px')};
  left: 0;
  background-color: #fff;
  transition: all 0.3s ease-in-out;
  z-index: -200;
`;

Dropdown.propTypes = {
  showDropdown: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

export default Dropdown;
