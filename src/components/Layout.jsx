import { Outlet } from 'react-router-dom';

import styled from 'styled-components';
import Footer from './Footer';
import Navbar from './Navbar';

const Container = styled.main`
  margin-top: 70px;
  min-height: 100vh;
`;

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
};

export default Layout;
