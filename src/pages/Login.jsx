import styled from 'styled-components';

import useForm from '../hooks/useForm';
import usePageTitle from '../hooks/usePageTitle';
import BackgroundSVG from '../assets/images/svg/undraw_online_shopping_re_k1sv.svg';

const validate = (values) => {
  const errors = {};
  if (!values.email.trim()) {
    errors.email = 'Please enter your email address';
  }
  if (!values.password.trim()) {
    errors.password = 'Please enter a password';
  }
  return errors;
};

const Login = () => {
  usePageTitle('Login | Fashionista');
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      console.log('Form Submitted');
    },
  });
  return (
    <Container>
      <FormWrapper>
        <Form onSubmit={form.handleSubmit}>
          <FormTitle>Sign In</FormTitle>
          <FormGroup>
            <Label
              htmlFor="email"
              isFocused={form.focused.email}
              isInputFilled={form.values.email}
            >
              Email
            </Label>
            <Input
              type="text"
              name="email"
              id="email"
              onFocus={form.handleFocus}
              onBlur={form.handleBlur}
              onChange={form.handleChange}
              value={form.values.email}
              aria-label="Email"
            />
            <ValidationError>
              {form.touched.email && form.errors.email}
            </ValidationError>
          </FormGroup>
          <FormGroup>
            <Label
              htmlFor="password"
              isFocused={form.focused.password}
              isInputFilled={form.values.password}
            >
              Password
            </Label>
            <Input
              type="password"
              name="password"
              id="password"
              onFocus={form.handleFocus}
              onBlur={form.handleBlur}
              onChange={form.handleChange}
              value={form.values.password}
              aria-label="Password"
            />
            <ValidationError>
              {form.touched.password && form.errors.password}
            </ValidationError>
          </FormGroup>
          <FormGroup>
            <SubmitButton>Sign In</SubmitButton>
          </FormGroup>
        </Form>
      </FormWrapper>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background: url(${BackgroundSVG});
  background-repeat: no-repeat;
  background-position: left top;
  background-size: 50%;
  background-origin: content-box;
  background-color: rgb(0 128 128 / 10%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
`;

const FormWrapper = styled.div``;

const Form = styled.form`
  background-color: #fff;
  box-shadow: 2px 2px 7px 2px rgb(0 0 0 / 20%);
  width: 500px;
  padding: 20px 30px;
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

const Input = styled.input`
  padding: 18px 18px 2px 18px;
  font-size: 16px;
  width: 100%;
  outline: 1px solid #d4d5d9;
  border: navajowhite;
  color: #282c3f;
  caret-color: teal;
  font-weight: 500;
  &:focus {
    outline: 1px solid teal;
  }
`;

const Label = styled.label`
  position: absolute;
  font-size: 16px;
  color: ${(props) =>
    props.isFocused || props.isInputFilled ? 'teal' : '#94969f'};
  left: 18px;
  transform: ${(props) =>
    props.isFocused || props.isInputFilled
      ? 'scale(0.75, 0.75) translate(0, 2px)'
      : 'translate(0, 18px)'};
  pointer-events: none;
  transition: transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  transform-origin: left;
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

export default Login;
