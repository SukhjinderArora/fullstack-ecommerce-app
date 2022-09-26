import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Plus } from 'react-feather';

import Spinner from './shared/SpinnerRect';
import Modal from './Modal';
import AddressForm from './AddressForm';

import usePageTitle from '../hooks/usePageTitle';

import { getUserAddresses, setSelectedAddress } from '../store/addressSlice';
import { STATUS } from '../utils';

const Address = () => {
  usePageTitle('Address | Fashionista');
  const [showAddressModal, setShowAddressModal] = useState(false);
  const { addresses, status, defaultAddress, otherAddresses } = useSelector(
    (state) => state.address
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch]);

  useEffect(() => {
    if (addresses.length > 0) {
      dispatch(setSelectedAddress({ address: defaultAddress }));
    }
  }, [addresses, defaultAddress, dispatch]);

  if (status === STATUS.LOADING) return <Spinner />;

  return (
    <Container>
      <Modal
        onModalClose={() => setShowAddressModal(false)}
        showModal={showAddressModal}
      >
        {showAddressModal && (
          <AddressForm afterSubmitHandler={() => setShowAddressModal(false)} />
        )}
      </Modal>
      <AddressListContainer>
        <AddressListTitleContainer>
          <AddressListTitle>Your Addresses</AddressListTitle>
          <AddNewAddressButton onClick={() => setShowAddressModal(true)}>
            Add New Address
          </AddNewAddressButton>
        </AddressListTitleContainer>
        {addresses.length > 0 && (
          <>
            <AddressTitle>Default Address</AddressTitle>
            <AddressBlock>
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
            </AddressBlock>
            <AddressTitle>Other Addresses</AddressTitle>
            {otherAddresses.map((address) => (
              <AddressBlock key={address.id}>
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
              </AddressBlock>
            ))}
          </>
        )}
        <AddressBlock onClick={() => setShowAddressModal(true)}>
          <AddNewAddressButton onClick={() => setShowAddressModal(true)}>
            <Plus />
            <span>Add New Address</span>
          </AddNewAddressButton>
        </AddressBlock>
      </AddressListContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
  min-height: 100vh;
`;

const AddressListContainer = styled.div`
  flex: 3;
  background: #fff;
`;

const AddressListTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 24px;
  padding-top: 0;
  border-bottom: 1px solid #efefef;
`;

const AddressListTitle = styled.h1`
  font-size: 20px;
  font-weight: 500;
`;

const AddressTitle = styled.p`
  padding: 13px 24px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  color: #535766;
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
  cursor: pointer;

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

export default Address;
