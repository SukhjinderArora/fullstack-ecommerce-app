import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../utils/axios';
import { STATUS } from '../utils';

const initialState = {
  addresses: [],
  defaultAddress: {},
  selectedAddress: {},
  otherAddresses: [],
  status: STATUS.IDLE,
  error: null,
};

export const getUserAddresses = createAsyncThunk(
  'get/address',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/shop/address');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const addNewAddress = createAsyncThunk(
  'add/address',
  async (
    { name, phoneNumber, pincode, address, locality, city, state },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post('/api/shop/address', {
        name,
        phoneNumber,
        pincode,
        address,
        locality,
        city,
        state,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.errors || error.response.data.error
      );
    }
  }
);

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setSelectedAddress(state, action) {
      state.selectedAddress = action.payload.address;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserAddresses.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(getUserAddresses.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.addresses = action.payload.addresses;
        state.otherAddresses = action.payload.addresses.filter(
          (address) => !address.defaultAddress
        );
        state.defaultAddress = action.payload.addresses.find(
          (address) => address.defaultAddress
        );
        state.error = null;
      })
      .addCase(getUserAddresses.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload;
      });

    builder
      .addCase(addNewAddress.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.addresses.push(action.payload);
        if (action.payload.defaultAddress) {
          state.defaultAddress = action.payload;
        } else {
          state.otherAddresses.push(action.payload);
        }
      })
      .addCase(addNewAddress.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload;
      });
  },
});

export const { setSelectedAddress } = addressSlice.actions;

export default addressSlice.reducer;
