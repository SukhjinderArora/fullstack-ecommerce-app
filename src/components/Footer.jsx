import styled from 'styled-components';
import { Truck, Phone, Star, Lock } from 'react-feather';

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
            <ListItem>Men&apos;s Shirt</ListItem>
            <ListItem>Men&apos;s T-Shirt</ListItem>
            <ListItem>Hoodies</ListItem>
            <ListItem>Women&apos;s Night Suit</ListItem>
          </ItemList>
        </FooterItem>
        <FooterItem>
          <ItemTitle>My Account</ItemTitle>
          <ItemList>
            <ListItem>Profile</ListItem>
            <ListItem>Orders</ListItem>
            <ListItem>Cart</ListItem>
            <ListItem>Wishlist</ListItem>
          </ItemList>
        </FooterItem>
        <FooterItem>
          <ItemTitle>Information</ItemTitle>
          <ItemList>
            <ListItem>About Us</ListItem>
            <ListItem>Privacy Policy</ListItem>
            <ListItem>Refund Policy</ListItem>
            <ListItem>Terms And Conditions</ListItem>
            <ListItem>Shipping Policy</ListItem>
            <ListItem>Billing & Payments</ListItem>
          </ItemList>
        </FooterItem>
      </MainFooter>
    </FooterContainer>
  );
};

export default Footer;
