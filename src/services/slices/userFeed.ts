import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { USER_FEED_SLICE_NAME } from './sliceNames';
import { getOrdersApi } from '@api';

type TUserFeedState = {
  orders: TOrder[];
};

export const initialState: TUserFeedState = {
  orders: []
};

export const userFeedSlice = createSlice({
  name: USER_FEED_SLICE_NAME,
  initialState,
  reducers: {},
  selectors: {
    getUserOrdersSelector: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder.addCase(getUserOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  }
});

export const { getUserOrdersSelector } = userFeedSlice.selectors;

export const getUserOrders = createAsyncThunk(
  `${USER_FEED_SLICE_NAME}/getUserOrders`,
  async () => getOrdersApi()
);
