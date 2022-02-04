import { configureStore } from '@reduxjs/toolkit';

import productsReducer from './productsSlice';
import filtersReducer from './filtersSlice';
import categoriesReducer from './categoriesSlice';
import sizesReducer from './sizesSlice';
import productReducer from './productSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filtersReducer,
    categories: categoriesReducer,
    sizes: sizesReducer,
    product: productReducer,
  },
});

export default store;
