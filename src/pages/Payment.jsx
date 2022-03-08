import { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import PriceDetails from '../components/PriceDetails';
import CustomRadioButton from '../components/shared/CustomRadioButton';

import axios from '../utils/axios';
import Spinner from '../components/shared/SpinnerRect';

const paymentMethods = [
  {
    id: 1,
    name: 'Pay On Delivery',
    type: 'cash',
  },
  {
    id: 2,
    name: 'Credit / Debit / ATM Card',
    type: 'digital',
  },
];

const Payment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const { selectedAddress } = useSelector((state) => state.address);
  const [creatingOrder, setCreatingOrder] = useState(false);

  const navigate = useNavigate();

  const selectPaymentMethod = (paymentMethodId) => {
    setSelectedPaymentMethod(
      paymentMethods.find((method) => method.id === paymentMethodId)
    );
  };

  const checkoutHandler = async () => {
    if (selectedPaymentMethod && selectedAddress.id) {
      try {
        const response = await axios.post('/api/shop/order', {
          addressId: selectedAddress.id,
        });
        setCreatingOrder(true);
        setTimeout(() => {
          navigate('/checkout/payment-success', {
            replace: true,
            state: {
              orderId: response.data.orderId,
            },
          });
        }, [500]);
      } catch (error) {
        toast.error('Something went wrong!');
      }
    }
  };

  if (creatingOrder) return <Spinner />;

  return (
    <Container>
      <PaymentContainer>
        <Header>Select Payment Method</Header>
        {paymentMethods.map((method) => (
          <PaymentMethod
            key={method.id}
            id={method.id}
            onClick={() => selectPaymentMethod(method.id)}
          >
            <CustomRadioButton
              name="payment"
              selected={selectedPaymentMethod?.id === method.id}
              id={method.id}
              value={method.id}
            />
            <PaymentMethodName>{method.name}</PaymentMethodName>
          </PaymentMethod>
        ))}
      </PaymentContainer>
      <PriceDetailsContainer>
        <PriceDetails
          checkoutButtonHandler={checkoutHandler}
          buttonTitle="Place Order"
          buttonVisible={!!selectedPaymentMethod}
        />
      </PriceDetailsContainer>
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

const PaymentContainer = styled.div`
  flex: 3;
  background: #fff;
  box-shadow: rgb(0 0 0 / 20%) 0px 1px 2px 0px;
`;

const Header = styled.h1`
  font-size: 18px;
  font-weight: 500;
  padding: 15px 24px;
  border-bottom: 1px solid #efefef;
`;

const PaymentMethod = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #f0f0f0;
  padding: 16px 25px;
  cursor: pointer;
`;

const PaymentMethodName = styled.p`
  font-size: 14px;
  font-weight: 500;
`;

const PriceDetailsContainer = styled.div`
  flex: 1;
  position: sticky;
  top: 80px;
`;

export default Payment;
