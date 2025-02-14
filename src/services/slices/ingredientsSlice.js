import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchIngredients } from "../../utils/api";

export const fetchIngredientsThunk = createAsyncThunk(
  "ingredients/fetchIngredients",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchIngredients();
      console.log("API Response:", res); 

      if (res && Array.isArray(res.data)) {
        return res.data; 
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching ingredients:", error);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  currentSection: "bun",    
  selectedIngredient: null, 
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    setCurrentSection: (state, action) => {
      state.currentSection = action.payload;
    },
    setSelectedIngredient: (state, action) => {
      state.selectedIngredient = action.payload || null;
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

export const { setCurrentSection, setSelectedIngredient } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;