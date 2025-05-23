import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchIngredients } from "../utils/api";

export type IngredientsState = {
  ingredients: Ingredient[];
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  currentSection: string;
  selectedIngredient: Ingredient | null;
  localCounts: Record<string, number>;
};

export const fetchIngredientsThunk = createAsyncThunk<
  Ingredient[],
  void,
  { rejectValue: string }
>("ingredients/fetchIngredients", async (_, { rejectWithValue }) => {
  try {
    const res = await fetchIngredients();

    if (res && Array.isArray(res.data)) {
      return res.data as unknown as Ingredient[];
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    return rejectWithValue(
      error instanceof Error ? error.message : "Unknown error"
    );
  }
});

const initialState: IngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  currentSection: "bun",
  selectedIngredient: null,
  localCounts: {},
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    setCurrentSection: (state, action: PayloadAction<string>) => {
      state.currentSection = action.payload;
    },
    setSelectedIngredient: (
      state,
      action: PayloadAction<Ingredient | null>
    ) => {
      state.selectedIngredient = action.payload;
    },
    incrementIngredientCount: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.localCounts[id] = (state.localCounts[id] || 0) + 1;
    },
    decrementIngredientCount: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.localCounts[id]) {
        state.localCounts[id] = Math.max(state.localCounts[id] - 1, 0);
      }
    },
    resetAllCounts: (state) => {
      state.localCounts = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientsThunk.pending, (state) => {
        state.ingredientsRequest = true;
        state.ingredientsFailed = false;
      })
      .addCase(fetchIngredientsThunk.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.ingredientsRequest = false;
      })
      .addCase(fetchIngredientsThunk.rejected, (state) => {
        state.ingredientsFailed = true;
        state.ingredientsRequest = false;
      });
  },
});

export const {
  setCurrentSection,
  setSelectedIngredient,
  incrementIngredientCount,
  decrementIngredientCount,
  resetAllCounts,
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
