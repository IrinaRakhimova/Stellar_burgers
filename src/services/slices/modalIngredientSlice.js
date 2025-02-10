import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../utils/api";

// Async thunk for fetching ingredients
export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async (_, { rejectWithValue }) => {
    try {
      const data = await request("/ingredients");
      return data.data; // Assuming data.data contains the ingredients
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch ingredients");
    }
  }
);

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  selectedIngredient: null, // Add selectedIngredient to state
};

const modalIngredientSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    setSelectedIngredient: (state, action) => {
      state.selectedIngredient = action.payload || null; // Store selected ingredient
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.ingredientsRequest = true;
        state.ingredientsFailed = false;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredientsRequest = false;
        state.ingredients = action.payload; // Store the fetched ingredients
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.ingredientsRequest = false;
        state.ingredientsFailed = true;
        console.error("Error fetching ingredients:", action.payload);
      });
  },
});

export const { setSelectedIngredient } = modalIngredientSlice.actions;

export default modalIngredientSlice.reducer;