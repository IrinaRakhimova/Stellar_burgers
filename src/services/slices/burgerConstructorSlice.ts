import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

type BurgerConstructorState = {
  bun: Ingredient | null;
  ingredients: Ingredient[];
};

const initialState: BurgerConstructorState = {
  bun: null,
  ingredients: [],
};

const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<Ingredient>) => {
        const ingredient = action.payload;

        if (ingredient.type === "bun") {
          state.bun = ingredient;
        } else {
          state.ingredients.push(ingredient);
        }
      },
      prepare: (ingredient: Omit<Ingredient, "instanceId">) => {
        return {
          payload: {
            ...ingredient,
            instanceId: uuidv4(),
            price: ingredient.price || 0,
          },
        };
      },
    },
    deleteIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.instanceId !== action.payload
      );

      if (state.bun && state.bun.instanceId === action.payload) {
        state.bun = null;
      }
    },
    reorderIngredients: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
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
