import styled from 'styled-components';

const CustomRadioButton = ({
  id,
  name,
  value,
  checked,
  radioBtnChangeHandler,
}) => {
  return (
    <div>
      <RadioButton
        id={id}
        name={name}
        checked={checked}
        onChange={(e) => radioBtnChangeHandler(id, name, value, e)}
      />
      <Label htmlFor={id}>{value}</Label>
    </div>
  );
};

const Label = styled.label`
  cursor: pointer;
  &:hover {
    font-weight: 500;
    color: teal;
  }
`;

const RadioButton = styled.input.attrs(() => ({
  type: 'radio',
}))`
  display: none;
  &:checked + label {
    font-weight: 500;
    color: teal;
  }
`;

export default CustomRadioButton;
