/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  getItems as getItemsApi,
  updateItem as updateItemApi,
  deleteItem as deleteItemApi,
  sendImage as sendImageApi,
} from '../lib/api/item';

export const initItems = createAsyncThunk(
  'items/initItems',
  async (id, thunkAPI) => {
    try {
      const response = await getItemsApi(id);
      const { data } = response;
      if (response.status === 200) {
        return { ...data };
      }
      return thunkAPI.rejectWithValue(data);
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const sendImage = createAsyncThunk(
  'items/sendImage',
  async (form, thunkAPI) => {
    try {
      const response = await sendImageApi(form);
      const { data } = response;
      if (response.status === 200) {
        return { ...data };
      }
      return thunkAPI.rejectWithValue(data);
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const addItem = createAsyncThunk(
  'items/addItem',
  async (id, thunkAPI) => {
    try {
      const response = await getItemsApi(id);
      const { data } = response;
      if (response.status === 200) {
        return { ...data };
      }
      return thunkAPI.rejectWithValue(data);
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const itemSlice = createSlice({
  name: 'items',
  initialState: {
    itemList: [],
    isFetching: false,
    isSuccess: false,
    isError: false,
    isSend: false,
    errorMessage: '',
  },
  reducers: {
    updateItemConsumption(state, { payload }) {
      const { key, newRate } = payload;
      const index = state.itemList.findIndex(item => item.key === key);
      state.itemList[index].consumptionRate = newRate;
      updateItemApi(state.itemList[index]);
    },
    deleteItem(state, { payload }) {
      const { key } = payload;
      state.itemList = state.itemList.filter(item => item.key !== key);
      deleteItemApi(key);
    },
  },
  extraReducers: {
    [initItems.fulfilled]: (state, { payload }) => {
      const tmpList = [];
      state.isFetching = false;
      state.isSuccess = true;
      console.log(payload);
      for (const [, item] of Object.entries(payload)) {
        if (!item.name) item.name = item.subCategory;
        item.key = item.itemId;
        item.img = item.imgSrc;
        if (!item.memo) item.memo = '';
        if (!item.totalVol) item.totalVol = 1;
        const start = new Date(item.mfgDate);
        const end = new Date(item.expDate);
        const now = Date.now();
        const elapsedRate =
          (end.getTime() - now) / (end.getTime() - start.getTime());
        const leftDate = Math.ceil(
          (end.getTime() - now) / (1000 * 60 * 60 * 24),
        );
        const curVol = item.totalVol * item.consumptionRate;
        tmpList.push({
          ...item,
          elapsedRate,
          leftDate,
          curVol,
        });
        state.itemList = tmpList;
      }
    },
    [initItems.pending]: state => {
      state.isFetching = true;
    },
    [initItems.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [sendImage.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSend = true;
    },
    [sendImage.pending]: state => {
      state.isFetching = true;
    },
    [sendImage.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
  },
});

export const { updateItemConsumption, deleteItem } = itemSlice.actions;

export const itemSelector = state => state.items;

export const itemListSelector = state => state.items.itemList;
