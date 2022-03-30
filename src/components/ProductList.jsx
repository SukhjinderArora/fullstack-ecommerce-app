import styled from 'styled-components';
import PropTypes from 'prop-types';

import Product from './Product';

import device from '../utils/device';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  justify-items: center;
  @media ${device.mobileM} {
    grid-template-columns: repeat(2, 1fr);
  }
`;
// const Container = styled.div`
//   display: flex;
//   align-items: flex-start;
//   justify-content: space-between;
//   flex-wrap: wrap;
//   gap: 20px;
//   & > *:last-child {
//     margin-right: auto;
//   }
// `;

const ProductList = ({ products }) => {
  const productList = products.map((product) => (
    <Product
      title={product.title}
      img={product.img}
      priceNew={Number(product.price)}
      priceOld={Number(product.price)}
      key={product.id}
      id={product.id}
    />
  ));
  return <Container>{productList}</Container>;
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProductList;
