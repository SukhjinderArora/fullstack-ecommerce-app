import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Truck, Phone, Star, Lock } from 'react-feather';

const Footer = () => {
  return (
    <FooterContainer>
      <SiteFeatures>
        <SiteFeature>
          <FeatureIcon>
            <Truck stroke="white" />
          </FeatureIcon>
          <FeatureTitle>All India Shipping</FeatureTitle>
          <FeatureSubTitle>Cash On Delivery</FeatureSubTitle>
        </SiteFeature>
        <SiteFeature>
          <FeatureIcon>
            <Phone stroke="white" />
          </FeatureIcon>
          <FeatureTitle>24/7 Support</FeatureTitle>
          <FeatureSubTitle>Online 24 Hours</FeatureSubTitle>
        </SiteFeature>
        <SiteFeature>
          <FeatureIcon>
            <Star stroke="white" />
          </FeatureIcon>
          <FeatureTitle>Premium Quality</FeatureTitle>
          <FeatureSubTitle>Genuine Products</FeatureSubTitle>
        </SiteFeature>
        <SiteFeature>
          <FeatureIcon>
            <Lock stroke="white" />
          </FeatureIcon>
          <FeatureTitle>Secure Payment</FeatureTitle>
          <FeatureSubTitle>100% Payment Protection</FeatureSubTitle>
        </SiteFeature>
      </SiteFeatures>
      <MainFooter>
        <FooterItem>
          <ItemTitle>Contact Us</ItemTitle>
          <ItemList>
            <ListItem>Email: contact@fashionista.com</ListItem>
          </ItemList>
        </FooterItem>
        <FooterItem>
          <ItemTitle>Categories</ItemTitle>
          <ItemList>
            <ListItem>
              <ItemLink to="/products/mens-shirt">Men&apos;s Shirt</ItemLink>
            </ListItem>
            <ListItem>
              <ItemLink to="/products/mens-t-shirt">
                Men&apos;s T-Shirt
              </ItemLink>
            </ListItem>
            <ListItem>
              <ItemLink to="/products/hoodies">Hoodies</ItemLink>
            </ListItem>
            <ListItem>
              <ItemLink to="/products/saree">Saree</ItemLink>
            </ListItem>
          </ItemList>
        </FooterItem>
        <FooterItem>
          <ItemTitle>My Account</ItemTitle>
          <ItemList>
            <ListItem>
              <ItemLink to="/my/profile">Profile</ItemLink>
            </ListItem>
            <ListItem>
              <ItemLink to="/my/orders">Orders</ItemLink>
            </ListItem>
            <ListItem>
              <ItemLink to="/checkout/cart">Cart</ItemLink>
            </ListItem>
            <ListItem>
              <ItemLink to="/">Wishlist</ItemLink>
            </ListItem>
          </ItemList>
        </FooterItem>
        <FooterItem>
          <ItemTitle>Information</ItemTitle>
          <ItemList>
            <ListItem>
              <ItemLink to="/">About Us</ItemLink>
            </ListItem>
            <ListItem>
              <ItemLink to="/">Privacy Policy</ItemLink>
            </ListItem>
            <ListItem>
              <ItemLink to="/">Refund Policy</ItemLink>
            </ListItem>
            <ListItem>
              <ItemLink to="/">Terms And Conditions</ItemLink>
            </ListItem>
            <ListItem>
              <ItemLink to="/">Shipping Policy</ItemLink>
            </ListItem>
            <ListItem>
              <ItemLink to="/">Billing & Payments</ItemLink>
            </ListItem>
          </ItemList>
        </FooterItem>
      </MainFooter>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer``;

const SiteFeatures = styled.div`
  display: flex;
  justify-content: space-evenly;
  background: teal;
  padding: 25px 0;
`;

const SiteFeature = styled.div`
  text-align: center;
`;

const FeatureIcon = styled.div``;

const FeatureTitle = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  line-height: 25px;
`;

const FeatureSubTitle = styled.p`
  font-size: 15px;
  color: #fff;
  line-height: 18px;
`;

const MainFooter = styled.div`
  background: #fafbfc;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  padding: 20px 0;
`;

const FooterItem = styled.div``;

const ItemTitle = styled.p`
  font-size: 20px;
  font-weight: 500;
  line-height: 2;
`;

const ItemList = styled.ul`
  list-style: none;
  margin-top: 10px;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
  font-size: 16px;
`;

const ItemLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

export default Footer;
