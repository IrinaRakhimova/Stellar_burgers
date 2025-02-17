import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  bun: null,
  ingredients: [],
};

const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      const ingredient = {
        ...action.payload,
        instanceId: uuidv4(),
        price: action.payload.price || 0,
      };

      if (ingredient.type === "bun") {
        state.bun = ingredient;
      } else {
        state.ingredients.push(ingredient);
      }
    },
    deleteIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.instanceId !== action.payload
      );

      if (state.bun && state.bun._id === action.payload) {
        state.bun = null;
      }
    },
    reorderIngredients: (state, action) => {
      const { fromIndex, toIndex } = action.payload;
      const [movedItem] = state.ingredients.splice(fromIndex, 1);
      state.ingredients.splice(toIndex, 0, movedItem);
    },
    resetIngredients: () => initialState,
  },
});

export const {
  addIngredient,
  deleteIngredient,
  reorderIngredients,
  resetIngredients,
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
