import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getItemLists } from '../lib/api/item';

export const initItmeLists = createAsyncThunk(
  'items/initItmeLists',
  async (id, thunkAPI) => {
    try {
      const response = await getItemLists(id);
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
    // Reducer comes here
  },
  extraReducers: {
    [initItmeLists.fulfilled]: (state, { payload }) => {
      const tmpList = [];
      state.isFetching = false;
      state.isSuccess = true;
      for (const [, item] of Object.entries(payload)) {
        const start = new Date(item.mfgDate);
        const end = new Date(item.expDate);
        const now = Date.now();
        const elapsedRate =
          (end.getTime() - now) / (end.getTime() - start.getTime());
        const leftDate = Math.ceil(
          (end.getTime() - now) / (1000 * 60 * 60 * 24),
        );
        const consumptionRate = item.curVol / item.totalVol;
        tmpList.push({
          ...item,
          elapsedRate,
          leftDate,
          consumptionRate,
        });
        state.itemList = tmpList;
      }
    },
    [initItmeLists.pending]: state => {
      state.isFetching = true;
    },
    [initItmeLists.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
  },
});

export const itemSelector = state => state.items;
