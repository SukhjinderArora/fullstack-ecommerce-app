import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  sizes: [],
  status: 'idle', // enum - idle loading succeeded failed
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
        state.status = 'loading';
      })
      .addCase(fetchAllSizes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sizes = action.payload;
        state.error = null;
      })
      .addCase(fetchAllSizes.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default sizesSlice.reducer;
