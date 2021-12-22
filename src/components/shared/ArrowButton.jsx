import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight } from 'react-feather';

const Button = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: ${(props) => props.$position === 'left' && 0};
  right: ${(props) => props.$position === 'right' && 0};
  cursor: pointer;
  background-color: white;
  border: none;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0 4px 6px -3px #9a9a9a;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const ArrowButton = ({ position, clickHandler }) => {
  return (
    <Button onClick={clickHandler} $position={position}>
      {position === 'right' ? (
        <ChevronRight stroke="#2c4152" />
      ) : (
        <ChevronLeft stroke="#2c4152" />
      )}
    </Button>
  );
};

ArrowButton.propTypes = {
  position: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default ArrowButton;
