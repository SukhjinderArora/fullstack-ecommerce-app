import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Plus, Minus } from 'react-feather';

import device from '../utils/device';

const CartItem = ({ item, removeCartItem, modifyCartItem }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const isInitialRender = useRef(true);
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    if (quantity) {
      modifyCartItem(item.id, quantity, item.title);
    }
  }, [quantity, modifyCartItem, item.id, item.title]);
  const modifyCartItemHandler = (evt) => {
    setQuantity(evt.target.value);
  };
  return (
    <StyledCartItem key={item.id}>
      <CartItemInfo>
        <ImageContainer>
          <Image src={item.img} />
        </ImageContainer>
        <ItemDescription>
          <ItemTitle to={`/product/${item.productVariantId}`}>
            {item.title}
          </ItemTitle>
          <ItemSize>
            <strong>Size: </strong>
            {item.size.toUpperCase()}
          </ItemSize>
          <ItemPrice>INR {item.price}</ItemPrice>
        </ItemDescription>
      </CartItemInfo>
      <CartItemActions>
        <QuantityContainer>
          <IncreaseQtyBtn
            onClick={() => {
              setQuantity((qty) => qty + 1);
            }}
          >
            <Plus />
          </IncreaseQtyBtn>
          <InputQty
            type="number"
            min="0"
            value={quantity}
            onChange={modifyCartItemHandler}
          />
          <DecreaseQtyBtn
            onClick={() => {
              setQuantity((qty) => (qty <= 1 ? qty : qty - 1));
            }}
          >
            <Minus />
          </DecreaseQtyBtn>
        </QuantityContainer>
        <ButtonsContainer>
          <SaveForLater>Save For Later</SaveForLater>
          <RemoveCartItem onClick={() => removeCartItem(item.id, item.title)}>
            Remove
          </RemoveCartItem>
        </ButtonsContainer>
      </CartItemActions>
    </StyledCartItem>
  );
};

const StyledCartItem = styled.div`
  padding: 24px;
  border-top: 1px solid #dbdada;
`;

const CartItemInfo = styled.div`
  display: flex;
  @media ${device.tablet} {
    gap: 20px;
  }
  @media ${device.mobileM} {
    gap: 20px;
  }
`;

const ImageContainer = styled.div`
  height: 112px;
  width: 112px;
  position: relative;
`;

const Image = styled.img`
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

const ItemDescription = styled.div`
  @media ${device.tablet} {
    flex-shrink: 2;
  }
  @media ${device.mobileM} {
    flex-shrink: 2;
  }
`;

const ItemTitle = styled(Link)`
  display: inline-block;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 10px;
  text-decoration: none;
  &:visited,
  &:active,
  &:link {
    color: #000;
  }
`;

const ItemSize = styled.div`
  margin-bottom: 10px;
`;

const ItemPrice = styled.div`
  color: teal;
  font-size: 16px;
  font-weight: 700;
`;

const CartItemActions = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 20px;
  @media ${device.tablet} {
    flex-direction: column;
  }
  @media ${device.mobileM} {
    flex-direction: column;
  }
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
`;

const QtyButton = styled.button`
  background: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid grey;
  cursor: pointer;
  & svg {
    width: 16px;
    height: 16px;
  }
`;

const IncreaseQtyBtn = styled(QtyButton)``;

const InputQty = styled.input`
  font-size: 14px;
  width: 40px;
  height: 30px;
  font-size: 18px;
  padding: 5px;
  text-align: center;
  vertical-align: middle;
  display: inline-block;
  margin: 0 8px;
  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const DecreaseQtyBtn = styled(QtyButton)``;

const CartActionButton = styled.button`
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  background: no-repeat;
  font-size: 16px;
  color: #212121;
  cursor: pointer;
  &:hover {
    color: teal;
  }
`;

const ButtonsContainer = styled.div``;

const SaveForLater = styled(CartActionButton)`
  margin-right: 20px;
`;

const RemoveCartItem = styled(CartActionButton)``;

CartItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object.isRequired,
  removeCartItem: PropTypes.func.isRequired,
  modifyCartItem: PropTypes.func.isRequired,
};

export default CartItem;
