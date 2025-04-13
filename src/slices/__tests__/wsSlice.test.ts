import reducer, {
  wsConnect,
  wsDisconnect,
  wsError,
  wsMessage,
  initialState,
} from "../../slices/wsSlice";

describe("webSocketSlice reducers", () => {
  it("should return the initial state", () => {
    const state = reducer(undefined, { type: "UNKNOWN_ACTION" });
    expect(state).toEqual({
      allOrders: [],
      userOrders: [],
      total: null,
      totalToday: null,
      connected: false,
      error: null,
    });
  });

  it("should handle wsConnect", () => {
    const state = reducer(initialState, wsConnect());
    expect(state.connected).toBe(true);
    expect(state.error).toBeNull();
  });

  it("should handle wsDisconnect", () => {
    const state = reducer(initialState, wsDisconnect());
    expect(state.connected).toBe(false);
    expect(state.allOrders).toEqual([]);
    expect(state.userOrders).toEqual([]);
  });

  it("should handle wsError", () => {
    const state = reducer(initialState, wsError("Some error"));
    expect(state.error).toBe("Some error");
  });

  it("should handle wsMessage for all orders", () => {
    const actionPayload = {
      type: "all" as "all" | "my",
      data: {
        orders: [
          {
            id: 1,
            status: "completed",
            ingredients: ["ingredient1", "ingredient2"],
            number: 123,
            createdAt: "2025-04-06",
            name: "Order 1",
          },
        ],
        total: 100,
        totalToday: 20,
      },
    };

    const state = reducer(initialState, wsMessage(actionPayload));
    expect(state.allOrders).toEqual([
      {
        id: 1,
        status: "completed",
        ingredients: ["ingredient1", "ingredient2"],
        number: 123,
        createdAt: "2025-04-06",
        name: "Order 1",
      },
    ]);
    expect(state.total).toBe(100);
    expect(state.totalToday).toBe(20);
  });

  it("should handle wsMessage for user orders", () => {
    const actionPayload = {
      type: "my" as "all" | "my",
      data: {
        orders: [
          {
            id: 1,
            status: "completed",
            ingredients: ["ingredient1", "ingredient2"],
            number: 123,
            createdAt: "2025-04-06",
            name: "Order 1",
          },
        ],
        total: 100,
        totalToday: 20,
      },
    };

    const state = reducer(initialState, wsMessage(actionPayload));
    expect(state.userOrders).toEqual([
      {
        id: 1,
        status: "completed",
        ingredients: ["ingredient1", "ingredient2"],
        number: 123,
        createdAt: "2025-04-06",
        name: "Order 1",
      },
    ]);
  });
});
