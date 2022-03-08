import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../utils/axios';
import { STATUS } from '../utils';

const initialState = {
  cart: {
    items: [],
    totalPrice: 0,
    deliveryPrice: 0,
  },
  status: STATUS.IDLE,
  error: null,
};

export const addProductToCart = createAsyncThunk(
  'cart/addProduct',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/shop/cart', {
        productSizeId: productId,
        quantity,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.error || error.response.data.errors
      );
    }
  }
);

export const getCart = createAsyncThunk(
  'cart/get',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/shop/cart');
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.error || error.response.data.errors
      );
    }
  }
);

export const removeCartItem = createAsyncThunk(
  'cart/remove',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.delete('/api/shop/cart', {
        data: {
          productSizeId: id,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.error || error.response.data.errors
      );
    }
  }
);

export const modifyCartItem = createAsyncThunk(
  'cart/modify',
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.patch('/api/shop/cart', {
        productSizeId: id,
        quantity,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.error || error.response.data.errors
      );
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCart.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.cart.items = action.payload.products;
        state.cart.totalPrice = action.payload.totalPrice;
        state.cart.deliveryPrice = action.payload.deliveryPrice;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
