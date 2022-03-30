import { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import PriceDetails from '../components/PriceDetails';
import CustomRadioButton from '../components/shared/CustomRadioButton';

import axios from '../utils/axios';
import Spinner from '../components/shared/SpinnerRect';

import { clearCart } from '../store/cartSlice';

import { RAZORPAY_KEY_ID } from '../utils/config';
import device from '../utils/device';

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
  const [creatingOrder, setCreatingOrder] = useState(false);
  const { selectedAddress } = useSelector((state) => state.address);
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectPaymentMethod = (paymentMethodId) => {
    setSelectedPaymentMethod(
      paymentMethods.find((method) => method.id === paymentMethodId)
    );
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    try {
      const res = await loadScript(
        'https://checkout.razorpay.com/v1/checkout.js'
      );
      if (!res) {
        toast.error('Razorpay SDK failed to load. Are you online?');
        return;
      }
      const result = await axios.post('/api/shop/order/razorpay');
      if (!result) {
        toast.error('Server error. Are you online?');
        return;
      }
      // eslint-disable-next-line camelcase
      const { amount, id: order_id, currency } = result.data;

      const options = {
        key: RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
        amount: amount.toString(),
        currency,
        name: 'Fashionista',
        description: 'Thank you for your order',
        image: `${process.env.PUBLIC_URL}/logo512.png`,
        // eslint-disable-next-line camelcase
        order_id,
        async handler(response) {
          try {
            const data = {
              // eslint-disable-next-line camelcase
              orderId: order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            };
            // eslint-disable-next-line no-shadow
            await axios.post('/api/shop/order/verify-payment', data);
            setCreatingOrder(true);
            // eslint-disable-next-line no-shadow
            const res = await axios.post('/api/shop/order', {
              addressId: selectedAddress.id,
              // eslint-disable-next-line camelcase
              razorpayOrderId: order_id,
            });
            dispatch(clearCart());
            navigate('/checkout/payment-success', {
              replace: true,
              state: {
                orderId: res.data.orderId,
              },
            });
          } catch (error) {
            toast.error('Something went wrong!');
          }
        },
        prefill: {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          contact: selectedAddress.phoneNumber,
        },
        notes: {
          address: 'Fashionista ecommerce store',
        },
        theme: {
          color: '#008080',
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  const checkoutHandler = async () => {
    if (selectedPaymentMethod.type === 'cash' && selectedAddress.id) {
      try {
        setCreatingOrder(true);
        const response = await axios.post('/api/shop/order', {
          addressId: selectedAddress.id,
        });
        dispatch(clearCart());
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
    } else if (selectedPaymentMethod.type === 'digital' && selectedAddress.id) {
      displayRazorpay();
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
  @media ${device.tablet} {
    flex-direction: column;
    align-items: stretch;
  }
  @media ${device.mobileM} {
    flex-direction: column;
    align-items: stretch;
  }
`;

const PaymentContainer = styled.div`
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
