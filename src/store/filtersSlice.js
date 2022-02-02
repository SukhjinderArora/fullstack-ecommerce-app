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
    setFilters(state, action) {
      state.selectedCategory = action.payload.category;
      state.selectedSizes = action.payload.sizes;
      state.priceRange = action.payload.priceRange;
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const { setSelectedCategory, setFilters, resetFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;
