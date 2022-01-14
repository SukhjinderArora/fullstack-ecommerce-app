import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ChevronLeft, Minus, Plus, Trash2 } from 'react-feather';

import PrimaryButton from '../components/shared/PrimaryButton';
import usePageTitle from '../hooks/usePageTitle';

const Cart = () => {
  usePageTitle('Cart | Fashionista');
  const [isCartEmpty, setIsEmpty] = useState(false);
  return (
    <Container>
      <Title>My Cart</Title>
      {isCartEmpty && (
        <Wrapper>
          <Text>You have no items in your shopping cart.</Text>
          <Text>
            Click <StyledLink to="/">here</StyledLink> to continue shopping.
          </Text>
          <ButtonWrapperLink to="/">
            <ContinueShoppingButton>
              <IconWrapper>
                <ChevronLeft />
              </IconWrapper>
              Continue Shopping
            </ContinueShoppingButton>
          </ButtonWrapperLink>
        </Wrapper>
      )}
      {!isCartEmpty && (
        <Wrapper>
          <CartItem>
            <ImageContainer>
              <Image src="https://images-do.nyc3.cdn.digitaloceanspaces.com/rtUgAvkUMm/product_images/1628749615.Screenshot_2021-08-12_at_11-56-00_Multi_Moon_Printed_Shirt_For_Men_Warivos.png" />
            </ImageContainer>
            <CartItemInfo>
              <ItemTitle>Multi Moon Printed Shirt For Men</ItemTitle>
              <ItemSize>
                <strong>Size: </strong>M
              </ItemSize>
              <ItemPrice>INR 499.00</ItemPrice>
              <QuantityContainer>
                <QuantityLabel>Qty:</QuantityLabel>
                <QuantityBox>
                  <QtyButton>
                    <Minus />
                  </QtyButton>
                  <Quantity value="2" />
                  <QtyButton>
                    <Plus />
                  </QtyButton>
                </QuantityBox>
              </QuantityContainer>
            </CartItemInfo>
            <DeleteCartItemBtn>
              <Trash2 stroke="grey" />
            </DeleteCartItemBtn>
          </CartItem>
          <CartItem>
            <ImageContainer>
              <Image src="https://images-do.nyc3.cdn.digitaloceanspaces.com/rtUgAvkUMm/product_images/1631088484.86.jpg" />
            </ImageContainer>
            <CartItemInfo>
              <ItemTitle>BROWN TEXTURED RIB TURTLE NECK T-SHIRT</ItemTitle>
              <ItemSize>
                <strong>Size: </strong>XL
              </ItemSize>
              <ItemPrice>INR 499.00</ItemPrice>
              <QuantityContainer>
                <QuantityLabel>Qty:</QuantityLabel>
                <QuantityBox>
                  <QtyButton>
                    <Minus />
                  </QtyButton>
                  <Quantity value="2" />
                  <QtyButton>
                    <Plus />
                  </QtyButton>
                </QuantityBox>
              </QuantityContainer>
            </CartItemInfo>
            <DeleteCartItemBtn>
              <Trash2 stroke="grey" />
            </DeleteCartItemBtn>
          </CartItem>
          <CartItem>
            <ImageContainer>
              <Image src="https://images-do.nyc3.cdn.digitaloceanspaces.com/rtUgAvkUMm/product_images/1628749615.Screenshot_2021-08-12_at_11-56-00_Multi_Moon_Printed_Shirt_For_Men_Warivos.png" />
            </ImageContainer>
            <CartItemInfo>
              <ItemTitle>Multi Moon Printed Shirt For Men</ItemTitle>
              <ItemSize>
                <strong>Size: </strong>M
              </ItemSize>
              <ItemPrice>INR 499.00</ItemPrice>
              <QuantityContainer>
                <QuantityLabel>Qty:</QuantityLabel>
                <QuantityBox>
                  <QtyButton>
                    <Minus />
                  </QtyButton>
                  <Quantity value="2" />
                  <QtyButton>
                    <Plus />
                  </QtyButton>
                </QuantityBox>
              </QuantityContainer>
            </CartItemInfo>
            <DeleteCartItemBtn>
              <Trash2 stroke="grey" />
            </DeleteCartItemBtn>
          </CartItem>
        </Wrapper>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 50px 20px;
`;

const Wrapper = styled.div`
  margin-top: 40px;
`;

const Title = styled.h1`
  text-align: center;
  color: rgb(27, 40, 57);
  text-transform: uppercase;
  font-weight: 500;
`;

const Text = styled.p`
  line-height: 1.6;
`;

const StyledLink = styled(Link)``;

const ButtonWrapperLink = styled(Link)`
  text-decoration: none;
`;

const ContinueShoppingButton = styled(PrimaryButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const IconWrapper = styled.span`
  display: flex;
`;

const CartItem = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border: 1px solid #c7c7c7;
  padding: 20px 15px;
  margin-bottom: 20px;
`;

const ImageContainer = styled.div`
  width: 200px;
  height: 200px;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const CartItemInfo = styled.div`
  flex: 1;
  padding: 0 20px;
`;

const ItemTitle = styled.h1`
  font-size: 22px;
  text-transform: uppercase;
  color: #1b2839;
  margin-bottom: 10px;
  font-weight: 500;
`;

const ItemSize = styled.p`
  & strong {
    margin-right: 5px;
  }
`;

const ItemPrice = styled.p`
  font-weight: 700;
  color: teal;
  margin-top: 10px;
  font-size: 18px;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
`;

const QuantityLabel = styled.span`
  font-size: 18px;
`;

const QuantityBox = styled.div`
  display: flex;
  margin-left: 10px;
`;

const QtyButton = styled.button`
  background: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid grey;
  & svg {
    width: 16px;
    height: 16px;
  }
`;

const Quantity = styled.input`
  width: 50px;
  height: 30px;
  font-size: 18px;
  padding: 5px;
  text-align: center;
  vertical-align: middle;
  display: inline-block;
  margin: 0 8px;
`;

const IncreaseQtyButton = styled.button`
  background: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid grey;
`;

const DeleteCartItemBtn = styled.button`
  background: transparent;
  border: navajowhite;
`;

export default Cart;
