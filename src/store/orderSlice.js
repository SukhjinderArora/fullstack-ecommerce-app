import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../utils/axios';
import { STATUS } from '../utils';

const initialState = {
  order: null,
  status: STATUS.IDLE,
  error: null,
};

export const fetchOrder = createAsyncThunk(
  'fetch/order',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/shop/order/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.error || error.response.data.errors
      );
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.status = STATUS.SUCCEEDED;
        state.error = null;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
