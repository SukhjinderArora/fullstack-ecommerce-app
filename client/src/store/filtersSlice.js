import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCategory: '',
  selectedSizes: '',
  priceRange: [100, 3000],
  sort: {
    sortBy: '',
    orderBy: '',
  },
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    setSelectedSizes(state, action) {
      state.selectedSizes = action.payload;
    },
    setPriceRange(state, action) {
      state.priceRange = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setFilters(state, action) {
      // state.selectedCategory = action.payload.category;
      state.selectedSizes = action.payload.sizes;
      state.priceRange = action.payload.priceRange;
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const {
  setSelectedCategory,
  setSelectedSizes,
  setPriceRange,
  setSort,
  setFilters,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
