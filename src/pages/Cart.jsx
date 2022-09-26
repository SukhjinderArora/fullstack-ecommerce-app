import { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import PrimaryButton from '../components/shared/PrimaryButton';
import Spinner from '../components/shared/SpinnerRect';
import CartItem from '../components/CartItem';

import usePageTitle from '../hooks/usePageTitle';

import { STATUS, debounce } from '../utils/index';
import device from '../utils/device';

import {
  getCart,
  clearCart,
  removeCartItem,
  modifyCartItem,
} from '../store/cartSlice';
import PriceDetails from '../components/PriceDetails';

const Cart = () => {
  usePageTitle('Shopping Cart | Fashionista');
  const { cart, status } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCart());
    return () => clearCart();
  }, [dispatch]);

  const removeCartItemHandler = async (id, title) => {
    try {
      await dispatch(
        removeCartItem({
          id,
        })
      ).unwrap();
      setTimeout(() => {
        toast.success(
          `Successfully removed ${title.slice(0, 30)}.... from your cart`
        );
      }, 500);
      dispatch(getCart());
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  const modifyCartItemHandler = useMemo(
    () =>
      debounce(async (id, quantity, title) => {
        try {
          await dispatch(
            modifyCartItem({
              id,
              quantity,
            })
          ).unwrap();
          toast.success(
            `You have changed ${title.slice(
              0,
              30
            )}....  QUANTITY to ${quantity}`
          );
          setTimeout(() => {
            dispatch(getCart());
          }, 500);
        } catch (error) {
          toast.error('Something went wrong!');
        }
      }, 400),
    [dispatch]
  );

  const placeOrderHandler = () => {
    navigate('/checkout/address');
  };

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
          <PriceDetailsContainer>
            <PriceDetails
              checkoutButtonHandler={placeOrderHandler}
              buttonTitle="Place Order"
            />
          </PriceDetailsContainer>
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
  @media ${device.tablet} {
    flex-direction: column;
    align-items: stretch;
  }
  @media ${device.mobileM} {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Wrapper = styled.div`
  flex: 1;
  background: #fff;
  box-shadow: rgb(0 0 0 / 20%) 0px 1px 2px 0px;
  padding: 20px 20px 40px 20px;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 500;
  padding-bottom: 15px;
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
  @media ${device.tablet} {
    flex: 0;
  }
  @media ${device.mobileM} {
    flex: 0;
  }
`;

const CartHeader = styled.h1`
  font-size: 18px;
  font-weight: 500;
  padding: 15px 24px;
`;

const CartItemsContainer = styled.div``;

const PriceDetailsContainer = styled.div`
  flex: 1;
  position: sticky;
  top: 80px;
`;

export default Cart;
