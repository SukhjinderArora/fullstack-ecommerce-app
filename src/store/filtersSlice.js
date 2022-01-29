import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: '',
  sizes: '',
  priceRange: [100, 3000],
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters(state, action) {
      state.category = action.payload.category;
      state.sizes = action.payload.sizes;
      state.priceRange = action.payload.priceRange;
    },
  },
});

export const { setFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
