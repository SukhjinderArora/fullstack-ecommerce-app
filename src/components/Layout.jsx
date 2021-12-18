import { Outlet } from 'react-router-dom';

import styled from 'styled-components';

import Navbar from './Navbar';

const Container = styled.div`
  padding: 0 20px;
`;

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
};

export default Layout;
