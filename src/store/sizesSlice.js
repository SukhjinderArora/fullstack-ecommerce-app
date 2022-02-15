import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { STATUS } from '../utils';

const initialState = {
  sizes: [],
  status: STATUS.IDLE, // enum - idle loading succeeded failed
  error: null,
};

export const fetchAllSizes = createAsyncThunk(
  'sizes/fetchAllSizes',
  async () => {
    const response = await axios.get('/api/shop/sizes');
    return response.data;
  }
);

const sizesSlice = createSlice({
  name: 'sizes',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchAllSizes.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchAllSizes.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.sizes = action.payload;
        state.error = null;
      })
      .addCase(fetchAllSizes.rejected, (state) => {
        state.status = STATUS.FAILED;
      });
  },
});

export default sizesSlice.reducer;
