/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  getItems as getItemsApi,
  updateItem as updateItemApi,
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

export const itemSlice = createSlice({
  name: 'items',
  initialState: {
    itemList: [],
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
  },
  reducers: {
    updateItemConsumption(state, { payload }) {
      const { itemList } = state;
      const { key, newRate } = payload;
      console.log(key);
      const index = itemList.findIndex(item => item.key === key);
      itemList[index].consumptionRate = newRate;
      updateItemApi(itemList[index]);
    },
  },
  extraReducers: {
    [initItems.fulfilled]: (state, { payload }) => {
      const tmpList = [];
      state.isFetching = false;
      state.isSuccess = true;
      console.log(payload);
      for (const [, item] of Object.entries(payload)) {
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
  },
});

export const { updateItemConsumption } = itemSlice.actions;

export const itemSelector = state => state.items;
