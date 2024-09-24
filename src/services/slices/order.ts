import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { ORDER_SLICE_NAME } from './sliceNames';
import { orderBurgerApi } from '@api';

type TOrderState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

export const initialState: TOrderState = {
  orderRequest: false,
  orderModalData: null
};

export const orderSlice = createSlice({
  name: ORDER_SLICE_NAME,
  initialState,
  reducers: {
    clearOrderModalData: (state) => {
      state.orderRequest = false;
      state.orderModalData = null;
    }
  },
  selectors: {
    getOrderRequestSelector: (state) => state.orderRequest,
    getOrderModalDataSelector: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
        state.orderModalData = null;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.orderRequest = false;
      });
  }
});

export const { clearOrderModalData } = orderSlice.actions;

export const { getOrderRequestSelector, getOrderModalDataSelector } =
  orderSlice.selectors;

export const orderBurger = createAsyncThunk(
  `${ORDER_SLICE_NAME}/createOrder`,
  async (data: string[]) => orderBurgerApi(data)
);
