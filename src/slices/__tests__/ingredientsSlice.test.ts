import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer, {
  fetchIngredientsThunk,
  setCurrentSection,
  setSelectedIngredient,
} from "../../slices/ingredientsSlice";
import { fetchIngredients } from "../../utils/api";

jest.mock("../../utils/api", () => ({
  fetchIngredients: jest.fn(),
}));

const sampleIngredients: Ingredient[] = [
  {
    _id: "1",
    name: "Bun",
    image: "bun.jpg",
    image_large: "bun_large.jpg",
    price: 2,
    type: "bun",
    instanceId: "1",
    calories: 200,
    proteins: 10,
    fat: 5,
    carbohydrates: 25,
  },
  {
    _id: "2",
    name: "Patty",
    image: "patty.jpg",
    image_large: "patty_large.jpg",
    price: 5,
    type: "main",
    instanceId: "2",
    calories: 250,
    proteins: 15,
    fat: 10,
    carbohydrates: 30,
  },
];

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

describe("ingredientsSlice", () => {
  const store = configureStore({
    reducer: {
      ingredients: ingredientsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });

  it("should handle setCurrentSection", () => {
    store.dispatch(setCurrentSection("main"));
    const state = store.getState().ingredients;
    expect(state.currentSection).toBe("main");
  });

  it("should handle setSelectedIngredient", () => {
    const sampleIngredient: Ingredient = {
      _id: "1",
      name: "Bun",
      image: "bun.jpg",
      image_large: "bun_large.jpg",
      price: 2,
      type: "bun",
      instanceId: "1",
      calories: 200,
      proteins: 10,
      fat: 5,
      carbohydrates: 25,
    };
    store.dispatch(setSelectedIngredient(sampleIngredient));
    const state = store.getState().ingredients;
    expect(state.selectedIngredient).toEqual(sampleIngredient);
  });

  it("should handle fetchIngredientsThunk.pending", async () => {
    let resolveFetch: (value: any) => void;

    (fetchIngredients as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveFetch = resolve;
        })
    );

    const dispatchPromise = store.dispatch(fetchIngredientsThunk());

    const state = store.getState().ingredients;
    expect(state.ingredientsRequest).toBe(true);

    resolveFetch!({ data: sampleIngredients });
    await dispatchPromise;
  });

  it("should handle fetchIngredientsThunk.fulfilled", async () => {
    (fetchIngredients as jest.Mock).mockResolvedValue({
      data: sampleIngredients,
    });

    await store.dispatch(fetchIngredientsThunk());

    const state = store.getState().ingredients;
    expect(state.ingredients).toEqual(sampleIngredients);
    expect(state.ingredientsRequest).toBe(false);
  });

  it("should handle fetchIngredientsThunk.rejected", async () => {
    (fetchIngredients as jest.Mock).mockRejectedValue(
      new Error("Network Error")
    );

    await store.dispatch(fetchIngredientsThunk());

    const state = store.getState().ingredients;
    expect(state.ingredientsFailed).toBe(true);
    expect(state.ingredientsRequest).toBe(false);
  });
});
