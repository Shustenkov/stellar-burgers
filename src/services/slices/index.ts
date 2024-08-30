import { combineSlices } from '@reduxjs/toolkit';
import { ingredientsSlice } from './ingredients';
import { constructorSlice } from './burgerConstructor';
import { feedSlice } from './feed';
import { userSlice } from './user';
import { orderSlice } from './order';
import { userFeedSlice } from './userFeed';

export const rootReducer = combineSlices(
  ingredientsSlice,
  constructorSlice,
  feedSlice,
  userSlice,
  orderSlice,
  userFeedSlice
);
