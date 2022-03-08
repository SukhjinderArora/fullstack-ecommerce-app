import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Circle } from 'react-feather';

const CustomRadioButton = ({
  id,
  name,
  value,
  selected,
  radioBtnChangeHandler,
}) => {
  return (
    <div>
      <RadioButton
        id={id}
        name={name}
        checked={selected}
        onChange={(e) => radioBtnChangeHandler(id, name, value, e)}
      />
      <Label htmlFor={id}>
        <RadioButtonIcon />
      </Label>
    </div>
  );
};

const Label = styled.label`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #424553;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    font-weight: 500;
    color: teal;
  }
`;

const RadioButtonIcon = styled(Circle)`
  width: 12px;
  height: 12px;
  fill: white;
  stroke: none;
`;

const RadioButton = styled.input.attrs(() => ({
  type: 'radio',
}))`
  display: none;
  &:checked + label {
    border: 2px solid teal;
  }
  &:checked + label ${RadioButtonIcon} {
    fill: teal;
  }
`;

CustomRadioButton.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  radioBtnChangeHandler: PropTypes.func,
};

CustomRadioButton.defaultProps = {
  selected: false,
  radioBtnChangeHandler: () => {},
};

export default CustomRadioButton;
