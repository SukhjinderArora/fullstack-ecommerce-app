import { configureStore } from '@reduxjs/toolkit';

import productsReducer from './productsSlice';
import filtersReducer from './filtersSlice';
import categoriesReducer from './categoriesSlice';
import sizesReducer from './sizesSlice';
import productReducer from './productSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filtersReducer,
    categories: categoriesReducer,
    sizes: sizesReducer,
    product: productReducer,
    auth: authReducer,
  },
});

export default store;
