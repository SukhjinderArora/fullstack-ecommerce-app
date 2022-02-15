import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { STATUS } from '../utils';

const initialState = {
  product: {},
  status: STATUS.IDLE,
  error: null,
};

export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async ({ id }) => {
    const response = await axios.get(`/api/shop/product/${id}`);
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearProduct() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.status = STATUS.SUCCEEDED;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.error = action.error;
        state.status = STATUS.FAILED;
      });
  },
});

export const { clearProduct } = productSlice.actions;

export default productSlice.reducer;
