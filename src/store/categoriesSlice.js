import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  categories: [],
  status: 'idle', // enum - idle loading succeeded failed
  error: null,
};

export const fetchAllCategories = createAsyncThunk(
  'categories/fetchAllCategories',
  async () => {
    const response = await axios.get('/api/shop/categories');
    return response.data;
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(fetchAllCategories.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default categoriesSlice.reducer;
