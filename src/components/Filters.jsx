import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import { X } from 'react-feather';
import Slider from '@mui/material/Slider';

import { setFilters, resetFilters } from '../store/filtersSlice';
import CustomCheckBox from './shared/CustomCheckBox';
import CustomRadioButton from './shared/CustomRadioButton';

const Filters = ({ closeSideDrawer }) => {
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');
  const [allCategories, setAllCategories] = useState([]);
  const [allSizes, setAllSizes] = useState([]);
  const [priceRange, setPriceRange] = useState([100, 3000]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllCategories = async () => {
      const response = await axios.get('/api/shop/categories');
      setAllCategories(response.data);
    };
    getAllCategories();
    const getAllSizes = async () => {
      const response = await axios.get('/api/shop/sizes');
      setAllSizes(response.data);
    };
    getAllSizes();
  }, []);

  const onCheckBoxChangeHandler = (id, value, e) => {
    if (e.target.checked) {
      setSelectedSizes((prev) => ({ ...prev, [id]: value }));
    } else {
      setSelectedSizes((prev) => {
        const newSelectedState = { ...prev };
        delete newSelectedState[id];
        return newSelectedState;
      });
    }
  };

  const onRadioBtnChangeHandler = (id, name, value, e) => {
    setSelectedCategory(e.target.id);
  };

  const onPriceSliderChangeHandler = (e, value) => {
    setPriceRange(value);
  };

  const clearFilters = () => {
    dispatch(resetFilters());
    setSelectedCategory('');
    setSelectedSizes({});
    setPriceRange([0, 3000]);
    closeSideDrawer();
  };

  const onSubmitHandler = () => {
    const sizesString = Object.keys(selectedSizes).reduce(
      (acc, cur) => `${acc},${cur}`,
      ''
    );
    dispatch(
      setFilters({
        category: selectedCategory,
        sizes: sizesString,
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
        {allCategories.map((category) => (
          <Filter key={category.id}>
            <CustomRadioButton
              id={category.category}
              name="category"
              value={category.category}
              radioBtnChangeHandler={onRadioBtnChangeHandler}
              checked={selectedCategory === category.category}
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
        {allSizes.map((size) => (
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
