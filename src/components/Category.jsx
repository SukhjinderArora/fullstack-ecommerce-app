import styled from 'styled-components';
import PropTypes from 'prop-types';

const CategoryContainer = styled.div`
  display: block;
  margin-right: 30px;
`;

const CategoryImageContainer = styled.div`
  width: 300px;
  height: 360px;
`;

const CategoryImage = styled.img`
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

const Category = ({ name, imgUrl }) => {
  return (
    <CategoryContainer>
      <CategoryImageContainer>
        <CategoryImage src={imgUrl} />
      </CategoryImageContainer>
      <CategoryName>{name}</CategoryName>
    </CategoryContainer>
  );
};

Category.propTypes = {
  name: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
};

export default Category;
