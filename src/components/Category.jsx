import styled from 'styled-components';
import PropTypes from 'prop-types';

import device from '../utils/device';

const Category = ({ name, imgUrl }) => {
  return (
    <Container>
      <ImageContainer>
        <Image src={imgUrl} />
      </ImageContainer>
      <CategoryName>{name}</CategoryName>
    </Container>
  );
};

const Container = styled.div`
  display: block;
  margin-right: 30px;
  @media ${device.tablet} {
    margin-right: 20px;
  }
  @media ${device.mobileM} {
    margin-right: 20px;
  }
`;

const ImageContainer = styled.div`
  width: 300px;
  height: 360px;
  @media ${device.tablet} {
    width: 150px;
    height: 200px;
  }
  @media ${device.mobileM} {
    width: 120px;
    height: 160px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CategoryName = styled.h3`
  color: rgb(27, 40, 57);
  text-align: center;
  text-transform: uppercase;
  margin-top: 5px;
  @media ${device.tablet} {
    font-size: 16px;
  }
  @media ${device.mobileM} {
    font-size: 16px;
  }
`;

Category.propTypes = {
  name: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
};

export default Category;
