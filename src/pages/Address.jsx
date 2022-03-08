import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'react-feather';

import PriceDetails from '../components/PriceDetails';
import CustomRadioButton from '../components/shared/CustomRadioButton';

import Spinner from '../components/shared/SpinnerRect';

import usePageTitle from '../hooks/usePageTitle';

import { getUserAddresses, setSelectedAddress } from '../store/addressSlice';
import { STATUS } from '../utils';

const Address = () => {
  usePageTitle('Address | Fashionista');
  const { addresses, status, defaultAddress, otherAddresses, selectedAddress } =
    useSelector((state) => state.address);
  // const defaultAddress = addresses.find((address) => address.defaultAddress);
  // const otherAddresses = addresses.filter((address) => !address.defaultAddress);

  // const [selectedAddress, setSelectedAddress] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch]);

  useEffect(() => {
    if (addresses.length > 0) {
      dispatch(setSelectedAddress({ address: defaultAddress }));
    }
  }, [addresses, defaultAddress, dispatch]);

  const changeSelectedAddress = (addressId) => {
    dispatch(
      setSelectedAddress({
        address: addresses.find((address) => address.id === addressId),
      })
    );
  };

  const checkoutHandler = () => {
    navigate('/checkout/payment', {
      replace: true,
    });
  };

  if (status === STATUS.LOADING) return <Spinner />;

  return (
    <Container>
      <AddressListContainer>
        <AddressListTitleContainer>
          <AddressListTitle>Select Delivery Address</AddressListTitle>
          <AddNewAddressButton>Add New Address</AddNewAddressButton>
        </AddressListTitleContainer>
        {addresses.length > 0 && (
          <>
            <AddressTitle>Default Address</AddressTitle>
            <AddressBlock
              onClick={() => changeSelectedAddress(defaultAddress.id)}
              selected={selectedAddress?.id === defaultAddress.id}
            >
              <FlexContainer>
                <CustomRadioButton
                  name="address"
                  selected={selectedAddress?.id === defaultAddress.id}
                  id={defaultAddress.id}
                  value={defaultAddress.id}
                />
                <div>
                  <AddressFieldName>{defaultAddress.name}</AddressFieldName>
                  <AddressField>
                    {defaultAddress.address}, {defaultAddress.locality}
                  </AddressField>
                  <AddressField>
                    {defaultAddress.city}, {defaultAddress.state} -{' '}
                    {defaultAddress.pincode}
                  </AddressField>
                  <AddressFieldNumber>
                    Mobile: <span>{defaultAddress.phoneNumber}</span>
                  </AddressFieldNumber>
                </div>
              </FlexContainer>
            </AddressBlock>
            <AddressTitle>Other Address</AddressTitle>
            {otherAddresses.map((address) => (
              <AddressBlock
                key={address.id}
                onClick={() => changeSelectedAddress(address.id)}
                selected={selectedAddress?.id === address.id}
              >
                <FlexContainer>
                  <CustomRadioButton
                    name="address"
                    selected={selectedAddress?.id === address.id}
                    id={address.id}
                    value={address.id}
                  />
                  <div>
                    <AddressFieldName>{address.name}</AddressFieldName>
                    <AddressField>
                      {address.address}, {address.locality}
                    </AddressField>
                    <AddressField>
                      {address.city}, {address.state} - {address.pincode}
                    </AddressField>
                    <AddressFieldNumber>
                      Mobile: <span>{address.phoneNumber}</span>
                    </AddressFieldNumber>
                  </div>
                </FlexContainer>
              </AddressBlock>
            ))}
          </>
        )}
        <AddressBlock>
          <AddNewAddressButton>
            <Plus />
            <span>Add New Address</span>
          </AddNewAddressButton>
        </AddressBlock>
      </AddressListContainer>
      <PriceDetailsContainer>
        <PriceDetails
          checkoutButtonHandler={checkoutHandler}
          buttonTitle="Continue"
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

const AddressListContainer = styled.div`
  flex: 3;
  background: #fff;
  box-shadow: rgb(0 0 0 / 20%) 0px 1px 2px 0px;
`;

const AddressListTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 24px;
  border-bottom: 1px solid #efefef;
`;

const AddressListTitle = styled.h1`
  font-size: 18px;
  font-weight: 500;
`;

const AddressTitle = styled.p`
  padding: 13px 24px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  color: #535766;
`;

const FlexContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const AddressBlock = styled.div`
  padding: 13px 24px;
  margin: 13px 24px;
  border: 1px solid #eaeaec;
  border-radius: 4px;
  box-shadow: ${(props) =>
    props.selected ? '0 0 4px rgb(40 44 63 / 20%)' : ''};
  cursor: pointer;
  &:hover {
    border: 1px solid #d4d5d9;
    box-shadow: 0 0 4px rgb(40 44 63 / 8%);
  }
`;

const AddressField = styled.div`
  color: #2e2e2e;
`;

const AddressFieldName = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 500;
`;

const AddressFieldNumber = styled.div`
  margin-top: 20px;
  color: #2e2e2e;
  & span {
    font-weight: 500;
  }
`;

const AddNewAddressButton = styled.button`
  background: white;
  border: 1px solid teal;
  padding: 10px 15px;
  font-size: 14px;
  color: teal;
  font-weight: 500;
  text-transform: uppercase;
  border-radius: 5px;

  ${AddressBlock} & {
    border: none;
    padding: 0;
    border-radius: 0;
    text-transform: capitalize;
    display: flex;
    align-items: flex-start;
    padding: 10px 0;
  }

  & svg {
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }
`;

const PriceDetailsContainer = styled.div`
  flex: 1;
  position: sticky;
  top: 80px;
`;

export default Address;
