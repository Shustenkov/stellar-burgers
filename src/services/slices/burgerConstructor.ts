import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { CONSTRUCTOR_SLICE_NAME } from './sliceNames';

type TConstructorState = {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
};

const initialState: TConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

export const constructorSlice = createSlice({
  name: CONSTRUCTOR_SLICE_NAME,
  initialState,
  reducers: {
    setConstructorBun: (state, action: PayloadAction<TIngredient>) => {
      state.constructorItems.bun = action.payload;
    },
    addConstructorIngredient: (state, action: PayloadAction<TIngredient>) => {
      const newIngredient = Object.assign(
        { ...action.payload },
        {
          id: String(state.constructorItems.ingredients.length)
        }
      );
      state.constructorItems.ingredients.push(newIngredient);
    },
    removeConstructorIngredient: (state, action: PayloadAction<number>) => {
      state.constructorItems.ingredients.splice(action.payload, 1);
    },
    moveUpConstructorIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const newIngredients = [...state.constructorItems.ingredients];
      if (index <= newIngredients.length - 1 && index > 0) {
        newIngredients.splice(
          index,
          1,
          newIngredients.splice(index - 1, 1, newIngredients[index])[0]
        );
        state.constructorItems.ingredients = newIngredients;
      }
    },
    moveDownConstructorIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const newIngredients = [...state.constructorItems.ingredients];
      if (index < newIngredients.length - 1 && index >= 0) {
        newIngredients.splice(
          index,
          1,
          newIngredients.splice(index + 1, 1, newIngredients[index])[0]
        );
        state.constructorItems.ingredients = newIngredients;
      }
    },
    clearConstructorItems: (state) => {
      state.constructorItems = { bun: null, ingredients: [] };
    }
  },
  selectors: {
    getConstructorItemsSelector: (state) => state.constructorItems
  }
});

export const {
  setConstructorBun,
  addConstructorIngredient,
  removeConstructorIngredient,
  moveUpConstructorIngredient,
  moveDownConstructorIngredient,
  clearConstructorItems
} = constructorSlice.actions;

export const { getConstructorItemsSelector } = constructorSlice.selectors;
