import styled from 'styled-components';
import { Filter } from 'react-feather';

import ProductList from '../components/ProductList';

import { products } from '../dummyData';

const Products = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Men&apos;s Shirt</Title>
        <FiltersContainer>
          <FilterButton>
            <span>
              <Filter />
            </span>
            Filters
          </FilterButton>
          <SortBySelect>
            <SortByOption>Sort By</SortByOption>
            <SortByOption>What's New</SortByOption>
            <SortByOption>A - Z</SortByOption>
            <SortByOption>Z - A</SortByOption>
            <SortByOption>Price: High - Low</SortByOption>
            <SortByOption>Price: Low - High</SortByOption>
            <SortByOption>Best Seller</SortByOption>
            <SortByOption>Most Liked</SortByOption>
            <SortByOption>Discount</SortByOption>
          </SortBySelect>
        </FiltersContainer>
      </Wrapper>
      <ProductsContainer>
        <ProductList products={products} />
      </ProductsContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 50px 20px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 25px;
  font-weight: 500;
`;

const FiltersContainer = styled.div`
  display: flex;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  background: teal;
  color: white;
  border: none;
  padding: 12px 15px;
  text-transform: uppercase;
  margin-right: 10px;
  box-shadow: 2px 2px 5px 1px rgb(0 0 0 / 20%);
  border: 1px solid transparent;
  cursor: pointer;
  & span {
    margin-right: 5px;
    display: flex;
  }
  & svg {
    width: 16px;
    height: 16px;
    stroke: white;
  }
`;

const SortBySelect = styled.select`
  font-size: 18px;
  cursor: pointer;
`;

const SortByOption = styled.option``;

const ProductsContainer = styled.div`
  margin-top: 40px;
`;

export default Products;
