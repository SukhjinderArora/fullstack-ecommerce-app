import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { X } from 'react-feather';
import Slider from '@mui/material/Slider';

import CustomCheckBox from './shared/CustomCheckBox';
import CustomRadioButton from './shared/CustomRadioButton';

import { setFilters, resetFilters } from '../store/filtersSlice';
import { fetchAllCategories } from '../store/categoriesSlice';
import { fetchAllSizes } from '../store/sizesSlice';

import useQuery from '../hooks/useQuery';

const Filters = ({ closeSideDrawer }) => {
  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});
  const [priceRange, setPriceRange] = useState([100, 3000]);

  const { sizes } = useSelector((state) => state.sizes);
  const { categories } = useSelector((state) => state.categories);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCategories());
    dispatch(fetchAllSizes());
  }, [dispatch]);

  const onCheckBoxChangeHandler = (id, value, e) => {
    const { checked } = e.target;
    setSelectedSizes((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  const onRadioBtnChangeHandler = (id) => {
    setSelectedCategory(categories.find(({ category }) => category === id));
  };

  const onPriceSliderChangeHandler = (e, value) => {
    setPriceRange(value);
  };

  const clearFilters = () => {
    dispatch(resetFilters());
    setSelectedCategory({});
    setSelectedSizes({});
    setPriceRange([100, 3000]);
    closeSideDrawer();
  };

  const onSubmitHandler = () => {
    dispatch(
      setFilters({
        category: selectedCategory.category,
        sizes: Object.keys(selectedSizes).reduce(
          (acc, cur) => (selectedSizes[cur] ? `${acc},${cur}` : acc),
          ''
        ),
        priceRange,
      })
    );
    closeSideDrawer();
  };

  return (
    <Container>
      <Header>
        <Title>Filters</Title>
        <CloseButton onClick={closeSideDrawer}>
          <CloseIcon />
        </CloseButton>
      </Header>
      <FilterContainer>
        <FilterText>Categories</FilterText>
        {categories.map((category) => (
          <Filter key={category.id}>
            <CustomRadioButton
              id={category.category}
              name="category"
              value={category.category}
              radioBtnChangeHandler={onRadioBtnChangeHandler}
              checked={selectedCategory.category === category.category}
            />
          </Filter>
        ))}
      </FilterContainer>
      <FilterContainer>
        <FilterText>Price</FilterText>
        <PriceRange>
          INR {priceRange[0]} - INR {priceRange[1]}
        </PriceRange>
        <Slider
          value={priceRange}
          max={3000}
          min={100}
          step={100}
          onChange={onPriceSliderChangeHandler}
          marks
          sx={{
            width: 300,
            color: 'teal',
          }}
        />
      </FilterContainer>
      <FilterContainer>
        <FilterText>Size</FilterText>
        {sizes.map((size) => (
          <Filter key={size.id}>
            <CustomCheckBox
              id={size.size}
              name="size"
              value={size.size}
              selected={!!selectedSizes[size.size]}
              checkBoxChangeHandler={onCheckBoxChangeHandler}
            />
          </Filter>
        ))}
        <ButtonsContainer>
          <ClearButton onClick={clearFilters}>Clear</ClearButton>
          <SubmitButton onClick={onSubmitHandler}>Submit</SubmitButton>
        </ButtonsContainer>
      </FilterContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px 10px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Title = styled.h1`
  font-weight: 300;
  font-size: 25px;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;

const CloseIcon = styled(X)``;

const FilterContainer = styled.div`
  margin-bottom: 20px;
`;

const FilterText = styled.h2`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const Filter = styled.div`
  font-size: 18px;
  margin-bottom: 5px;
`;

const PriceRange = styled.p``;

const ButtonsContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  gap: 10px;
  @media (max-width: 499px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  font-family: inherit;
  font-weight: 700;
  border: 1px solid transparent;
  text-transform: uppercase;
  font-weight: 700;
  border: 1px solid transparent;
  text-transform: uppercase;
  padding: 15px 30px;
  cursor: pointer;
  flex: 1;
  @media (max-width: 499px) {
    padding: 1.5rem 0;
  }
`;

const ClearButton = styled(Button)`
  color: #535665;
  border: 1px solid #535665;
  background: #fff;
  &:hover {
    background: #535665;
    color: #fff;
    border: 1px solid #535665;
  }
  @media (max-width: 499px) {
    margin-bottom: 1rem;
  }
`;

const SubmitButton = styled(Button)`
  background: teal;
  color: #fff;
  border: 1px solid transparent;
  &:hover {
    background: #fff;
    color: teal;
    border: 1px solid teal;
  }
`;

Filters.propTypes = {
  closeSideDrawer: PropTypes.func.isRequired,
};

export default Filters;
