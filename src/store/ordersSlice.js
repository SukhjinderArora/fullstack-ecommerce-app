import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../utils/axios';
import { STATUS } from '../utils';

const initialState = {
  orders: [],
  status: STATUS.IDLE,
  error: null,
};

export const getUserOrders = createAsyncThunk(
  'get/orders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/shop/orders');
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.error || error.response.data.errors
      );
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUserOrders.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.orders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default ordersSlice.reducer;
