import { configureStore } from "@reduxjs/toolkit";
import reducer, {
  showModal,
  hideModal,
  clearOrder,
  createOrderThunk,
  fetchOrderByNumberThunk,
} from "../../slices/orderSlice";

jest.mock("../../utils/api");

const mockOrder = {
  number: 123,
  name: "Burger",
  ingredients: [],
  status: "done",
  createdAt: "",
  updatedAt: "",
  _id: "abc123",
};

const getStore = () =>
  configureStore({
    reducer: {
      order: reducer,
    },
  });

describe("orderSlice initial state", () => {
  it("should return the initial state", () => {
    const store = getStore();
    const state = store.getState().order;

    expect(state).toEqual({
      order: null,
      orderNumber: null,
      orderName: "",
      orderRequest: false,
      orderFailed: false,
      isModalVisible: false,
      loading: false,
      error: null,
    });
  });
});

describe("orderSlice reducers", () => {
  it("should handle showModal", () => {
    const store = getStore();
    store.dispatch(showModal());
    expect(store.getState().order.isModalVisible).toBe(true);
  });

  it("should handle hideModal", () => {
    const store = getStore();
    store.dispatch(hideModal());
    expect(store.getState().order.isModalVisible).toBe(false);
  });

  it("should handle clearOrder", () => {
    const store = getStore();
    store.dispatch(clearOrder());
    const state = store.getState().order;
    expect(state.order).toBeNull();
    expect(state.error).toBeNull();
    expect(state.loading).toBe(false);
  });
});

describe("createOrderThunk", () => {
  it("should handle pending", () => {
    const state = reducer(undefined, createOrderThunk.pending("", []));
    expect(state.orderRequest).toBe(true);
    expect(state.orderFailed).toBe(false);
    expect(state.isModalVisible).toBe(true);
  });

  it("should handle fulfilled", () => {
    const state = reducer(
      undefined,
      createOrderThunk.fulfilled({ order: mockOrder }, "", [])
    );
    expect(state.orderRequest).toBe(false);
    expect(state.orderNumber).toBe(123);
    expect(state.orderName).toBe("Burger");
    expect(state.isModalVisible).toBe(true);
  });

  it("should handle rejected", () => {
    const state = reducer(undefined, createOrderThunk.rejected(null, "", []));
    expect(state.orderRequest).toBe(false);
    expect(state.orderFailed).toBe(true);
  });
});

describe("fetchOrderByNumberThunk", () => {
  it("should handle pending", () => {
    const state = reducer(undefined, fetchOrderByNumberThunk.pending("", 123));
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it("should handle fulfilled", () => {
    const state = reducer(
      undefined,
      fetchOrderByNumberThunk.fulfilled(mockOrder, "", 123)
    );
    expect(state.loading).toBe(false);
    expect(state.order).toEqual(mockOrder);
  });

  it("should handle rejected", () => {
    const state = reducer(
      undefined,
      fetchOrderByNumberThunk.rejected(null, "", 123, "Failed to fetch order")
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe("Failed to fetch order");
  });
});
