import styled from 'styled-components';
import { useReducer } from 'react';
import { Link } from 'react-router-dom';
import validator from 'validator';
import {
  User as UserIcon,
  Mail as EmailIcon,
  Lock as LockIcon,
} from 'react-feather';

import { ReactComponent as BackgroundSVG } from '../assets/images/svg/undraw_web_shopping_re_owap.svg';
import usePageTitle from '../hooks/usePageTitle';

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
  usePageTitle('Sign Up | Fashionista');
  const [input, dispatch] = useReducer(inputReducer, initialInputState);
  const validate = (fieldName) => {
    const error = {
      hasError: false,
      error: '',
    };
    const inputValue = input[fieldName].value.trim();
    if (inputValue === '') {
      error.hasError = true;
      error.error = 'Required';
      return error;
    }
    if (fieldName === 'firstName' || fieldName === 'lastName') {
      if (
        !validator.isLength(inputValue, {
          min: 2,
          max: 15,
        })
      ) {
        error.hasError = true;
        error.error = 'Must be between 2 and 15 characters';
        return error;
      }
      if (!validator.isAlpha(inputValue)) {
        error.hasError = true;
        error.error = 'Should only contains letters';
        return error;
      }
    }
    if (fieldName === 'email') {
      if (!validator.isEmail(inputValue)) {
        error.hasError = true;
        error.error = 'Invalid email';
      }
    }
    if (fieldName === 'password') {
      if (
        !validator.isLength(inputValue, {
          min: 8,
          max: 16,
        })
      ) {
        error.hasError = true;
        error.error = 'Password should be between 8 and 16 characters length';
      }
      if (!validator.isStrongPassword(inputValue)) {
        error.hasError = true;
        error.error = 'Weak password';
      }
    }
    if (fieldName === 'confirmPassword') {
      if (inputValue !== input.password.value) {
        error.hasError = true;
        error.error = 'Confirm password does not match the password';
      }
    }
    return error;
  };
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
    const error = validate(evt.target.name);
    dispatch({
      type: 'blur',
      input: {
        name: evt.target.name,
        isFocused: false,
        ...error,
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
  const formSubmissionHandler = (evt) => {
    evt.preventDefault();
  };
  return (
    <Container>
      <FormWrapper>
        <Form onSubmit={formSubmissionHandler}>
          <FormTitle>Create New Account</FormTitle>
          <FormGroup>
            {!input.firstName.isFocused && input.firstName.value.trim() === '' && (
              <Label htmlFor="firstName">
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
              id="firstName"
              value={input.firstName.value}
            />
            <ValidationError>
              <span>{input.firstName.hasError && input.firstName.error}</span>
            </ValidationError>
          </FormGroup>
          <FormGroup>
            {!input.lastName.isFocused && input.lastName.value.trim() === '' && (
              <Label htmlFor="lastName">
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
              id="lastName"
              value={input.lastName.value}
            />
            <ValidationError>
              <span>{input.lastName.hasError && input.lastName.error}</span>
            </ValidationError>
          </FormGroup>
          <FormGroup>
            {!input.email.isFocused && input.email.value.trim() === '' && (
              <Label htmlFor="email">
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
              id="email"
              value={input.email.value}
            />
            <ValidationError>
              <span>{input.email.hasError && input.email.error}</span>
            </ValidationError>
          </FormGroup>
          <FormGroup>
            {!input.password.isFocused && input.password.value.trim() === '' && (
              <Label htmlFor="password">
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
              id="password"
              value={input.password.value}
            />
            <ValidationError>
              <span>{input.password.hasError && input.password.error}</span>
            </ValidationError>
          </FormGroup>
          <FormGroup>
            {!input.confirmPassword.isFocused &&
              input.confirmPassword.value.trim() === '' && (
                <Label htmlFor="confirmPassword">
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
              id="confirmPassword"
              value={input.confirmPassword.value}
            />
            <ValidationError>
              <span>
                {input.confirmPassword.hasError && input.confirmPassword.error}
              </span>
            </ValidationError>
          </FormGroup>
          <FormGroup>
            <SubmitButton type="submit">Sign Up</SubmitButton>
          </FormGroup>
          <Text>
            Already Have an Account?{' '}
            <StyledLink to="/login">Login Here</StyledLink>
          </Text>
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
  background-color: rgb(0 128 128 / 10%);
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
  color: #282c3f;
  font-weight: 500;
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

const ValidationError = styled.p`
  color: red;
  height: 20px;
`;

const BackgroundImageContainer = styled.div`
  flex: 1;
`;

const BackgroundImage = styled(BackgroundSVG)`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const Text = styled.p`
  color: #1b2839;
  font-weight: 500;
`;

const StyledLink = styled(Link)`
  color: teal;
`;

export default Register;
