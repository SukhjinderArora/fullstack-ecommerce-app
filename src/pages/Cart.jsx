import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ChevronLeft, Minus, Plus } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import PrimaryButton from '../components/shared/PrimaryButton';
import Spinner from '../components/shared/SpinnerRect';
import CartItem from '../components/CartItem';

import usePageTitle from '../hooks/usePageTitle';

import { STATUS, debounce } from '../utils/index';

import {
  getCart,
  clearCart,
  removeCartItem,
  modifyCartItem,
} from '../store/cartSlice';

const Cart = () => {
  usePageTitle('Shopping Cart | Fashionista');
  const { cart, status } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart());
    return () => clearCart();
  }, [dispatch]);

  const removeCartItemHandler = async (id) => {
    try {
      await dispatch(
        removeCartItem({
          id,
        })
      ).unwrap();
      setTimeout(() => {
        toast.success('Product successfully removed from the cart');
      }, 500);
      dispatch(getCart());
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  const modifyCartItemHandler = debounce(async (id, quantity) => {
    try {
      await dispatch(
        modifyCartItem({
          id,
          quantity,
        })
      ).unwrap();
      setTimeout(() => {
        dispatch(getCart());
      }, 500);
    } catch (error) {
      toast.error('Something went wrong!');
    }
  });

  if (status === STATUS.LOADING) return <Spinner />;

  return (
    <Container>
      {cart.items.length <= 0 ? (
        <Wrapper>
          <Title>My Cart</Title>
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
      ) : (
        <>
          <CartContainer>
            <CartHeader>My Cart ({cart.items.length})</CartHeader>
            <CartItemsContainer>
              {cart.items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  removeCartItem={removeCartItemHandler}
                  modifyCartItem={modifyCartItemHandler}
                />
              ))}
            </CartItemsContainer>
          </CartContainer>
          <CheckoutContainer>
            <CheckoutHeader>Price Details</CheckoutHeader>
            <CheckoutSummary>
              <SummaryItem>
                <ItemName>Price ({cart.items.length} Items)</ItemName>
                <ItemValue>₹ {cart.totalPrice}</ItemValue>
              </SummaryItem>
              <SummaryItem>
                <ItemName>Delivery Charges</ItemName>
                <ItemValue>
                  {cart.deliveryPrice ? `₹ ${cart.deliveryPrice}` : 'Free'}
                </ItemValue>
              </SummaryItem>
              <TotalAmount>
                <SummaryItem>
                  <ItemName>Total Amount</ItemName>
                  <ItemValue>
                    ₹ {cart.totalPrice + cart.deliveryPrice}
                  </ItemValue>
                </SummaryItem>
              </TotalAmount>
              <CheckoutButton>Place Order</CheckoutButton>
            </CheckoutSummary>
          </CheckoutContainer>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 50px 20px;
  display: flex;
  gap: 20px;
  background: #f1f3f6;
  align-items: flex-start;
  min-height: 100vh;
`;

const Wrapper = styled.div`
  flex: 1;
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const IconWrapper = styled.span`
  display: flex;
`;

const CartContainer = styled.div`
  flex: 3;
  background: #fff;
  box-shadow: rgb(0 0 0 / 20%) 0px 1px 2px 0px;
`;

const CartHeader = styled.h1`
  font-size: 18px;
  font-weight: 500;
  padding: 15px 24px;
`;

const CartItemsContainer = styled.div``;

const CheckoutContainer = styled.div`
  flex: 1;
  background: #fff;
  box-shadow: rgb(0 0 0 / 20%) 0px 1px 2px 0px;
  position: sticky;
  top: 80px;
`;

const CheckoutHeader = styled.h1`
  padding: 13px 24px;
  font-size: 16px;
  text-transform: uppercase;
  color: #878787;
  border-bottom: 1px solid #f0f0f0;
`;

const CheckoutSummary = styled.div`
  padding: 0 24px;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  align-items: flex-start;
`;

const ItemName = styled.p``;

const ItemValue = styled.p``;

const TotalAmount = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin: 30px 0;
  color: #212121;
  border-top: 1px dashed #e0e0e0;
  border-bottom: 1px dashed #e0e0e0;
`;

const CheckoutButton = styled.button`
  display: inline-block;
  background-color: teal;
  color: white;
  border: 1px solid transparent;
  text-transform: uppercase;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 20%);
  padding: 16px 30px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 2px;
  margin-bottom: 20px;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: teal;
    border: 1px solid teal;
  }
`;

export default Cart;
