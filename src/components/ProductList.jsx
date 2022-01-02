import styled from 'styled-components';
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
    />
  ));
  return <Container>{productList}</Container>;
};

export default ProductList;
