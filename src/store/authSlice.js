import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';

import axios from '../utils/axios';
import { STATUS, cookies } from '../utils';

const initialState = {
  user: null,
  error: null,
  token: null,
  expiresAt: null,
  isAuthenticated: false,
  status: STATUS.IDLE,
};

const setTokens = (accessToken, xsrfToken) => {
  axios.defaults.headers.common[
    // eslint-disable-next-line dot-notation
    'Authorization'
  ] = `Bearer ${accessToken}`;
  axios.defaults.headers.common['x-xsrf-token'] = xsrfToken;
};

const clearTokens = () => {
  delete axios.defaults.headers.common[
    // eslint-disable-next-line dot-notation
    'Authorization'
  ];
  delete axios.defaults.headers.common['x-xsrf-token'];
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password,
      });
      const accessToken = response.data.token;
      const xsrfToken = cookies.get('XSRF-TOKEN');
      setTokens(accessToken, xsrfToken);
      return response.data;
    } catch (error) {
      clearTokens();
      return rejectWithValue(
        error.response.data.errors || error.response.data.error
      );
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (
    { firstName, lastName, username, email, password, confirmPassword },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post('/api/auth/register', {
        firstName,
        lastName,
        username,
        email,
        password,
        confirmPassword,
      });
      const accessToken = response.data.token;
      const xsrfToken = cookies.get('XSRF-TOKEN');
      setTokens(accessToken, xsrfToken);
      return response.data;
    } catch (error) {
      clearTokens();
      return rejectWithValue(
        error.response.data.errors || error.response.data.errors
      );
    }
  }
);

export const verifyToken = createAsyncThunk(
  'auth/verifyToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/auth/verifyToken');
      const accessToken = response.data.token;
      const xsrfToken = cookies.get('XSRF-TOKEN');
      setTokens(accessToken, xsrfToken);
      return response.data;
    } catch (error) {
      clearTokens();
      return rejectWithValue(error.response.data.error);
    }
  },
  {
    condition: () => {
      const xsrfToken = cookies.get('XSRF-TOKEN');
      axios.defaults.headers.common['x-xsrf-token'] = xsrfToken;
      return true;
    },
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  const response = await axios.post('/api/auth/logout');
  clearTokens();
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(logout.fulfilled, () => {
      return initialState;
    });
    builder
      .addMatcher(
        isAnyOf(login.pending, register.pending, verifyToken.pending),
        (state) => {
          state.status = STATUS.LOADING;
        }
      )
      .addMatcher(
        isAnyOf(login.fulfilled, register.fulfilled, verifyToken.fulfilled),
        (state, action) => {
          state.status = STATUS.SUCCEEDED;
          state.user = action.payload?.user || null;
          state.token = action.payload?.token || null;
          state.expiresAt = action.payload?.expiresAt || null;
          state.error = null;
          state.isAuthenticated = !!action.payload?.user;
        }
      )
      .addMatcher(
        isAnyOf(login.rejected, register.rejected, verifyToken.rejected),
        (state, action) => {
          state.status = STATUS.FAILED;
          state.user = null;
          state.error = action.payload;
        }
      );
  },
});

export default authSlice.reducer;
