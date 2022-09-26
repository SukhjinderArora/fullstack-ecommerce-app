import { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Spinner from './shared/SpinnerRect';

import { getUserOrders } from '../store/ordersSlice';
import { STATUS } from '../utils';
import device from '../utils/device';

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
                  <OrderInfoValue>
                    {orderDate.toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </OrderInfoValue>
                </div>
                <div>
                  <OrderInfoText>ORDER ID</OrderInfoText>
                  <OrderInfoValue># {order.id}</OrderInfoValue>
                </div>
                <div>
                  <OrderInfoLink to={`/my/orders/${order.id}`}>
                    View Order Details
                  </OrderInfoLink>
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
  @media ${device.tablet} {
    padding: 0;
  }
  @media ${device.mobileM} {
    padding: 0;
  }
`;

const OrdersHeader = styled.h1`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 40px;
  border-bottom: 1px solid #d4d4d9;
  padding-bottom: 30px;
`;

const OrdersContainer = styled.div``;

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

const OrderInfoValue = styled.p`
  margin-top: 5px;
`;

const OrderInfoLink = styled(Link)`
  color: teal;
  text-decoration: none;
`;

const OrderItemsContainer = styled.div`
  margin-top: 70px;
  @media ${device.tablet} {
    margin-top: 100px;
  }
  @media ${device.mobileM} {
    margin-top: 100px;
  }
`;

const OrderItem = styled.div`
  display: flex;
  margin-bottom: 16px;
  @media ${device.tablet} {
    gap: 10px;
  }
  @media ${device.mobileM} {
    gap: 10px;
  }
`;

const OrderItemImageContainer = styled.div`
  height: 112px;
  width: 112px;
`;

const OrderItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const OrderItemDescription = styled.div`
  @media ${device.tablet} {
    flex-shrink: 2;
  }
  @media ${device.mobileM} {
    flex-shrink: 2;
  }
`;

const OrderItemTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
  @media ${device.tablet} {
    font-size: 16px;
  }
  @media ${device.mobileM} {
    font-size: 16px;
  }
`;

const OrderItemPrice = styled.p``;

const OrderSummaryContainer = styled.div`
  margin-top: 20px;
`;

const OrderSummaryTitle = styled.p`
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 10px;
  @media ${device.tablet} {
    font-size: 16px;
  }
  @media ${device.mobileM} {
    font-size: 16px;
  }
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

export default Orders;
