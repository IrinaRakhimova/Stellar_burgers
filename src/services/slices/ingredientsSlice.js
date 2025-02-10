import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchIngredients } from "../../utils/api";

// Async thunk for fetching ingredients
export const getIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchIngredients();

      if (res && Array.isArray(res)) {
        return res; // Returns the payload
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching ingredients:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Create slice
const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
    currentSection: "bun",
  },
  reducers: {
    setCurrentSection: (state, action) => {
      state.currentSection = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.ingredientsRequest = true;
        state.ingredientsFailed = false;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.ingredientsRequest = false;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.ingredientsFailed = true;
        state.ingredientsRequest = false;
      });
  },
});

// Export actions
export const { setCurrentSection } = ingredientsSlice.actions;

// Export reducer
export default ingredientsSlice.reducer;