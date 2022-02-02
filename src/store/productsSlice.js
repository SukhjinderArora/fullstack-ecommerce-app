import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
  status: 'idle', // enum - idle loading succeeded failed
  error: null,
  totalProducts: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ sortBy = '', orderBy = '' }, { getState }) => {
    const offset = getState().products.products.length;
    const limit = 12;
    const {
      selectedCategory: categories,
      selectedSizes: sizes,
      priceRange,
    } = getState().filters;
    const response = await axios.get('/api/shop/products', {
      params: {
        offset,
        limit,
        categories,
        sizes,
        priceRange,
        sortBy,
        orderBy,
      },
    });
    return response.data;
  },
  {
    condition: (_, { getState }) => {
      const { status } = getState().products;
      if (status === 'loading') {
        return false;
      }
      return true;
    },
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProducts() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products.push(...action.payload.products);
        state.totalProducts = action.payload.totalProducts;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { clearProducts } = productsSlice.actions;
export default productsSlice.reducer;
