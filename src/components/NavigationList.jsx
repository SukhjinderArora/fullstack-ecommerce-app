import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { Heart, User, ShoppingCart } from 'react-feather';

import { logout } from '../store/authSlice';
import device from '../utils/device';

const NavigationList = () => {
  const { isAuthenticated, verifyingToken } = useSelector(
    (state) => state.auth
  );
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <StyledNavigationList>
      {!verifyingToken && (
        <>
          {!isAuthenticated && (
            <NavigationItem>
              <NavigationLink to="/register" state={{ from: location }}>
                Register
              </NavigationLink>
            </NavigationItem>
          )}
          {!isAuthenticated && (
            <NavigationItem>
              <NavigationLink to="/login" state={{ from: location }}>
                Login
              </NavigationLink>
            </NavigationItem>
          )}
          {isAuthenticated && (
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
                Logout
              </NavigationLink>
            </NavigationItem>
          )}
          <NavigationItem>
            <NavigationLink
              to={isAuthenticated ? '/' : '/login'}
              title="Wishlist"
            >
              <Heart color="#1b2839" size="20" />
              <LinkDescription>Wishlist</LinkDescription>
            </NavigationLink>
          </NavigationItem>
          <NavigationItem>
            <NavigationLink
              to={isAuthenticated ? '/my/dashboard' : '/login'}
              title="Profile"
            >
              <User color="#1b2839" size="20" />
              <LinkDescription>Profile</LinkDescription>
            </NavigationLink>
          </NavigationItem>
          <NavigationItem>
            <NavigationLink to="/checkout/cart" title="Cart">
              <IconContainer>
                <ShoppingCart color="#1b2839" size="20" />
                <CartBadge>{cart.items.length}</CartBadge>
              </IconContainer>
              <LinkDescription>Cart</LinkDescription>
            </NavigationLink>
          </NavigationItem>
        </>
      )}
    </StyledNavigationList>
  );
};

const StyledNavigationList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  list-style: none;
  flex-basis: 33%;
  @media ${device.tablet} {
    flex-direction: column;
  }
  @media ${device.mobileM} {
    flex-direction: column;
  }
`;

const NavigationItem = styled.li`
  margin-right: 20px;
  transition: all 5s;
  @media ${device.tablet} {
    margin-right: 0;
    margin-bottom: 30px;
  }
  @media ${device.mobileM} {
    margin-right: 0;
    margin-bottom: 30px;
  }
`;

const NavigationLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #1b2839;
  cursor: pointer;
  text-transform: uppercase;
  text-decoration: none;
  font-size: 14px;
  &:hover {
    color: teal;
  }
  &:hover svg {
    stroke: teal;
  }
  &:hover > span {
    color: teal;
  }
  // button styles
  background: none;
  border: none;
  @media ${device.tablet} {
    flex-direction: row;
    & svg {
      margin-right: 5px;
    }
  }
  @media ${device.mobileM} {
    flex-direction: row;
    & svg {
      margin-right: 5px;
    }
  }
`;

const LinkDescription = styled.span`
  text-transform: capitalize;
  font-weight: 700;
  color: rgb(27, 40, 57);
  display: inline-block;
  margin-top: 3px;
`;

const IconContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CartBadge = styled.span`
  display: inline-flex;
  background-color: teal;
  color: white;
  font-size: 12px;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  position: absolute;
  bottom: 0;
  left: 22px;
  @media ${device.tablet} {
    left: 55px;
  }
  @media ${device.mobileM} {
    left: 55px;
  }
`;

export default NavigationList;
