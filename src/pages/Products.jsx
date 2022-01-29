import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Filter } from 'react-feather';

import { fetchProducts, clearProducts } from '../store/productsSlice';
import ProductList from '../components/ProductList';
import PrimaryButton from '../components/shared/PrimaryButton';
import useInView from '../hooks/useInView';
import SideDrawer from '../components/SideDrawer';
import Filters from '../components/Filters';

const Products = () => {
  const dispatch = useDispatch();
  const { products, totalProducts } = useSelector((state) => state.products);
  const { category, sizes, priceRange } = useSelector((state) => state.filters);
  const { inView: showMoreButtonInView, ref } = useInView();
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  useEffect(() => {
    dispatch(clearProducts());
  }, [category, sizes, priceRange, dispatch]);

  useEffect(() => {
    dispatch(
      fetchProducts({
        category,
        sizes,
        priceRange,
      })
    );
  }, [dispatch, category, sizes, priceRange]);

  const showMoreProducts = () => {
    dispatch(
      fetchProducts({
        category,
        sizes,
        priceRange,
      })
    );
  };

  useEffect(() => {
    if (showMoreButtonInView) {
      dispatch(
        fetchProducts({
          category,
          sizes,
          priceRange,
        })
      );
    }
  }, [showMoreButtonInView, dispatch, category, sizes, priceRange]);

  return (
    <Container>
      <SideDrawer
        direction="right"
        showSideDrawer={showSideDrawer}
        onSideDrawerClose={() => setShowSideDrawer(false)}
      >
        <Filters closeSideDrawer={() => setShowSideDrawer(false)} />
      </SideDrawer>
      <Wrapper>
        <Title>{category || 'All Categories'}</Title>
        <FiltersContainer>
          <FilterButton
            onClick={() => {
              setShowSideDrawer(true);
            }}
          >
            <span>
              <Filter />
            </span>
            Filters
          </FilterButton>
          <SortBySelect>
            <SortByOption>Sort By</SortByOption>
            <SortByOption>What&apos;s New</SortByOption>
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
        {totalProducts > 0 && (
          <Paragraph>
            Showing {products.length} of {totalProducts} results
          </Paragraph>
        )}
        {products.length < totalProducts && (
          <ShowMoreButton onClick={showMoreProducts} ref={ref}>
            Load More
          </ShowMoreButton>
        )}
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

const Paragraph = styled.p`
  text-align: center;
  margin-top: 20px;
`;

const ShowMoreButton = styled(PrimaryButton)`
  display: block;
  margin: 20px auto;
`;

export default Products;
