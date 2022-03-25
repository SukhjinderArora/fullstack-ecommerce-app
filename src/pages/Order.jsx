import { useEffect } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Spinner from '../components/shared/SpinnerRect';

import PageNotFound from './PageNotFound';

import usePageTitle from '../hooks/usePageTitle';

import { fetchOrder } from '../store/orderSlice';
import { STATUS } from '../utils';

const Order = () => {
  usePageTitle('Order Details');
  const { id } = useParams();
  const { order, status } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  const { shippingaddress, items } = order || {};

  const subTotal = items?.reduce(
    (acc, cur) => acc + Number(cur.productPrice),
    0
  );
  const shippingCharges = order?.deliveryPrice;
  const orderTotal = subTotal + shippingCharges;
  const orderDate = new Date(order?.createdAt).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  useEffect(() => {
    dispatch(
      fetchOrder({
        id,
      })
    );
  }, [dispatch, id]);

  if (status === STATUS.FAILED) return <PageNotFound />;

  if (status === STATUS.LOADING || !order) return <Spinner />;

  return (
    <Container>
      <BreadCrumbs>
        <BreadCrumbItem>
          <BreadCrumbItemLink exact to="/my/orders">
            Your Orders
          </BreadCrumbItemLink>
        </BreadCrumbItem>
        <BreadCrumbItem>{'>'}</BreadCrumbItem>
        <BreadCrumbItem>
          <BreadCrumbItemLink className="active" to={`/my/orders/${id}`}>
            Order Details
          </BreadCrumbItemLink>
        </BreadCrumbItem>
      </BreadCrumbs>
      <OrderHeader>Order Details</OrderHeader>
      <OrderInfoContainer>
        <OrderInfo>Ordered on {orderDate}</OrderInfo>
        <OrderInfo>Order# {order.id}</OrderInfo>
      </OrderInfoContainer>
      <OrderSummaryContainer>
        <OrderSummary>
          <OrderSummaryHeader>Shipping Address</OrderSummaryHeader>
          <OrderSummaryText>{shippingaddress.name}</OrderSummaryText>
          <OrderSummaryText>
            {shippingaddress.address},{shippingaddress.locality}
          </OrderSummaryText>
          <OrderSummaryText>
            {shippingaddress.city}, {shippingaddress.state}{' '}
            {shippingaddress.pincode}
          </OrderSummaryText>
          <OrderSummaryText>India</OrderSummaryText>
        </OrderSummary>
        <OrderSummary>
          <OrderSummaryHeader>Payment Method</OrderSummaryHeader>
          <OrderSummaryText>
            {order.razorpayOrderId
              ? 'Credit / Debit / ATM Card'
              : 'Pay On Delivery'}
          </OrderSummaryText>
        </OrderSummary>
        <OrderSummary>
          <OrderSummaryHeader>Order Summary</OrderSummaryHeader>
          <OrderSummaryTextContainer>
            <OrderSummaryText>Item(s) Subtotal:</OrderSummaryText>
            <OrderSummaryText>₹{subTotal}</OrderSummaryText>
          </OrderSummaryTextContainer>
          <OrderSummaryTextContainer>
            <OrderSummaryText>Shipping:</OrderSummaryText>
            <OrderSummaryText>
              {shippingCharges === 0 ? 'FREE' : `₹ ${shippingCharges}`}
            </OrderSummaryText>
          </OrderSummaryTextContainer>
          <OrderSummaryTextContainer>
            <OrderSummaryTextBold>Grand Total:</OrderSummaryTextBold>
            <OrderSummaryTextBold>₹{orderTotal}</OrderSummaryTextBold>
          </OrderSummaryTextContainer>
        </OrderSummary>
      </OrderSummaryContainer>
      <OrderItemsContainer>
        {items.map((item) => {
          return (
            <OrderItem key={item.id}>
              <OrderItemImageContainer>
                <OrderItemImage src={item.productImg} alt="product image" />
              </OrderItemImageContainer>
              <OrderItemDescription>
                <OrderItemTitle>
                  {item.productTitle} x {item.quantity}
                </OrderItemTitle>
                <OrderItemPrice>&#8377; {item.productPrice}</OrderItemPrice>
              </OrderItemDescription>
            </OrderItem>
          );
        })}
      </OrderItemsContainer>
    </Container>
  );
};

const Container = styled.div``;

const BreadCrumbs = styled.ul`
  display: flex;
  list-style: none;
  gap: 5px;
  margin-bottom: 10px;
`;

const BreadCrumbItem = styled.li``;

const BreadCrumbItemLink = styled(Link)`
  color: black;
  text-decoration: none;
  &.active {
    color: teal;
  }
`;

const OrderHeader = styled.h1`
  font-weight: 500;
  font-size: 24px;
`;

const OrderInfoContainer = styled.div`
  margin-top: 10px;
`;

const OrderInfo = styled.span`
  &:first-child {
    border-right: 1px solid #ccc;
    display: inline-block;
    margin-right: 10px;
    padding-right: 10px;
  }
`;

const OrderSummaryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid #ccc;
  padding: 15px 20px;
  margin: 20px 0;
`;

const OrderSummary = styled.div`
  flex: 1;
`;

const OrderSummaryHeader = styled.h1`
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 6px;
`;

const OrderSummaryTextContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const OrderSummaryText = styled.p`
  line-height: 24px;
`;

const OrderSummaryTextBold = styled(OrderSummaryText)`
  font-weight: 700;
`;

const OrderItemsContainer = styled.div`
  margin-top: 30px;
`;

const OrderItem = styled.div`
  display: flex;
  margin-bottom: 16px;
`;

const OrderItemImageContainer = styled.div`
  height: 112px;
  width: 112px;
  position: relative;
`;

const OrderItemImage = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  margin: auto;
  opacity: 1;
  max-width: 100%;
  max-height: 100%;
`;

const OrderItemDescription = styled.div``;

const OrderItemTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
`;

const OrderItemPrice = styled.p``;

export default Order;
