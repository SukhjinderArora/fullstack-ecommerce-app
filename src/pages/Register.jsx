import styled from 'styled-components';
import { useReducer } from 'react';
import validator from 'validator';
import {
  User as UserIcon,
  Mail as EmailIcon,
  Lock as LockIcon,
} from 'react-feather';

import { ReactComponent as BackgroundSVG } from '../assets/images/svg/undraw_web_shopping_re_owap.svg';

const initialInputState = {
  firstName: {
    value: '',
    isFocused: false,
    hasError: false,
    error: '',
  },
  lastName: {
    value: '',
    isFocused: false,
    hasError: false,
    error: '',
  },
  email: { value: '', isFocused: false, hasError: false, error: '' },
  password: { value: '', isFocused: false, hasError: false, error: '' },
  confirmPassword: { value: '', isFocused: false, hasError: false, error: '' },
};

function inputReducer(state, action) {
  switch (action.type) {
    case 'focus':
      return {
        ...state,
        [action.input.name]: {
          ...state[action.input.name],
          isFocused: action.input.isFocused,
        },
      };
    case 'blur':
      return {
        ...state,
        [action.input.name]: {
          ...state[action.input.name],
          isFocused: action.input.isFocused,
          hasError: action.input.hasError,
          error: action.input.error,
        },
      };
    case 'change':
      return {
        ...state,
        [action.input.name]: {
          ...state[action.input.name],
          value: action.input.value,
        },
      };
    default:
      return state;
  }
}

const Register = () => {
  const [input, dispatch] = useReducer(inputReducer, initialInputState);
  const inputFocusHandler = (evt) => {
    dispatch({
      type: 'focus',
      input: {
        name: evt.target.name,
        isFocused: true,
      },
    });
  };
  const inputBlurHandler = (evt) => {
    const errorObj = {
      hasError: false,
      error: '',
    };
    if (validator.isEmpty(input[evt.target.name].value)) {
      errorObj.hasError = true;
      errorObj.error = `${evt.target.name} cannot be empty`;
    }
    dispatch({
      type: 'blur',
      input: {
        name: evt.target.name,
        isFocused: false,
        ...errorObj,
      },
    });
  };
  const inputChangeHandler = (evt) => {
    dispatch({
      type: 'change',
      input: {
        name: evt.target.name,
        value: evt.target.value,
        hasError: false,
        error: '',
      },
    });
  };
  return (
    <Container>
      <FormWrapper>
        <Form>
          <FormTitle>Create New Account</FormTitle>
          <FormGroup>
            {!input.firstName.isFocused && input.firstName.value.trim() === '' && (
              <Label>
                <InputIconContainer>
                  <UserIcon />
                </InputIconContainer>
                <span>First Name</span>
              </Label>
            )}
            <Input
              type="text"
              onFocus={inputFocusHandler}
              onBlur={inputBlurHandler}
              onChange={inputChangeHandler}
              name="firstName"
              value={input.firstName.value}
            />
          </FormGroup>
          <FormGroup>
            {!input.lastName.isFocused && input.lastName.value.trim() === '' && (
              <Label>
                <InputIconContainer>
                  <UserIcon />
                </InputIconContainer>
                Last Name
              </Label>
            )}
            <Input
              type="text"
              onFocus={inputFocusHandler}
              onBlur={inputBlurHandler}
              onChange={inputChangeHandler}
              name="lastName"
              value={input.lastName.value}
            />
          </FormGroup>
          <FormGroup>
            {!input.email.isFocused && input.email.value.trim() === '' && (
              <Label>
                <InputIconContainer>
                  <EmailIcon />
                </InputIconContainer>
                Email
              </Label>
            )}
            <Input
              type="email"
              onFocus={inputFocusHandler}
              onBlur={inputBlurHandler}
              onChange={inputChangeHandler}
              name="email"
              value={input.email.value}
            />
          </FormGroup>
          <FormGroup>
            {!input.password.isFocused && input.password.value.trim() === '' && (
              <Label>
                <InputIconContainer>
                  <LockIcon />
                </InputIconContainer>
                Password
              </Label>
            )}
            <Input
              type="password"
              onFocus={inputFocusHandler}
              onBlur={inputBlurHandler}
              onChange={inputChangeHandler}
              name="password"
              value={input.password.value}
            />
          </FormGroup>
          <FormGroup>
            {!input.confirmPassword.isFocused &&
              input.confirmPassword.value.trim() === '' && (
                <Label>
                  <InputIconContainer>
                    <LockIcon />
                  </InputIconContainer>
                  Confirm Password
                </Label>
              )}
            <Input
              type="password"
              onFocus={inputFocusHandler}
              onBlur={inputBlurHandler}
              onChange={inputChangeHandler}
              name="confirmPassword"
              value={input.confirmPassword.value}
            />
          </FormGroup>
          <FormGroup>
            <SubmitButton>Sign Up</SubmitButton>
          </FormGroup>
        </Form>
      </FormWrapper>
      <BackgroundImageContainer>
        <BackgroundImage />
      </BackgroundImageContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  background-color: rgb(0 128 128 / 30%);
  padding: 40px 20px;
`;

const FormWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  align-items: flex-start;
`;

const Form = styled.form`
  padding: 20px 30px;
  width: 500px;
  background: #fff;
  box-shadow: 2px 2px 7px 2px rgb(0 0 0 / 20%);
  margin-right: 10px;
`;

const FormTitle = styled.h1`
  color: teal;
  font-weight: 300;
  text-align: left;
  margin-bottom: 20px;
  font-size: 30px;
`;

const FormGroup = styled.div`
  position: relative;
  margin: 10px 0;
`;

const Label = styled.label`
  position: absolute;
  left: 12px;
  top: 11px;
  pointer-events: none;
  color: #94969f;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  font-size: 16px;
  padding: 11px 12px;
  width: 100%;
  outline: 1px solid #d4d5d9;
  border: none;
  &:focus {
    outline: 1px solid teal;
  }
`;

const InputIconContainer = styled.span`
  line-height: 0;
  margin-right: 10px;
  & svg {
    width: 16px;
    height: 16px;
  }
`;

const SubmitButton = styled.button`
  background: teal;
  color: white;
  border: 1px solid transparent;
  padding: 10px 20px;
  font-size: 14px;
  text-transform: uppercase;
  cursor: pointer;
`;

const BackgroundImageContainer = styled.div`
  flex: 1;
`;

const BackgroundImage = styled(BackgroundSVG)`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

export default Register;
