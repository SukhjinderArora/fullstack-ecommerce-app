import styled from 'styled-components';
import { Link } from 'react-router-dom';
import validator from 'validator';
import {
  User as UserIcon,
  Mail as EmailIcon,
  Lock as LockIcon,
} from 'react-feather';

import usePageTitle from '../hooks/usePageTitle';
import useForm from '../hooks/useForm';

import { ReactComponent as BackgroundSVG } from '../assets/images/svg/undraw_web_shopping_re_owap.svg';

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  } else if (values.firstName.length < 2) {
    errors.firstName = 'First Name cannot be less than 2 characters';
  } else if (values.firstName.length > 15) {
    errors.firstName = 'First Name cannot be more than 15 characters';
  }

  if (!values.lastName) {
    errors.lastName = 'Required';
  } else if (values.lastName.length < 2) {
    errors.lastName = 'Last Name cannot be less than 2 characters';
  } else if (values.lastName.length > 15) {
    errors.lastName = 'Last Name cannot be more than 15 characters';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!validator.isEmail(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 8) {
    errors.password = 'Password cannot be less than 8 characters';
  } else if (values.password.length > 16) {
    errors.password = 'Password cannot be more than 16 characters';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Confirm Password does not match the passoword';
  }

  return errors;
};

const Register = () => {
  usePageTitle('Sign Up | Fashionista');
  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      resetForm();
    },
  });
  return (
    <Container>
      <FormWrapper>
        <Form onSubmit={form.handleSubmit}>
          <FormTitle>Create New Account</FormTitle>
          <FormGroup>
            {!form.focused.firstName && form.values.firstName.trim() === '' && (
              <Label htmlFor="firstName">
                <InputIconContainer>
                  <UserIcon />
                </InputIconContainer>
                <span>First Name</span>
              </Label>
            )}
            <Input
              type="text"
              onFocus={form.handleFocus}
              onBlur={form.handleBlur}
              onChange={form.handleChange}
              name="firstName"
              id="firstName"
              value={form.values.firstName}
            />
            <ValidationError>
              <span>{form.touched.firstName && form.errors.firstName}</span>
            </ValidationError>
          </FormGroup>
          <FormGroup>
            {!form.focused.lastName && form.values.lastName.trim() === '' && (
              <Label htmlFor="lastName">
                <InputIconContainer>
                  <UserIcon />
                </InputIconContainer>
                Last Name
              </Label>
            )}
            <Input
              type="text"
              onFocus={form.handleFocus}
              onBlur={form.handleBlur}
              onChange={form.handleChange}
              name="lastName"
              id="lastName"
              value={form.values.lastName}
            />
            <ValidationError>
              <span>{form.touched.lastName && form.errors.lastName}</span>
            </ValidationError>
          </FormGroup>
          <FormGroup>
            {!form.focused.email && form.values.email.trim() === '' && (
              <Label htmlFor="email">
                <InputIconContainer>
                  <EmailIcon />
                </InputIconContainer>
                Email
              </Label>
            )}
            <Input
              type="email"
              onFocus={form.handleFocus}
              onBlur={form.handleBlur}
              onChange={form.handleChange}
              name="email"
              id="email"
              value={form.values.email}
            />
            <ValidationError>
              <span>{form.touched.email && form.errors.email}</span>
            </ValidationError>
          </FormGroup>
          <FormGroup>
            {!form.focused.password && form.values.password.trim() === '' && (
              <Label htmlFor="password">
                <InputIconContainer>
                  <LockIcon />
                </InputIconContainer>
                Password
              </Label>
            )}
            <Input
              type="password"
              onFocus={form.handleFocus}
              onBlur={form.handleBlur}
              onChange={form.handleChange}
              name="password"
              id="password"
              value={form.values.password}
            />
            <ValidationError>
              <span>{form.touched.password && form.errors.password}</span>
            </ValidationError>
          </FormGroup>
          <FormGroup>
            {!form.focused.confirmPassword &&
              form.values.confirmPassword.trim() === '' && (
                <Label htmlFor="confirmPassword">
                  <InputIconContainer>
                    <LockIcon />
                  </InputIconContainer>
                  Confirm Password
                </Label>
              )}
            <Input
              type="password"
              onFocus={form.handleFocus}
              onBlur={form.handleBlur}
              onChange={form.handleChange}
              name="confirmPassword"
              id="confirmPassword"
              value={form.values.confirmPassword}
            />
            <ValidationError>
              <span>
                {form.touched.confirmPassword && form.errors.confirmPassword}
              </span>
            </ValidationError>
          </FormGroup>
          <FormGroup>
            <SubmitButton type="submit">Sign Up</SubmitButton>
          </FormGroup>
          <Text>
            Already Have an Account?
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
