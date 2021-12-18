import styled from 'styled-components';
import { Heart, User, ShoppingCart, Search as SearchIcon } from 'react-feather';

const Header = styled.header`
  height: 70px;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  padding: 0 20px;
  -webkit-box-shadow: 0px 8px 5px 0px rgba(240, 240, 240, 1);
  -moz-box-shadow: 0px 8px 5px 0px rgba(240, 240, 240, 1);
  box-shadow: 0px 8px 5px 0px rgba(240, 240, 240, 1);
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;

const BrandContainer = styled.div``;

const Brand = styled.a`
  color: black;
  text-decoration: none;
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase;
`;

const SearchContainer = styled.div`
  width: 400px;
  position: relative;
`;

const SeachInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px;
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
  list-style: none;
`;

const NavigationItem = styled.li`
  margin-right: 20px;
`;

const NavigationLink = styled.a`
  display: flex;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 14px;
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

const Navbar = () => {
  return (
    <Header>
      <Navigation>
        <BrandContainer>
          <Brand href="/">Fashionista</Brand>
        </BrandContainer>
        <SearchContainer>
          <SeachInput placeholder="Search entire store here..." />
          <SearchButton>
            <SearchIcon color="grey" size="16" />
          </SearchButton>
        </SearchContainer>
        <NavigationList>
          <NavigationItem>
            <NavigationLink>Register</NavigationLink>
          </NavigationItem>
          <NavigationItem>
            <NavigationLink>Login</NavigationLink>
          </NavigationItem>
          <NavigationItem>
            <NavigationLink title="wishlist">
              <Heart color="#1b2839" size="20" />
            </NavigationLink>
          </NavigationItem>
          <NavigationItem>
            <NavigationLink title="user">
              <User color="#1b2839" size="20" />
            </NavigationLink>
          </NavigationItem>
          <NavigationItem>
            <NavigationLink title="cart">
              <IconContainer>
                <ShoppingCart color="#1b2839" size="20" />
                <CartBadge>12</CartBadge>
              </IconContainer>
            </NavigationLink>
          </NavigationItem>
        </NavigationList>
      </Navigation>
    </Header>
  );
};

export default Navbar;
