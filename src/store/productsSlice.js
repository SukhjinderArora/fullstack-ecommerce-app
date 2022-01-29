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
  async ({ category, sizes, priceRange }, { getState }) => {
    const offset = getState().products.products.length;
    const limit = 12;
    const response = await axios.get('/api/shop/products', {
      params: {
        offset,
        limit,
        categories: category,
        sizes,
        priceRange,
        // sizes: 'free size,s',
      },
    });
    console.log(response.data);
    return response.data;
  },
  {
    condition: (_, { getState }) => {
      const { status, products, totalProducts } = getState().products;
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
    clearProducts(state) {
      state.products = [];
      state.totalProducts = 0;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // state.products
        state.products.push(...action.payload.products);
        // state.products = action.payload.products;
        state.totalProducts = action.payload.totalProducts;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export const { clearProducts } = productsSlice.actions;
export default productsSlice.reducer;
