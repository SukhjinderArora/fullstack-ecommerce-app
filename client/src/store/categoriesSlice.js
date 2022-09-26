import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { STATUS } from '../utils';

const initialState = {
  categories: [],
  status: STATUS.IDLE, // enum - idle loading succeeded failed
  error: null,
};

export const fetchAllCategories = createAsyncThunk(
  'categories/fetchAllCategories',
  async () => {
    const response = await axios.get('/api/shop/categories');
    return response.data;
  },
  {
    condition: (_, { getState }) => {
      const { categories, status } = getState().categories;
      if (categories.length > 0 || status === STATUS.LOADING) {
        return false;
      }
      return true;
    },
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(fetchAllCategories.rejected, (state) => {
        state.status = STATUS.FAILED;
      });
  },
});

export default categoriesSlice.reducer;
