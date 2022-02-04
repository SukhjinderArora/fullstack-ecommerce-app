import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Product = ({ title, img, priceNew, priceOld, id }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const onProductClickHandler = () => {
    navigate(`/product/${id}`);
  };

  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onProductClickHandler}
    >
      <ProductImageContainer>
        <ProductImage src={img} />
        <ProductButtonContainer isHovered={isHovered}>
          <ProductButton onClick={onProductClickHandler}>
            Add to cart
          </ProductButton>
          <ProductButton onClick={onProductClickHandler}>Buy Now</ProductButton>
        </ProductButtonContainer>
      </ProductImageContainer>
      <ProductName>{title}</ProductName>
      <ProductPriceContainer>
        <ProductPriceNew>&#8377; {priceNew}</ProductPriceNew>
        <ProductPriceOld>&#8377; {priceOld}</ProductPriceOld>
      </ProductPriceContainer>
    </Container>
  );
};

Product.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  priceNew: PropTypes.number.isRequired,
  priceOld: PropTypes.number.isRequired,
};

const Container = styled.div`
  width: 300px;
  cursor: pointer;
`;

const ProductImageContainer = styled.div`
  height: 400px;
  width: 100%;
  box-shadow: 0 0 20px 1px #0000001c;
  position: relative;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProductName = styled.a`
  display: inline-block;
  margin-top: 12px;
  margin-bottom: 5px;
  font-weight: 500;
`;

const ProductPriceContainer = styled.div``;

const ProductPriceNew = styled.span`
  font-weight: 700;
  color: teal;
  margin-right: 5px;
`;

const ProductPriceOld = styled.del`
  color: #515151;
`;

const ProductButtonContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  padding: 15px 0;
  overflow: hidden;
  opacity: ${(props) => (props.isHovered ? 1 : 0)};
  transition: all 0.5s ease;
  background-color: rgba(0, 0, 0, 0.1);
`;

const ProductButton = styled.button`
  display: inline-block;
  background-color: white;
  font-weight: 700;
  font-size: 14px;
  border: none;
  padding: 12px 15px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: teal;
    color: white;
  }
`;

export default Product;
