import styled from 'styled-components';
import { useSelector } from 'react-redux';

import usePageTitle from '../hooks/usePageTitle';

const Profile = () => {
  usePageTitle('Profile | Fashionista');
  const { user } = useSelector((state) => state.auth);

  return (
    <ProfileContainer>
      <ProfileHeader>Profile Details</ProfileHeader>
      <ProfileTable>
        <tbody>
          <tr>
            <td>Full Name</td>
            <td>
              {user?.firstName} {user?.lastName}
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{user?.email}</td>
          </tr>
        </tbody>
      </ProfileTable>
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  border: 1px solid #d4d4d9;
  padding: 50px 100px;
`;

const ProfileHeader = styled.h1`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 40px;
  border-bottom: 1px solid #d4d4d9;
  padding-bottom: 30px;
`;

const ProfileTable = styled.table`
  margin-left: 40px;
  & tr {
    margin-bottom: 20px;
    display: inline-block;
    & td {
      margin-right: 10px;
      display: inline-block;
      width: 200px;
    }
  }
`;

export default Profile;
