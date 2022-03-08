import styled from 'styled-components';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { CheckCircle } from 'react-feather';

import usePageTitle from '../hooks/usePageTitle';

const PaymentSuccess = () => {
  usePageTitle('Order Successful');
  const location = useLocation();
  if (!location.state?.orderId) return <Navigate to="/" />;
  return (
    <Container>
      <SuccessIconContainer>
        <SuccessIcon />
      </SuccessIconContainer>
      <SuccessMessageContainer>
        <SuccessMessageHeader>Your Order is Successful</SuccessMessageHeader>
        <SuccessMessageText>
          Thank you for your order. Your order will be dispatched soon.
        </SuccessMessageText>
      </SuccessMessageContainer>
      <NavigateToOrder to={`/orders/${location.state?.orderId}`}>
        Go to Your Order
      </NavigateToOrder>
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
  margin-top: -70px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SuccessIconContainer = styled.div``;

const SuccessIcon = styled(CheckCircle)`
  stroke: teal;
  width: 150px;
  height: 150px;
`;

const SuccessMessageContainer = styled.div``;

const SuccessMessageHeader = styled.h1`
  font-size: 34px;
  color: #282c3f;
`;

const SuccessMessageText = styled.p`
  font-size: 18px;
  color: #93959f;
  margin: 16px 0;
`;

const NavigateToOrder = styled(Link)`
  display: inline-block;
  text-decoration: none;
  background-color: teal;
  color: #fff;
  font-family: inherit;
  font-size: 16px;
  font-weight: 700;
  padding: 10px 20px;
  border: 1px solid rgba(0, 0, 0, 0);
  transition: all 0.3s;
  cursor: pointer;
`;

export default PaymentSuccess;
