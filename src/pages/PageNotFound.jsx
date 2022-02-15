import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PageNotFound = () => {
  return (
    <Container>
      <Text>Page not found</Text>
      <Description>
        Uh-oh! Looks like the page you are trying to access doesn&apos;t exist.
        Please start afresh.
      </Description>
      <Button to="/">Go Home</Button>
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.h1`
  font-size: 34px;
  color: #282c3f;
`;

const Description = styled.h2`
  font-size: 18px;
  font-weight: 400;
  margin: 1rem 0;
  color: #93959f;
`;

const Button = styled(Link)`
  display: inline-block;
  text-decoration: none;
  background-color: teal;
  color: #fff;
  font-family: inherit;
  font-size: 16px;
  font-weight: 700;
  padding: 10px 20px;
  border: 1px solid rgba(0, 0, 0, 0);
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0);
    color: teal;
    border: 1px solid teal;
  }
`;

export default PageNotFound;
