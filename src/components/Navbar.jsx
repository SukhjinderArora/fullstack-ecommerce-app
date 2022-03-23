import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { Heart, User, ShoppingCart, Search as SearchIcon } from 'react-feather';

import { logout } from '../store/authSlice';

const Navbar = () => {
  const { isAuthenticated, verifyingToken } = useSelector(
    (state) => state.auth
  );
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Header>
      <Navigation>
        <BrandContainer>
          <Brand to="/">Fashionista</Brand>
        </BrandContainer>
        <SearchContainer>
          <SearchInput placeholder="Search entire store here..." />
          <SearchButton>
            <SearchIcon color="grey" size="16" />
          </SearchButton>
        </SearchContainer>
        <NavigationList>
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
        </NavigationList>
      </Navigation>
    </Header>
  );
};

const Header = styled.header`
  height: 70px;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  padding: 0 20px;
  -webkit-box-shadow: 0px 8px 5px 0px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0px 8px 5px 0px rgba(0, 0, 0, 0.05);
  box-shadow: 0px 8px 5px 0px rgba(0, 0, 0, 0.05);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;

const BrandContainer = styled.div``;

const Brand = styled(Link)`
  color: #1b2839;
  text-decoration: none;
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase;
  &:hover {
    color: teal;
  }
`;

const SearchContainer = styled.div`
  width: 400px;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px;
  border: none;
  outline: 1px solid grey;
  &:focus {
    outline: 1px solid teal;
  }
`;

const SearchButton = styled.button`
  background-color: transparent;
  border: none;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const NavigationList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  list-style: none;
  flex-basis: 33%;
`;

const NavigationItem = styled.li`
  margin-right: 20px;
  transition: all 5s;
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
`;

export default Navbar;
