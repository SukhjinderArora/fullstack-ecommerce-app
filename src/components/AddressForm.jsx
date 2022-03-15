import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import validator from 'validator';
import PropTypes from 'prop-types';

import toast from 'react-hot-toast';

import useForm from '../hooks/useForm';

import { addNewAddress } from '../store/addressSlice';

const validate = (values) => {
  const errors = {};
  if (!values.name.trim()) {
    errors.name = 'This is a mandatory field';
  } else if (values.name.length < 2) {
    errors.name = 'Minimum length is 2';
  } else if (values.name.length > 40) {
    errors.name = 'Maximum length is 40';
  }
  if (!values.phoneNumber.trim()) {
    errors.phoneNumber = 'This is a mandatory field';
  } else if (!validator.isMobilePhone(values.phoneNumber, 'en-IN')) {
    errors.phoneNumber = 'Invalid phone number';
  }
  if (!values.pincode.trim()) {
    errors.pincode = 'This is a mandatory field';
  } else if (!values.pincode.match(/^[1-9][0-9]{5}$/)) {
    errors.pincode = 'Invalid pincode';
  }
  if (!values.address.trim()) {
    errors.address = 'This is a mandatory field';
  }
  if (!values.locality.trim()) {
    errors.locality = 'This is a mandatory field';
  }
  if (!values.city.trim()) {
    errors.city = 'This is a mandatory field';
  }
  if (!values.state.trim()) {
    errors.state = 'This is a mandatory field';
  }
  return errors;
};

const AddressForm = ({ afterSubmitHandler }) => {
  const { error } = useSelector((state) => state.address);
  const dispatch = useDispatch();
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
      dispatch(
        addNewAddress({
          ...values,
        })
      )
        .unwrap()
        .then(() => {
          afterSubmitHandler();
        })
        .catch(() => {
          toast.error('Something went wrong!');
        });
    },
  });

  useEffect(() => {
    if (error) {
      if (Array.isArray(error)) {
        const errors = error.reduce((acc, cur) => {
          acc[cur.param] = cur.msg;
          return acc;
        }, {});
        setMultipleFieldsError(errors);
      }
    }
  }, [error, setMultipleFieldsError]);
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
              <ValidationError>
                {form.touched.name && form.errors.name}
              </ValidationError>
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
              <ValidationError>
                {form.touched.phoneNumber && form.errors.phoneNumber}
              </ValidationError>
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
              <ValidationError>
                {form.touched.pincode && form.errors.pincode}
              </ValidationError>
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
              <ValidationError>
                {form.touched.address && form.errors.address}
              </ValidationError>
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
              <ValidationError>
                {form.touched.locality && form.errors.locality}
              </ValidationError>
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
                <ValidationError>
                  {form.touched.city && form.errors.city}
                </ValidationError>
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
                <ValidationError>
                  {form.touched.state && form.errors.state}
                </ValidationError>
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
  height: 70vh;
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
  padding: 20px 16px;
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
`;

const ValidationError = styled.p`
  color: #ff5722;
  padding-left: 12px;
  font-size: 12px;
  padding-top: 4px;
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

AddressForm.propTypes = {
  afterSubmitHandler: PropTypes.func,
};

AddressForm.defaultProps = {
  afterSubmitHandler: () => {},
};

export default AddressForm;
