import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Package, Map, Edit } from 'react-feather';

import device from '../utils/device';

const Overview = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Container>
      <ProfileContainer>
        <ProfileImageContainer>
          <ProfileImage
            src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
            alt="user avatar"
          />
        </ProfileImageContainer>
        <ProfileInfoContainer>
          <ProfileName>
            {user?.firstName} {user?.lastName}
          </ProfileName>
          <ProfileEmail>{user?.email}</ProfileEmail>
        </ProfileInfoContainer>
        <EditProfileContainer>
          <EditProfileButton>Edit Profile</EditProfileButton>
        </EditProfileContainer>
      </ProfileContainer>
      <DashboardMenuContainer>
        <MenuItemLink to="/my/orders">
          <ItemIconContainer>
            <Package />
          </ItemIconContainer>
          <ItemLabelContainer>
            <ItemLabel>Orders</ItemLabel>
            <ItemSubLabel>Check your order status</ItemSubLabel>
          </ItemLabelContainer>
        </MenuItemLink>
        <MenuItemLink to="/my/address">
          <ItemIconContainer>
            <Map />
          </ItemIconContainer>
          <ItemLabelContainer>
            <ItemLabel>Addresses</ItemLabel>
            <ItemSubLabel>
              Save addresses for a hassle-free checkout
            </ItemSubLabel>
          </ItemLabelContainer>
        </MenuItemLink>
        <MenuItemLink to="/my/profile">
          <ItemIconContainer>
            <Edit />
          </ItemIconContainer>
          <ItemLabelContainer>
            <ItemLabel>Profile Details</ItemLabel>
            <ItemSubLabel>Change your profile details & password</ItemSubLabel>
          </ItemLabelContainer>
        </MenuItemLink>
      </DashboardMenuContainer>
      <LogoutButtonContainer>
        <LogoutButton>LOGOUT</LogoutButton>
      </LogoutButtonContainer>
    </Container>
  );
};

const Container = styled.div``;

const ProfileContainer = styled.div`
  display: flex;
  background-color: #f5f5f6;
  padding: 24px 16px;
  @media ${device.tablet} {
    flex-direction: column;
  }
  @media ${device.mobileM} {
    flex-direction: column;
  }
`;

const ProfileImageContainer = styled.div`
  flex: 1;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: auto;
  @media ${device.tablet} {
    width: 100px;
  }
  @media ${device.mobileM} {
    width: 100px;
  }
`;

const ProfileInfoContainer = styled.div`
  flex: 3;
`;

const ProfileName = styled.p`
  font-weight: 500;
  font-size: 24px;
  @media ${device.tablet} {
    font-size: 22px;
  }
  @media ${device.mobileM} {
    font-size: 22px;
  }
`;

const ProfileEmail = styled.p`
  font-size: 18px;
  margin-top: 10px;
`;

const EditProfileContainer = styled.div`
  flex: 1;
  @media ${device.tablet} {
    margin-top: 10px;
  }
  @media ${device.mobileM} {
    margin-top: 10px;
  }
`;

const EditProfileButton = styled.button`
  background: white;
  padding: 10px;
  border: 1.5px solid black;
  font-weight: 500;
  text-transform: uppercase;
  cursor: pointer;
`;

const DashboardMenuContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 20px;
  gap: 20px;
  @media ${device.tablet} {
    justify-content: center;
  }
  @media ${device.mobileM} {
    justify-content: center;
  }
`;

const MenuItemLink = styled(Link)`
  display: flex;
  width: 250px;
  height: 250px;
  border: 0.5px solid #eaeaec;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: black;
  padding: 10px;
  &:hover {
    background-color: #f5f5f6;
  }
`;

const ItemIconContainer = styled.div`
  margin-bottom: 24px;
  & svg {
    stroke: #3c3c3c;
  }
`;

const ItemLabelContainer = styled.div`
  text-align: center;
`;

const ItemLabel = styled.p`
  font-size: 16px;
  font-weight: 500;
`;

const ItemSubLabel = styled.p`
  font-size: 14px;
  color: #878787;
  margin-top: 5px;
`;

const LogoutButtonContainer = styled.div`
  margin-top: 30px;
  @media ${device.tablet} {
    text-align: center;
  }
  @media ${device.mobileM} {
    text-align: center;
  }
`;

const LogoutButton = styled.button`
  background: #fa5a5a;
  border: none;
  color: #fff;
  font-size: 16px;
  padding: 15px;
  font-weight: 700;
  width: 250px;
  border: 1px solid #d4d5d9;
  cursor: pointer;
`;

export default Overview;
