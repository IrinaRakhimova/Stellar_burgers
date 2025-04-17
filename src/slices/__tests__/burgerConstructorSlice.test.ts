import reducer, {
  addIngredient,
  deleteIngredient,
  reorderIngredients,
  resetIngredients,
  initialState,
} from "../../slices/burgerConstructorSlice";

const createFakeIngredient = (
  overrides: Partial<Ingredient> = {}
): Ingredient => ({
  _id: "mock-id",
  name: "Mock Ingredient",
  image: "mock-image.jpg",
  image_large: "mock-image-large.jpg",
  price: 10,
  type: "main",
  instanceId: "mock-instance-id",
  calories: 200,
  proteins: 15,
  fat: 10,
  carbohydrates: 25,
  ...overrides,
});

const fakeBun = createFakeIngredient({ type: "bun" });
const fakeSauce = createFakeIngredient({ type: "sauce" });
const fakePatty = createFakeIngredient({ type: "main" });

describe("burgerConstructorSlice", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should add a bun ingredient", () => {
    const bun = createFakeIngredient({
      type: "bun",
      name: "Test Bun",
      price: 2,
    });
    const action = addIngredient(bun);
    const state = reducer(undefined, action);
    expect(state.bun).toEqual({ ...bun, instanceId: expect.any(String) });
    expect(state.ingredients).toEqual([]);
  });

  it("should add a regular ingredient", () => {
    const patty = createFakeIngredient({
      type: "main",
      name: "Beef Patty",
      price: 5,
    });
    const action = addIngredient(patty);
    const state = reducer(undefined, action);
    expect(state.ingredients).toEqual([
      { ...patty, instanceId: expect.any(String) },
    ]);
    expect(state.bun).toBeNull();
  });

  it("should delete an ingredient", () => {
    const stateWithIngredient = {
      ...initialState,
      bun: fakeBun,
      ingredients: [fakePatty],
    };
    const action = deleteIngredient(fakePatty.instanceId);
    const state = reducer(stateWithIngredient, action);
    expect(state.ingredients).toEqual([]);
  });

  it("should delete a bun ingredient", () => {
    const stateWithBun = {
      ...initialState,
      bun: fakeBun,
      ingredients: [],
    };
    const action = deleteIngredient(fakeBun.instanceId);
    const state = reducer(stateWithBun, action);
    expect(state.bun).toBeNull();
  });

  it("should reorder ingredients", () => {
    const patty1 = fakePatty;
    const patty2 = createFakeIngredient({
      type: "main",
      name: "Chicken Patty",
    });
    const stateWithIngredients = {
      ...initialState,
      ingredients: [patty1, patty2],
    };
    const action = reorderIngredients({ fromIndex: 0, toIndex: 1 });
    const state = reducer(stateWithIngredients, action);
    expect(state.ingredients[0]).toEqual(patty2);
    expect(state.ingredients[1]).toEqual(patty1);
  });

  it("should reset ingredients", () => {
    const filledState = {
      ...initialState,
      bun: fakeBun,
      ingredients: [fakeSauce, fakePatty],
    };
    const action = resetIngredients();
    const state = reducer(filledState, action);
    expect(state).toEqual(initialState);
  });
});
