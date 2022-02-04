import styled from 'styled-components';
import PropTypes from 'prop-types';

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
`;

const ImageContainer = styled.div`
  width: 300px;
  height: 360px;
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
`;

Category.propTypes = {
  name: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
};

export default Category;
