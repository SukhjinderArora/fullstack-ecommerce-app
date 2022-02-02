import { configureStore } from '@reduxjs/toolkit';

import productsReducer from './productsSlice';
import filtersReducer from './filtersSlice';
import categoriesReducer from './categoriesSlice';
import sizesReducer from './sizesSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filtersReducer,
    categories: categoriesReducer,
    sizes: sizesReducer,
  },
});

export default store;
