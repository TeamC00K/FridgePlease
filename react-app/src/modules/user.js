import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { login, register } from '../lib/api/auth';

export const registerUser = createAsyncThunk(
  'users/registerUser',
  async ({ name, id, passwd }, thunkAPI) => {
    try {
      const response = await register({ name, id, passwd });
      const { data } = response;
      console.log('data', data);
      if (response.status === 200) {
        // localStorage.setItem('token', data.token);
        return { ...data };
      }
      return thunkAPI.rejectWithValue(data);
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const loginUser = createAsyncThunk(
  'users/loginUser',
  async ({ id, passwd }, thunkAPI) => {
    try {
      const response = await login({ id, passwd });
      const { data } = response;
      if (response.status === 200) {
        // localStorage.setItem('token', data.token);
        return { ...data };
      }
      return thunkAPI.rejectWithValue(data);
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    name: '',
    id: '',
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
  },
  reducers: {
    // Reducer comes here
  },
  extraReducers: {
    [registerUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.name = payload.user.name;
      state.id = payload.user.id;
    },
    [registerUser.pending]: state => {
      state.isFetching = true;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.name = payload.user.name;
      state.id = payload.user.id;
    },
    [loginUser.pending]: state => {
      state.isFetching = true;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
  },
});

export const userSelector = state => state.user;
