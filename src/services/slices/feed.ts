import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
import { FEED_SLICE_NAME } from './sliceNames';
import { getFeedsApi, getOrderByNumberApi } from '@api';

type TFeedState = {
  data: TOrdersData;
  currentOrder: TOrder | undefined;
  loading: boolean;
  error: string | null;
};

const initialState: TFeedState = {
  data: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  currentOrder: undefined,
  loading: false,
  error: null
};

export const feedSlice = createSlice({
  name: FEED_SLICE_NAME,
  initialState,
  reducers: {},
  selectors: {
    getFeedOrdersSelector: (state) => state.data.orders,
    getFeedDataSelector: (state) => state.data,
    getFeedOrderSelector: (state, orderNumber: number) =>
      state.data.orders.find((order) => order.number === orderNumber),
    getFeedLoadingSelector: (state) => state.loading,
    getFeedErrorSelector: (state) => state.error,
    getFeedCurrentOrderSelector: (state) => state.currentOrder
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '';
      })

      .addCase(getOrderByNumber.pending, (state) => {
        state.currentOrder = undefined;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.currentOrder = action.payload.orders[0];
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.error = action.error.message || '';
      });
  }
});

export const {
  getFeedOrdersSelector,
  getFeedDataSelector,
  getFeedOrderSelector,
  getFeedLoadingSelector,
  getFeedErrorSelector,
  getFeedCurrentOrderSelector
} = feedSlice.selectors;

export const getFeeds = createAsyncThunk(
  `${FEED_SLICE_NAME}/getFeeds`,
  async () => getFeedsApi()
);

export const getOrderByNumber = createAsyncThunk(
  `${FEED_SLICE_NAME}/getOrderByNumber`,
  async (orderNum: number) => getOrderByNumberApi(orderNum)
);
