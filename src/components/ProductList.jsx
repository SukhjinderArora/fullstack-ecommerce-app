import styled from 'styled-components';
import PropTypes from 'prop-types';

import Product from './Product';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

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
