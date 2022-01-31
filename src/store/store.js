import { configureStore } from '@reduxjs/toolkit';

import productsReducer from './productsSlice';
import filtersReducer from './filtersSlice';
import categoriesReducer from './categoriesSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filtersReducer,
    categories: categoriesReducer,
  },
});

export default store;
