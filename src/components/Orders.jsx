import { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from './shared/SpinnerRect';

import { getUserOrders } from '../store/ordersSlice';
import { STATUS } from '../utils';

const Orders = () => {
  const { status, orders } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  if (status === STATUS.LOADING) return <Spinner />;

  if (status === STATUS.FAILED) return <div>Something went wrong!</div>;

  return (
    <Container>
      <OrdersHeader>Your Orders</OrdersHeader>
      {orders.length === 0 && <div>You have no orders</div>}
      <OrdersContainer>
        {orders?.map((order) => {
          const subTotal = order.items.reduce(
            (acc, cur) => acc + Number(cur.productPrice),
            0
          );
          const shippingCharges = order.deliveryPrice;
          const orderTotal = subTotal + shippingCharges;
          const orderDate = new Date(order.createdAt);
          return (
            <OrderCard key={order.id}>
              <OrderInfo>
                <div>
                  <OrderInfoText>ORDER PLACED</OrderInfoText>
                  <OrderInfoText>
                    {orderDate.toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </OrderInfoText>
                </div>
                <div>
                  <OrderInfoText>ORDER ID</OrderInfoText>
                  <OrderInfoValue># {order.id}</OrderInfoValue>
                </div>
                <div>
                  <OrderInfoText>View Order Details</OrderInfoText>
                </div>
              </OrderInfo>
              <OrderItemsContainer>
                {order.items.map((item) => {
                  return (
                    <OrderItem key={item.id}>
                      <OrderItemImageContainer>
                        <OrderItemImage
                          src={item.productImg}
                          alt="product image"
                        />
                      </OrderItemImageContainer>
                      <OrderItemDescription>
                        <OrderItemTitle>
                          {item.productTitle} x {item.quantity}
                        </OrderItemTitle>
                        <OrderItemPrice>
                          &#8377; {item.productPrice}
                        </OrderItemPrice>
                      </OrderItemDescription>
                    </OrderItem>
                  );
                })}
              </OrderItemsContainer>
              <OrderSummaryContainer>
                <OrderSummaryTitle>Order Summary</OrderSummaryTitle>
                <OrderSummary>
                  <OrderSummaryItem>Item(s) Subtotal:</OrderSummaryItem>
                  <OrderSummaryValue>&#8377; {subTotal}</OrderSummaryValue>
                </OrderSummary>
                <OrderSummary>
                  <OrderSummaryItem>Shipping:</OrderSummaryItem>
                  <OrderSummaryValue>
                    {shippingCharges === 0 ? 'FREE' : `₹ ${shippingCharges}`}
                  </OrderSummaryValue>
                </OrderSummary>
                <OrderSummary>
                  <OrderSummaryItem>Grand Total:</OrderSummaryItem>
                  <OrderSummaryValue>₹ {orderTotal}</OrderSummaryValue>
                </OrderSummary>
              </OrderSummaryContainer>
            </OrderCard>
          );
        })}
      </OrdersContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 30px;
`;

const OrdersHeader = styled.h1`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 40px;
  border-bottom: 1px solid #d4d4d9;
  padding-bottom: 30px;
`;

const OrdersContainer = styled.div``;

const CardContainer = styled.div``;

const OrderCard = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  position: relative;
  margin-bottom: 20px;
`;

const OrderInfo = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 4px;
  background-color: #e9e9e954;
  & > div:first-child {
    flex: 1;
  }
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

const OrderInfoText = styled.p``;

const OrderInfoValue = styled.p``;

const OrderItemsContainer = styled.div`
  margin-top: 70px;
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

const OrderSummaryContainer = styled.div`
  margin-top: 20px;
`;

const OrderSummaryTitle = styled.p`
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 10px;
`;

const OrderSummary = styled.div`
  display: flex;
  margin-bottom: 5px;
  justify-content: space-between;
`;

const OrderSummaryItem = styled.p`
  font-weight: 500;
  margin-right: 10px;
`;

const OrderSummaryValue = styled.p``;

const GrandTotalText = styled.p``;

const GrandTotalValue = styled.p``;

export default Orders;
