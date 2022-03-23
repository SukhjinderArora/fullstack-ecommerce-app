import styled from 'styled-components';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

import { logout } from '../store/authSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Container>
      <SideBar>
        <Navigation>
          <NavigationList>
            <NavigationSegment>
              <NavigationItem>
                <NavigationLink to="dashboard">Overview</NavigationLink>
              </NavigationItem>
            </NavigationSegment>
            <NavigationSegment>
              <SegmentHeading>ORDERS</SegmentHeading>
              <NavigationItem>
                <NavigationLink to="orders">Orders</NavigationLink>
              </NavigationItem>
            </NavigationSegment>
            <NavigationSegment>
              <SegmentHeading>ACCOUNT</SegmentHeading>
              <NavigationItem>
                <NavigationLink to="profile">Profile</NavigationLink>
              </NavigationItem>
              <NavigationItem>
                <NavigationLink to="address">Addresses</NavigationLink>
              </NavigationItem>
              <NavigationItem>
                <NavigationLink
                  as="button"
                  onClick={async () => {
                    try {
                      await dispatch(logout()).unwrap();
                      navigate('/login');
                    } catch (error) {
                      toast.error('Something went wrong');
                    }
                  }}
                >
                  Log out
                </NavigationLink>
              </NavigationItem>
            </NavigationSegment>
            <NavigationSegment>
              <SegmentHeading>LEGAL</SegmentHeading>
              <NavigationItem>
                <NavigationLink to="/">Terms of use</NavigationLink>
              </NavigationItem>
              <NavigationItem>
                <NavigationLink to="/">Privacy Policy</NavigationLink>
              </NavigationItem>
            </NavigationSegment>
          </NavigationList>
        </Navigation>
      </SideBar>
      <MainContent>
        <Outlet />
      </MainContent>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding: 50px 20px;
`;

const SideBar = styled.aside`
  flex: 1;
`;

const Navigation = styled.nav`
  position: sticky;
  top: 120px;
`;

const NavigationList = styled.div`
  padding: 0 24px;
`;

const NavigationSegment = styled.div`
  border-bottom: 1px solid #edecec;
  padding-bottom: 10px;
  margin-bottom: 24px;
`;

const SegmentHeading = styled.h2`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const NavigationItem = styled.div`
  margin-bottom: 10px;
`;

const NavigationLink = styled(NavLink)`
  font-size: 15px;
  text-decoration: none;
  color: #000;
  &.active {
    color: teal;
    font-weight: 500;
  }
  // button styles
  background: none;
  border: none;
  cursor: pointer;
`;

const MainContent = styled.div`
  flex: 3;
`;

export default Dashboard;
