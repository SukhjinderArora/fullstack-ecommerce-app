import styled from 'styled-components';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const PriceDetails = ({
  checkoutButtonHandler,
  buttonTitle,
  buttonVisible,
}) => {
  const { cart } = useSelector((state) => state.cart);

  return (
    <PriceBlockContainer>
      <PriceBlockHeader>Price Details</PriceBlockHeader>
      <PriceBreakUpContainer>
        <PriceDetail>
          <PriceDetailItem>Price ({cart.items.length} Items)</PriceDetailItem>
          <PriceDetailValue>₹ {cart.totalPrice}</PriceDetailValue>
        </PriceDetail>
        <PriceDetail>
          <PriceDetailItem>Delivery Charges</PriceDetailItem>
          <PriceDetailValue>
            {cart.deliveryPrice ? `₹ ${cart.deliveryPrice}` : 'Free'}
          </PriceDetailValue>
        </PriceDetail>
        <TotalAmount>
          <PriceDetail>
            <PriceDetailItem>Total Amount</PriceDetailItem>
            <PriceDetailValue>
              ₹ {cart.totalPrice + cart.deliveryPrice}
            </PriceDetailValue>
          </PriceDetail>
        </TotalAmount>
        {buttonVisible && (
          <CheckoutButton onClick={checkoutButtonHandler}>
            {buttonTitle}
          </CheckoutButton>
        )}
      </PriceBreakUpContainer>
    </PriceBlockContainer>
  );
};

const PriceBlockContainer = styled.div`
  background: #fff;
  box-shadow: rgb(0 0 0 / 20%) 0px 1px 2px 0px;
`;

const PriceBlockHeader = styled.h1`
  padding: 13px 24px;
  font-size: 16px;
  text-transform: uppercase;
  color: #878787;
  border-bottom: 1px solid #f0f0f0;
`;

const PriceBreakUpContainer = styled.div`
  padding: 0 24px;
`;

const PriceDetail = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  align-items: flex-start;
`;

const PriceDetailItem = styled.p``;

const PriceDetailValue = styled.p``;

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

PriceDetails.propTypes = {
  checkoutButtonHandler: PropTypes.func.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  buttonVisible: PropTypes.bool,
};

PriceDetails.defaultProps = {
  buttonVisible: true,
};

export default PriceDetails;
