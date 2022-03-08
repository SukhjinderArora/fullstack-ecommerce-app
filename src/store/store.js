import { configureStore, combineReducers } from '@reduxjs/toolkit';

import productsReducer from './productsSlice';
import filtersReducer from './filtersSlice';
import categoriesReducer from './categoriesSlice';
import sizesReducer from './sizesSlice';
import productReducer from './productSlice';
import authReducer from './authSlice';
import cartReducer from './cartSlice';
import addressReducer from './addressSlice';

const combinedReducer = combineReducers({
  products: productsReducer,
  filters: filtersReducer,
  categories: categoriesReducer,
  sizes: sizesReducer,
  product: productReducer,
  auth: authReducer,
  cart: cartReducer,
  address: addressReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'auth/logout/fulfilled') {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }
  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
