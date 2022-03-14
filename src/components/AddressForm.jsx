import styled from 'styled-components';

import useForm from '../hooks/useForm';

const validate = (values) => {
  const errors = {};
  return errors;
};

const AddressForm = () => {
  const { setFieldError, setMultipleFieldsError, ...form } = useForm({
    initialValues: {
      name: '',
      phoneNumber: '',
      pincode: '',
      address: '',
      locality: '',
      city: '',
      state: '',
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      console.log('form submitted');
    },
  });
  return (
    <Container>
      <Form onSubmit={form.handleSubmit}>
        <FormTitle>ADD NEW ADDRESS</FormTitle>
        <InputsContainer>
          <FormHeader>CONTACT DETAILS</FormHeader>
          <ContactContainer>
            <FormGroup>
              <Label
                htmlFor="name"
                isFocused={form.focused.name}
                isInputFilled={form.values.name}
              >
                Name*
              </Label>
              <Input
                type="text"
                name="name"
                id="name"
                onFocus={form.handleFocus}
                onBlur={form.handleBlur}
                onChange={form.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label
                htmlFor="phoneNumber"
                isFocused={form.focused.phoneNumber}
                isInputFilled={form.values.phoneNumber}
              >
                Mobile No.*
              </Label>
              <Input
                type="tel"
                maxLength="10"
                name="phoneNumber"
                id="phoneNumber"
                onFocus={form.handleFocus}
                onBlur={form.handleBlur}
                onChange={form.handleChange}
              />
            </FormGroup>
          </ContactContainer>
          <FormHeader>ADDRESS</FormHeader>
          <AddressContainer>
            <FormGroup>
              <Label
                htmlFor="pincode"
                isFocused={form.focused.pincode}
                isInputFilled={form.values.pincode}
              >
                Pin Code*
              </Label>
              <Input
                type="tel"
                maxLength="6"
                name="pincode"
                id="pincode"
                onFocus={form.handleFocus}
                onBlur={form.handleBlur}
                onChange={form.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label
                htmlFor="address"
                isFocused={form.focused.address}
                isInputFilled={form.values.address}
              >
                Address (House No, Building, Street, Area)*
              </Label>
              <Input
                type="text"
                name="address"
                id="address"
                onFocus={form.handleFocus}
                onBlur={form.handleBlur}
                onChange={form.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label
                htmlFor="locality"
                isFocused={form.focused.locality}
                isInputFilled={form.values.locality}
              >
                Locality / Town*
              </Label>
              <Input
                type="text"
                name="locality"
                id="locality"
                onFocus={form.handleFocus}
                onBlur={form.handleBlur}
                onChange={form.handleChange}
              />
            </FormGroup>
            <FlexContainer>
              <FormGroup>
                <Label
                  htmlFor="city"
                  isFocused={form.focused.city}
                  isInputFilled={form.values.city}
                >
                  City / District*
                </Label>
                <Input
                  type="text"
                  name="city"
                  id="city"
                  onFocus={form.handleFocus}
                  onBlur={form.handleBlur}
                  onChange={form.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label
                  htmlFor="state"
                  isFocused={form.focused.state}
                  isInputFilled={form.values.state}
                >
                  State*
                </Label>
                <Input
                  type="text"
                  name="state"
                  id="state"
                  onFocus={form.handleFocus}
                  onBlur={form.handleBlur}
                  onChange={form.handleChange}
                />
              </FormGroup>
            </FlexContainer>
          </AddressContainer>
        </InputsContainer>
        <SaveButtonContainer>
          <SaveButton type="submit">ADD ADDRESS</SaveButton>
        </SaveButtonContainer>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  background-color: #fff;
  height: 65vh;
  width: 440px;
`;

const Form = styled.form`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const FormTitle = styled.h1`
  font-size: 14px;
  font-weight: 700;
  border-bottom: 1px solid #d5d6d9;
  padding: 16px;
`;

const InputsContainer = styled.div`
  overflow-y: scroll;
`;

const FormHeader = styled.h2`
  font-size: 14px;
  font-weight: 700;
  padding: 16px 16px 0 16px;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
  position: relative;
`;

const Label = styled.label`
  position: absolute;
  font-size: 14px;
  top: ${(props) => (props.isFocused || props.isInputFilled ? '-8px' : '11px')};
  left: ${(props) => (props.isFocused || props.isInputFilled ? '9px' : '13px')};
  color: ${(props) =>
    props.isFocused || props.isInputFilled ? '#282c3f' : '#94969f'};
  background: ${(props) =>
    props.isFocused || props.isInputFilled ? '#fff' : 'transparent'};
  padding: ${(props) =>
    props.isFocused || props.isInputFilled ? '0 4px' : '0'};
  transition-property: top;
  transition-duration: 0.1s;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid #d4d5d9;
  font-size: 14px;
  padding: 12px;
  background-color: transparent;
  line-height: 14px;
  border-radius: 4px;
  color: #282c3f;
  outline: none;
  &:focus {
    border-color: #282c3f;
  }

  &:focus ~ label {
    color: #282c3f;
  }
`;

const ContactContainer = styled.div`
  padding: 16px 16px 0 16px;
`;

const AddressContainer = styled.div`
  padding: 16px 16px 0 16px;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SaveButtonContainer = styled.div`
  box-shadow: 0 -1px 4px 0 #0000004d;
  padding: 8px;
`;

const SaveButton = styled.button`
  background: teal;
  color: #fff;
  border: none;
  display: block;
  width: 100%;
  padding: 14px;
  font-size: 14px;
  font-weight: 700;
  border-radius: 5px;
  cursor: pointer;
`;

export default AddressForm;
