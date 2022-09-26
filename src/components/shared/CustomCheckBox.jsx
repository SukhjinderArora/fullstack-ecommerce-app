import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Check } from 'react-feather';

const CustomCheckBox = ({
  id,
  name,
  value,
  selected,
  checkBoxChangeHandler,
}) => {
  return (
    <Label>
      <Input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={selected}
        onChange={(e) => checkBoxChangeHandler(id, value, e)}
      />
      <CheckBox />
      <CheckBoxIcon />
      <LabelText>{value}</LabelText>
    </Label>
  );
};

const Label = styled.label`
  display: block;
  position: relative;
  cursor: pointer;
`;

const Input = styled.input`
  display: none;
`;

const LabelText = styled.span`
  margin-left: 18px;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.75);
  ${Label}:hover & {
    font-weight: 500;
  }
`;

const CheckBox = styled.span`
  position: absolute;
  top: 50%;
  left: 0;
  width: 12px;
  height: 12px;
  border: 1px solid #a9abb2;
  background-color: transparent;
  transform: translateY(-50%);
  display: inline-block;
  transition: border 0.3s;
  ${Input}:checked ~ & {
    border-color: transparent;
  }
`;

const CheckBoxIcon = styled(Check)`
  fill: teal;
  background: teal;
  stroke: white;
  width: 12px;
  height: 12px;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%) scale(0);
  transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  ${Input}:checked ~ & {
    transform: translateY(-50%) scale(1);
  }
`;

CustomCheckBox.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  checkBoxChangeHandler: PropTypes.func.isRequired,
};

export default CustomCheckBox;
