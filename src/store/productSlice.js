import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  product: {},
  status: 'idle',
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
        state.status = 'loading';
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.error = action.error;
        state.status = 'failed';
      });
  },
});

export const { clearProduct } = productSlice.actions;

export default productSlice.reducer;
