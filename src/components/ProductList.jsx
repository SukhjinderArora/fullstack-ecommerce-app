import styled from 'styled-components';
import PropTypes from 'prop-types';

import Product from './Product';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
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
      priceNew={product.priceNew}
      priceOld={product.priceOld}
      key={product.id}
    />
  ));
  return <Container>{productList}</Container>;
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProductList;
